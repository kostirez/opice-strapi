'use strict';

/**
 * message controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::message.message', ({ strapi }) => ({

  async create(ctx) {
    const { body } = ctx.request;
    const newMessage = await strapi.entityService.create('api::message.message', {
      data: {
        ...body.data,
      },
    });

    await strapi.service('api::email.email').send({
      to: newMessage.mail,
      templateCode: 'message',
      html: `
      <div>
        <h2>Děkujeme za zaslaný dotaz přes naše webové stránky zrzavaopice.cz</h2>


            <h3 style="margin-top: 5rem;">Zpráva:</h3>
            <p>Jméno/firma: ${newMessage.name}</p>
            <p>Dotaz: ${newMessage.text}</p>

        <div style="margin-top: 5rem;">
              <small >Email byl vygenerován automaticky.</small>
              <h3 style="margin-top: 1rem;">zrzavaopice.cz</h3>
              <h3>obchod@zrzavaopice.cz</h3>
            </div>
      </div>
      `
    });

    const sanitizedReview = await this.sanitizeOutput(newMessage, ctx);

    ctx.body = sanitizedReview;
  },
}));
