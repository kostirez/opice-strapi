'use strict';

/**
 * feed-creator service
 */

module.exports = () => ({
  generateShopItem(product) {
    return `
  <SHOPITEM>
    <PRODUCTNAME>${product.name}</PRODUCTNAME>
    <DESCRIPTION><![CDATA[${product.description}]]></DESCRIPTION>
    <URL>https://www.zrzavaopice.cz/eshop/${product.category}/?id=${product.id}</URL>
    <PRICE_VAT>${product.price}</PRICE_VAT>
    <ITEM_ID>${product.id}</ITEM_ID>
    ${this.generatePics(product.pictures)}
    ${this.generateCategory(product)}
    <PRODUCT>${product.name}</PRODUCT>
    <VISIBILITY>1</VISIBILITY>
    ${this.generateTransportXml(true)}
    <PARAM>
      <PARAM_NAME>Barva</PARAM_NAME>
      <VAL>Modrá, Bílá, Oranžová, Šedá, Průhledná</VAL>
    </PARAM>
  </SHOPITEM>`
  },

  generatePics(pictures) {
    const main = `<IMGURL>https://strapi.zrzavaopice.cz${pictures[0].url}</IMGURL>`;
    let others = '';
    pictures.forEach(p => {
      others += `  <IMGURL_ALTERNATIVE>https://strapi.zrzavaopice.cz${p.url}</IMGURL_ALTERNATIVE>\n`
    })
    return main + '\n' + others;
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
