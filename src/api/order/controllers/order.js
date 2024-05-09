'use strict';

/**
 * order controller
 */
const fs = require('fs');
const {generateQrCode} = require("../../../helpers/grcode");
const {getVS} = require("../../../helpers/invoiceId");
const { createCoreController } = require('@strapi/strapi').factories;
const { getPublicDocument } = require("../../../helpers/fileGetter")

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const newOrder = await strapi.service('api::order.order').create(ctx);
    const order = await strapi.entityService.findOne('api::order.order', newOrder.id, {populate: '*'});
    const invoiceId = await getVS(newOrder.id);

    const fileName = 'obchodni_podminky.pdf'
    const obchodniPodminky = await getPublicDocument(fileName);

    let attachment = undefined;
    if (newOrder.paymentCode==='PRE') {
      try {
        const QrCodePath = await generateQrCode(order);
        if (fs.existsSync(QrCodePath)) {
          attachment = fs.readFileSync(QrCodePath);
          ctx.attachment(QrCodePath);
        } else {
          console.error("QrCode - Requested file not found on server");
        }
      } catch(error) {
        console.error("QrCode - error", error);
      }
    }

    // send mail to customer
    await strapi.service('api::email.email').send(
      [order.person.email],
      'order',
      {
        orderId: invoiceId,
        products: order.products,
      },
      [
        {
          content: obchodniPodminky.toString('base64'),
          filename: fileName,
          type: 'application/pdf',
          disposition: 'attachment'
        },
      ],
    );

    // send mail to me
    await strapi.service('api::email.email').send(
      ['obchod@zrzavaopice.cz'],
      'order-detail',
      {
        orderId: invoiceId,
        products: order.products,
        personName: order.person.name,
        personEmail: order.person.email,
        personTel: order.person.tel,
        personAddress: order.address.street + order.address.city,
        transport: order.transportCode,
        payment: order.paymentCode,
      },
      [],
    );


    const sanitizedOrder = await this.sanitizeOutput(newOrder, ctx);
    ctx.body = {orderResponse: sanitizedOrder, image: attachment ? attachment.toString('base64') : undefined};
  },
}));
