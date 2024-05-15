const {getVS} = require("../../../../helpers/invoiceId");
const {createInvoice} = require("../../../../helpers/invoice");
const {getDocument} = require("../../../../helpers/fileGetter");




module.exports = {
  async beforeUpdate(action) {
    const data = action.params.data;
    let { id } = data;
    let existing = await strapi.entityService.findOne('api::order.order', id, {populate: '*'});
    if (existing && existing.state != data.state && data.state!=='received') {
      const attachments = [];
      const invoiceId = await getVS(existing.id);

      if (data.state == 'paid' || data.state == 'done') {
        const invoiceName = `faktura-${invoiceId}.pdf`
        const invoicePath = `./.tmp/invoice/${invoiceName}`;
        await createInvoice(existing, invoicePath);
        const invoiceData = await getDocument(invoicePath);
        attachments.push(getInvoiceAsAttachment(invoiceId, invoiceData))
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
