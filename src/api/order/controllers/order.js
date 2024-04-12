'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const newOrder = await strapi.service('api::order.order').create(ctx);
    const sanitizedOrder = await this.sanitizeOutput(newOrder, ctx);
    ctx.body = sanitizedOrder;
  },
}));
