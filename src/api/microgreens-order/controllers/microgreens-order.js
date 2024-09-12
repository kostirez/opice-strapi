'use strict';
const moment = require('moment');

/**
 * microgreens-order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::microgreens-order.microgreens-order', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { data } = ctx.request.body;
      // kontrola jetli je to mozne v danem case vypestovat
      const isOk = await strapi.service('api::microgreens-order.microgreens-order')
          .availabilityOk(data.products, data.pickUpDate);

      if (isOk) {
        // subtract from available boxes
        await strapi.service('api::microgreens-order.microgreens-order')
          .subtractAvailableBoxes(data.products, data.pickUpDate);

        // create new entry in database
        const newEntry = await strapi.entityService.create(
          'api::microgreens-order.microgreens-order',
          {data}
        );

        const response ={
          id: newEntry.id,
          payment: newEntry.payment,
          place: newEntry.place,
          pickUpDate: newEntry.pickUpDate,
        }

        ctx.send({orderResponse:response, image: null});

        // send emails to customer and me.
        await strapi.service('api::email.email').send(
          [data.customer.email],
          'microgreens-order',
          {
            ...response,
            pickUpDate: moment(response.pickUpDate).format('DD. MM. YYYY'),
          }
        );
        // send mail to me
        await strapi.service('api::email.email').send(
          ['obchod@zrzavaopice.cz'],
          'microgreens-order',
          {
            ...response,
            pickUpDate: moment(response.pickUpDate).format('DD. MM. YYYY'),
          }
        );
      } else {/**/
        ctx.throw(406, 'items are not available');
      }
    } catch (err) {
      ctx.throw(err);
    }
  },
}));

