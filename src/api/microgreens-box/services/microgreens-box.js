'use strict';

/**
 * microgreens-box service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::microgreens-box.microgreens-box');
