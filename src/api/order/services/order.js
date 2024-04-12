'use strict';

/**
 * order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const { body } = ctx.request;
    const totalPrice = await calculatePrice(body.data.products, body.data.paymentCode, body.data.transportCode);
    const newOrder = await strapi.entityService.create('api::order.order', {
      data: {
        ...body.data,
        totalPrice,
      },
    });

    const invoiceNum = await getInvoiceBase() + newOrder.id;

    return {
      id: newOrder.id,
      transportCode: newOrder.transportCode,
      paymentCode: newOrder.paymentCode,
      totalPrice: totalPrice,
      invoiceId: invoiceNum,
    };
  },
}));

const calculatePrice = async (products, payMethod, transMethod) => {
  const {transportMethods, paymentMethods} = await strapi.entityService.findOne('api::pay-transport.pay-transport', 1,{ populate: ['transportMethods', 'paymentMethods'] });
  const sumProducts = products.reduce((sum, current) => sum + current.priceForOne * current.count, 0);
  const transportSum = transportMethods.find(t => t.code == transMethod).price;
  const paymentSum = paymentMethods.find(p => p.code == payMethod).price;
  return sumProducts + paymentSum + transportSum;
}

const getInvoiceBase = async () => {
  const {baseNum} = await strapi.entityService.findOne('api::invoice.invoice', 1, {populate: '*'});
  return baseNum;
}
