'use strict';

const logger = require("../../../../logger");
/**
 * message controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::message.message', ({ strapi }) => ({

  async create(ctx) {
    const { body } = ctx.request;
    let newMessage;
    try {
      newMessage = await strapi.entityService.create('api::message.message', {
        data: {
          ...body.data,
        },
      });
    } catch (err) {
      logger.error({error: err, data: body.data}, 'Error creating new message in strapi');
    }

    await strapi.service('api::email.email').send(
      [newMessage.mail, "obchod@zrzavaopice.cz"],
      "message",
      {
        name: newMessage.name,
        text: newMessage.text
      },[]);
    const sanitizedReview = await this.sanitizeOutput(newMessage, ctx);

    ctx.body = sanitizedReview;
  },
}));
