'use strict';

const fs = require('node:fs');

module.exports = {
  async create(ctx) {
    const products = await strapi.entityService.findMany('api::product.product',  {populate: '*'});
    try {
      ctx.body = 'ok';
      var writeStream = fs.createWriteStream("public/feed_zbozi.xml");
      writeStream.write('<?xml version="1.0" encoding="utf-8"?>');
      writeStream.write('<SHOP xmlns="http://www.zbozi.cz/ns/offer/1.0">');
      products.forEach(p => {
        writeStream.write(strapi.service('api::feed-creator.feed-creator').generateShopItem(p));
      })
      writeStream.write('\n</SHOP>\n');
      writeStream.end();
    } catch (err) {
      ctx.body = err;
    }
  }
};

