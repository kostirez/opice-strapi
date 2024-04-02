'use strict';

/**
 * we-grow service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::we-grow.we-grow');
