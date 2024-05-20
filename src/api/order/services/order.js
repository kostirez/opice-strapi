'use strict';

/**
 * order service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const { getVS } = require("../../../helpers/invoiceId");
const { logger } = require("../../../../logger")

module.exports = createCoreService('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const { body } = ctx.request;
    const totalPrice = await calculatePrice(body.data);
    const newOrder = await strapi.entityService.create('api::order.order', {
      data: {
        ...body.data,
        totalPrice,
        state: 'received',
      },
    });

    let accountData;
    try {
      accountData = await strapi.entityService.findOne('api::invoice.invoice', 1, {populate: '*'});
      if (!accountData) {
        throw new Error('api::invoice.invoice accountData are not defined');
      }
    } catch (err) {
      logger.error({error: err}, 'api::invoice.invoice: accountData are not defined');
    }

    const invoiceNum = await getVS(newOrder.id);

    return {
      id: newOrder.id,
      transportCode: newOrder.transportCode,
      paymentCode: newOrder.paymentCode,
      totalPrice: totalPrice,
      invoiceId: invoiceNum,
      account: accountData.account,
      bankNum: accountData.bankNum,
    };
  },
}));

const calculatePrice = async (data) => {
  // products price
  const ProductsSum = data.products.reduce((sum, current) => sum + current.priceForOne * current.count, 0);

  // get transport and payment method
  let transportMethod;
  let paymentMethod;
  try {
    const {transportMethods, paymentMethods} = await strapi.entityService
      .findOne('api::pay-transport.pay-transport', 1, {populate: ['transportMethods', 'paymentMethods']});
    transportMethod = transportMethods.find(t => t.code == data.transportCode);
    paymentMethod = paymentMethods.find(p => p.code == data.paymentCode);
  } catch (err) {
    logger.error({error: err, transportMethods, paymentMethods,
      transportMethod, paymentMethod,
      paymentCode: data.paymentCode, transportCode: data.transportCode},
      'Price can\'t be calculated');
    throw new Error('Price can\'t be calculated')
  }

  // calculate price
  const transportSum = ProductsSum < transportMethod.freeFrom ? transportMethod.price : 0;
  const paymentSum = ProductsSum < paymentMethod.freeFrom ? paymentMethod.price : 0;

  //return sum of all
  return ProductsSum + paymentSum + transportSum;
}
