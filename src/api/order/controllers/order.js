'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const newOrder = await strapi.service('api::order.order').create(ctx);

    const order = await strapi.entityService.findOne('api::order.order', newOrder.id, {populate: 'person'});

    const {baseNum} = await strapi.entityService.findOne('api::invoice.invoice', 1, {populate: '*'});

    const invoiceId = baseNum + newOrder.id;

    await strapi.service('api::email.email').send({
      to: order.person.email,
      templateCode: 'order',
      html: `
      <div>
        <h2>Potvrzujeme vaší objednávku číslo ${invoiceId}</h2>
        <h4>Zboží teď připravujeme a brzy vás budeme informovat o odeslání.</h4>

        <div style="margin-top: 5rem;">
              <small >Email byl vygenerován automaticky.</small>
              <h3 style="margin-top: 1rem;">zrzavaopice.cz</h3>
              <h3>obchod@zrzavaopice.cz</h3>
            </div>
      </div>
      `
    });

    const sanitizedOrder = await this.sanitizeOutput(newOrder, ctx);
    ctx.body = sanitizedOrder;
  },
}));
