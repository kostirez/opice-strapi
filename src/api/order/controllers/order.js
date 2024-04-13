'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const newOrder = await strapi.service('api::order.order').create(ctx);

    const order = await strapi.entityService.findOne('api::order.order', newOrder.id, {populate: 'person'});

    await strapi.service('api::email.email').send({
      to: order.person.email,
      template: 'order',
    });

    const sanitizedOrder = await this.sanitizeOutput(newOrder, ctx);
    ctx.body = sanitizedOrder;
  },
}));
