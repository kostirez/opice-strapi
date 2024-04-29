'use strict';

/**
 * feed-creator service
 */

module.exports = () => ({
  generateShopOptions(product) {
    let retItems = '';
    if (product.zboziOptions.length > 0) {
      product.zboziOptions.forEach((option, index) => {
        const name = `${product.name} - ${option.head}`;
        const url = `https://www.zrzavaopice.cz/eshop/${product.category}/?id=${product.id}&amp;color=${option.code}`;
        const color = option.head;
        const mainPic = `https://strapi.zrzavaopice.cz${option.pic.url}`;
        retItems += this.generateShopItem(product, name, url, color, mainPic, index) + '\n';
      })
    } else {
      const name = `${product.name}`;
      const url = `https://www.zrzavaopice.cz/eshop/${product.category}/?id=${product.id}`;
      const color = 'Modrá, Bílá, Oranžová, Šedá, Průhledná';
      const mainPic = `https://strapi.zrzavaopice.cz${product.pictures[0].url}`;
      retItems += this.generateShopItem(product, name, url, color, mainPic, '0') + '\n';
    }
    return retItems;
  },

  generateShopItem(product, name, url, color, mainPic, index) {
    return `
  <SHOPITEM>
    <PRODUCTNAME>${name}</PRODUCTNAME>
    <DESCRIPTION><![CDATA[${product.description}]]></DESCRIPTION>
    <URL>${url}</URL>
    <PRICE_VAT>${product.price}</PRICE_VAT>
    <ITEM_ID>${product.id + '' + index}</ITEM_ID>
    <IMGURL>${mainPic}</IMGURL>
    ${this.generatePics(product.pictures)}
    ${this.generateCategory(product)}
    <PRODUCT>${name}</PRODUCT>
    <VISIBILITY>1</VISIBILITY>
    ${this.generateTransportXml(true)}
    <PARAM>
      <PARAM_NAME>Barva</PARAM_NAME>
      <VAL>${color}</VAL>
    </PARAM>
  </SHOPITEM>`
  },

  generatePics(pictures) {
    let others = '';
    pictures.forEach(p => {
      others += `  <IMGURL_ALTERNATIVE>https://strapi.zrzavaopice.cz${p.url}</IMGURL_ALTERNATIVE>\n`
    })
    return others;
  },

  generateTransportXml(ownTransport) {
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
  },
  generateCategory(product) {
    const categoryText = product.category === 'misky' ? 'Sítka' : 'Sklenice';
    const groupId = product.category === 'misky' ? '115' : '145';
    return `
  <ITEMGROUP_ID>${groupId}</ITEMGROUP_ID>
  <CATEGORYTEXT>${categoryText}</CATEGORYTEXT>
  <CUSTOM_LABEL_0>${categoryText}</CUSTOM_LABEL_0>
    `
  }
});
