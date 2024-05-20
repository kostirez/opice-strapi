
const { getVS } = require("./invoiceId");
const { savePngFileFromUrl } = require("./fileGetter");
const logger = require("../../logger");

const generateQrCode = async (order) => {
  const invoice = await strapi.entityService.findOne('api::invoice.invoice', 1, {populate: '*'});
  const vs = await getVS(order.id);
  const api = 'https://api.paylibo.com/paylibo/generator/czech/image';
  const url = `${api}?accountNumber=${invoice.account}&bankCode=${invoice.bankNum}&amount=${order.totalPrice}&currency=CZK&vs=${vs}`;
  const saveDirectory = '.tmp/qrPayment/';
  let filePath ='';
  try {
    filePath = await savePngFileFromUrl(url, saveDirectory, vs)
  } catch (error) {
    logger.error({order, error}, 'generate qrcode failed');
  }
  return filePath;
}


module.exports = {
  generateQrCode
}
