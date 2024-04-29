'use strict';

const fs = require('node:fs');

module.exports = {
  async create(ctx) {
    if (ctx.request.body.model === "product") {
      const products = await strapi.entityService.findMany('api::product.product',
        {populate: {
            pictures: true,
            zboziOptions: {
              populate: {
                pic: true,
              },
            },
        }});
      try {
        ctx.body = 'ok';
        var writeStream = fs.createWriteStream("public/feed_zbozi.xml");
        writeStream.write('<?xml version="1.0" encoding="utf-8"?> \n');
        writeStream.write('<SHOP xmlns="http://www.zbozi.cz/ns/offer/1.0">');
        products.forEach(p => {
          writeStream.write(strapi.service('api::feed-creator.feed-creator').generateShopOptions(p));
        })
        writeStream.write('\n</SHOP>\n');
        writeStream.end();
      } catch (err) {
        ctx.body = err;
      }
    }
    return ctx.send({ message: "xml file is created" });
  }
};

