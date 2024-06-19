const fs = require("node:fs");

const generateShopOptions = (product, server) => {
  let retItems = '';
  // if (product.productOptions.length > 0) {
  //   product.productOptions.forEach((option, index) => {
  //     const name = `${product.name} - ${option.head}`;
  //     const url = `https://www.zrzavaopice.cz/eshop/${product.category}/?id=${product.id}&amp;color=${option.code}`;
  //     const color = option.head;
  //     console.log(option)
  //     const mainPic = `https://strapi.zrzavaopice.cz${option.pic.url}`;
  //     retItems += generateShopItem(product, name, url, color, mainPic, index) + '\n';
  //   })
  // } else {
    const name = `${product.name}`;
    const url = `https://www.zrzavaopice.cz/eshop/${product.category}/?id=${product.id}`;
    const color = 'Modrá, Bílá, Oranžová, Šedá, Průhledná';
    const mainPic = `https://strapi.zrzavaopice.cz${product.pictures[0].url}`;
    retItems += generateShopItem(product, name, url, color, mainPic, '0', server) + '\n';
  // }
  return retItems;
};

const generateShopItem = (product, name, url, color, mainPic, index, server) => {
  return `
  <SHOPITEM>
    <PRODUCTNAME>${name}</PRODUCTNAME>
    <DESCRIPTION><![CDATA[${product.description}]]></DESCRIPTION>
    <URL>${url}</URL>
    <PRICE_VAT>${product.price}</PRICE_VAT>
    <ITEM_ID>${product.id + '' + index}</ITEM_ID>
    <IMGURL>${mainPic}</IMGURL>
    ${generatePics(product.pictures)}
    ${generateCategory(product)}
    <PRODUCT>${name}</PRODUCT>
    <VISIBILITY>1</VISIBILITY>
    ${generateTransportXml(true, server)}
    <PARAM>
      <PARAM_NAME>Barva</PARAM_NAME>
      <VAL>${color}</VAL>
    </PARAM>
  </SHOPITEM>`
};


const generatePics = (pictures) => {
  let others = '';
  pictures.forEach(p => {
    others += `  <IMGURL_ALTERNATIVE>https://strapi.zrzavaopice.cz${p.url}</IMGURL_ALTERNATIVE>\n`
  })
  return others;
};

const generateTransportXml = (ownTransport, server) => {
  if (server==='zbozi') {
    const base = `
  <DELIVERY_DATE>0</DELIVERY_DATE>
  <DELIVERY>
    <DELIVERY_ID>CESKA_POSTA_BALIKOVNA</DELIVERY_ID>
    <DELIVERY_PRICE>68</DELIVERY_PRICE>
  </DELIVERY>
  <DELIVERY>
    <DELIVERY_ID>BALIKOVNA_NA_ADRESU</DELIVERY_ID>
    <DELIVERY_PRICE>115</DELIVERY_PRICE>
  </DELIVERY>`

    const myPlace = ownTransport ? `
  <DELIVERY>
    <DELIVERY_ID>VLASTNI_VYDEJNI_MISTA</DELIVERY_ID>
    <DELIVERY_PRICE>0,00</DELIVERY_PRICE>
  </DELIVERY>` : ''

    return base + myPlace;
  } else {
    return `
  <DELIVERY_DATE>0</DELIVERY_DATE>
  <DELIVERY>
    <DELIVERY_ID>BALIKOVNA_BOX</DELIVERY_ID>
    <DELIVERY_PRICE>68</DELIVERY_PRICE>
  </DELIVERY>
  <DELIVERY>
    <DELIVERY_ID>CESKA_POSTA</DELIVERY_ID>
    <DELIVERY_PRICE>115</DELIVERY_PRICE>
  </DELIVERY>`
  }
};

const generateCategory = (product) => {
  const categoryText = product.category === 'misky' ? 'Sítka' : 'Sklenice';
  const groupId = product.category === 'misky' ? '115' : '145';
  return `
  <ITEMGROUP_ID>${groupId}</ITEMGROUP_ID>
  <CATEGORYTEXT>${categoryText}</CATEGORYTEXT>
  <CUSTOM_LABEL_0>${categoryText}</CUSTOM_LABEL_0>
    `
};

const writeZbozi = (products) => {
  try {
    var writeStream = fs.createWriteStream("public/feed_zbozi.xml");
    writeStream.write('<?xml version="1.0" encoding="utf-8"?> \n');
    writeStream.write('<SHOP xmlns="http://www.zbozi.cz/ns/offer/1.0">');
    products.forEach(p => {
      if (p.category!='seminka') {
        writeStream.write(generateShopOptions(p, 'zbozi'));
      }
    })
    writeStream.write('\n</SHOP>\n');
    writeStream.end();
  } catch (err) {
    console.log('error', err)
  }
}

const writeHeureka = (products) => {
  try {
    var writeStream = fs.createWriteStream("public/feed_heureka.xml");
    writeStream.write('<?xml version="1.0" encoding="utf-8"?> \n');
    writeStream.write('<SHOP>');
    products.forEach(p => {
      if (p.category!='seminka') {
        writeStream.write(generateShopOptions(p, 'heureka'));
      }
    })
    writeStream.write('\n</SHOP>\n');
    writeStream.end();
  } catch (err) {
    console.log('error', err)
  }
}


module.exports = {
  async  afterUpdate(action) {
    const products = await strapi.entityService.findMany('api::product.product',
      {populate: {
          pictures: true,
          productOptions: {
            populate: {
              pic: true,
            },
          },
        }});
    writeZbozi(products);
    writeHeureka(products)
  }
}

