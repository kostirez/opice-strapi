'use strict';

/**
 * order service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const { getVS } = require("../../../helpers/invoiceId");

module.exports = createCoreService('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const { body } = ctx.request;
    const totalPrice = await calculatePrice(body.data);
    const newOrder = await strapi.entityService.create('api::order.order', {
      data: {
        ...body.data,
        totalPrice,
      },
    });

    const {account, bankNum} = await strapi.entityService.findOne('api::invoice.invoice', 1, {populate: '*'});

    const invoiceNum = await getVS(newOrder.id);

    return {
      id: newOrder.id,
      transportCode: newOrder.transportCode,
      paymentCode: newOrder.paymentCode,
      totalPrice: totalPrice,
      invoiceId: invoiceNum,
      account: account,
      bankNum: bankNum,
    };
  },
}));

const calculatePrice = async (data) => {
  // products price
  const ProductsSum = data.products.reduce((sum, current) => sum + current.priceForOne * current.count, 0);

  // get transport and payment method
  const {transportMethods, paymentMethods} = await strapi.entityService
    .findOne('api::pay-transport.pay-transport', 1,{ populate: ['transportMethods', 'paymentMethods'] });
  const transportMethod = transportMethods.find(t => t.code == data.transportCode);
  const paymentMethod = paymentMethods.find(p => p.code == data.paymentCode);

  // calculate price
  const transportSum = ProductsSum < transportMethod.freeFrom ? transportMethod.price : 0;
  const paymentSum = ProductsSum < paymentMethod.freeFrom ? paymentMethod.price : 0;

  //return sum of all
  return ProductsSum + paymentSum + transportSum;
}
