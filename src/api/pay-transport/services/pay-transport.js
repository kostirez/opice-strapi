'use strict';

/**
 * pay-transport service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pay-transport.pay-transport');
