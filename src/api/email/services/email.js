'use strict';

/**
 * email service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::email.email', ({ strapi }) => ({
  async send({ to, templateCode , html}) {
    const emailConf = await strapi.entityService.findOne('api::email.email', 1, {populate: 'templates'});
    const template = emailConf.templates.find(t => t.code == templateCode);

    await strapi.plugins['email'].services.email.send({
      to,
      from: template.from,
      subject: template.subject,
      html: html,
    });

  },
}));
