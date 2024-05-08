

const getVS = async (orderId) => {
  const {baseNum} = await strapi.entityService.findOne('api::invoice.invoice', 1);
  const vs = Number(baseNum) + Number(orderId);
  return vs + '';
}

module.exports = {
  getVS,
};
