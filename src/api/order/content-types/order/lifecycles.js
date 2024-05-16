const {getVS} = require("../../../../helpers/invoiceId");
const {createInvoice} = require("../../../../helpers/invoice");

module.exports = {
  async beforeUpdate(action) {
    const data = action.params.data;
    let { id } = data;
    let existing = await strapi.entityService.findOne('api::order.order', id, {populate: '*'});
    if (existing && existing.state != data.state && data.state!=='received') {
      const attachments = [];
      const invoiceId = await getVS(existing.id);

      if (data.state == 'paid' || data.state == 'done') {
        const invoiceBuffer = await createInvoice(existing);
        attachments.push(getInvoiceAsAttachment(invoiceId, invoiceBuffer))
      }

      strapi.service('api::email.email').send(
        [existing.person.email, 'obchod@zrzavaopice.cz'],
        getTemplateCode(data.state),
        {
          orderId: invoiceId,
        },
        attachments,
      );
    }
  },
};

const getInvoiceAsAttachment = (invoiceId, invoiceData) => {
  return {
    content: invoiceData.toString('base64'),
    filename: `faktura-${invoiceId}.pdf`,
    type: 'application/pdf',
    disposition: 'attachment'
  };
}

const  getTemplateCode = (state) => {
  return `order-${state}`;
}
