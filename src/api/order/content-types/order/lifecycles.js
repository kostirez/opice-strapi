const {getVS} = require("../../../../helpers/invoiceId");
const {createInvoice} = require("../../../../helpers/invoice");
const logger = require('../../../../../logger');

module.exports = {
  async beforeUpdate(action) {
    const data = action.params.data;
    let { id } = data;
    let existing = await strapi.entityService.findOne('api::order.order', id, {populate: '*'});
    if (existing && existing.state != data.state && data.state!=='received') {
      logger.info(`update order ${id}, from ${existing.state} to ${data.state}`);
      const attachments = [];
      const invoiceId = await getVS(existing.id);

      if (data.state == 'paid' || data.state == 'done') {
        try {
          const invoiceBuffer = await createInvoice(existing);
          attachments.push(getInvoiceAsAttachment(invoiceId, invoiceBuffer))
        } catch (err) {
          logger.error({error: err}, 'invoice is not generated');
          throw new Error('invoice is not generated')
        }

      }
      logger.info({email: existing.person.email, code: data.state, id: invoiceId, attachments}, 'send email');
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
