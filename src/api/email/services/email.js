'use strict';

/**
 * email service
 */

const { createCoreService } = require('@strapi/strapi').factories;

const sendOneMail = async (to, from, subject, html, attachments) => {
  const msg = {
    to,
    from,
    subject,
    html,
    attachments
  };
  try {
    await strapi.plugins['email'].services.email.send(msg);
  } catch (error) {
    console.error('Error sending email:', error.toString());
  }
}

const addProductTable = (products) => {
  let template = `<div style="margin-top: 1.5rem">`;
  products.forEach(p => {
    template += `
  <h4 style="color: #b85c00">${p.count} x ${p.name} - ${p.priceForOne * p.count}Kč</h4>
  `;
  });
  template += `</div>`;
  return template;
}

const addSignature = () => {
  return `
<div style="text-align: center; margin-top: 2rem; color: #b85c00">
  <h4>obchod@zrzavaopice.cz</h4>
  <h3>zrzavaopice.cz</h3>
</div>
  `
}

const fillTemplateWithData = (template, data) => {
  if (template.includes('PRODUCTS_TABLE')) {
    const productsTemplate = addProductTable(data.products);
    const regTable = new RegExp(`\\$\\{PRODUCTS_TABLE\\}`);
    template = template.replace(regTable, productsTemplate);
  }

  for (const [key, value] of Object.entries(data)) {
    const reg = new RegExp(`\\$\\{${key}\\}`);
    template = template.replace(reg, value);
  }
  return template;
}

module.exports = createCoreService('api::email.email', ({ strapi }) => ({
  async send(recipients, templateCode, templateData, attachments) {
    const emailConf = await strapi.entityService.findOne('api::email.email', 1, {populate: 'templates'});
    const template = emailConf.templates.find(t => t.code == templateCode);
    if (!template) {
      console.error('template not found')
      return
    }

    const filledTemplate = fillTemplateWithData(template.html, templateData) + addSignature();
    const filledSubject = fillTemplateWithData(template.subject, templateData);

    recipients.forEach(to => {
      sendOneMail(to, template.from, filledSubject, filledTemplate, attachments)
    })
  },
}));

