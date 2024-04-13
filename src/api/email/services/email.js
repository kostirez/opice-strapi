'use strict';

/**
 * email service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::email.email', ({ strapi }) => ({
  async send({ to, template }) {

    if (template == 'order') {
      await strapi.plugins['email'].services.email.send({
        to,
        from: 'obchod@zrzavaopice.cz',
        subject: 'Objednávka potvrzena',
        html: '<p>potvrzujeme vasi objednavk</p>',
      });
    }

    if (template == 'message') {
      await strapi.plugins['email'].services.email.send({
        to,
        from: 'obchod@zrzavaopice.cz',
        subject: 'Odeslana zprava',
        html: '<p>potvrzujeme , ze jsme obdrzeli vasi zpravu</p>',
      });
    }


    // const templateId = "1",
    //   to = 'kostohryz@zrzavaopice.cz',
    //   from = "me@example.com",
    //   replyTo = "no-reply@example.com",
    //   subject = "[TEST] This is a test using strapi-email-designer", // If provided here will override the template's subject. Can include variables like "Welcome to {{= project_name }}"
    //   userData = {
    //     firstname: "John",
    //     lastname: "Doe",
    //     email: "blah@blah.com"
    //   }
    //
    // try {
    //   await strapi.plugins["email-designer"].services.email.send({
    //     templateId,
    //     to,
    //     from,
    //     replyTo,
    //     subject,
    //     data: userData,
    //   });
    // } catch (err) {
    //   strapi.log.debug('📺: ', err);
    // }
  },
}));
