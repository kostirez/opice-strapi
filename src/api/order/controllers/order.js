'use strict';

/**
 * order controller
 */
const fs = require('fs');
const {generateQrCode} = require("../../../helpers/grcode");
const {getVS} = require("../../../helpers/invoiceId");
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const newOrder = await strapi.service('api::order.order').create(ctx);

    const order = await strapi.entityService.findOne('api::order.order', newOrder.id, {populate: 'person'});

    const invoiceId = getVS(newOrder.id);

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

    let attachment = undefined;
    if (newOrder.paymentCode==='PRE') {
      const QrCodePath = await generateQrCode(order);
      try {
        if (fs.existsSync(QrCodePath)) {
          attachment = fs.readFileSync(QrCodePath);
          ctx.attachment(QrCodePath);
        } else {
          ctx.throw(400, "Requested file not found on server");
        }
      } catch(error) {
        ctx.throw(500, error);
      }
    }

    const sanitizedOrder = await this.sanitizeOutput(newOrder, ctx);
    ctx.body = {orderResponse: sanitizedOrder, image: attachment ? attachment.toString('base64') : undefined};
  },
}));
