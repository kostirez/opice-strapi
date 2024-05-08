const fs = require('fs');
const PDFDocument = require("pdfkit");
const { generateQrCode} = require("./grcode");

const createInvoice = async(order, path) => {

  const invoice = await strapi.entityService.findOne('api::invoice.invoice', 1, {populate: '*'});
  const owner = await strapi.entityService.findOne('api::owner.owner', 1, {populate: '*'});
  const payTrans = await strapi.entityService.findOne('api::pay-transport.pay-transport', 1, {populate: '*'});

  const transMethod = payTrans.transportMethods.find(t => t.code===order.transportCode)
  const payMethod = payTrans.paymentMethods.find(p => p.code===order.paymentCode)

  let doc = new PDFDocument({ size: "A4", margin: 50 });

  doc.registerFont('regular', 'fonts/Podkova-Regular.ttf')
  doc.registerFont('bold', 'fonts/Podkova-Bold.ttf')

  generateHeader(doc, getVS(order.id));
  generatePersonalInfo(doc, order, owner);
  await generatePaymentDetail(doc, invoice, order, payMethod);
  await generateInvoiceTable(doc, order, payMethod, transMethod);
  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

const generateHeader = async (doc, invoiceNum) => {
  doc
    .image("public/logo/logo_text.png", 50, 50, { width: 200 })
    .fillColor("#444444")
    .font('regular')
    .fontSize(10)
    .text('Faktura číslo:', 50, 60, { align: "right" })
    .font('bold')
    .fontSize(20)
    .text(invoiceNum, 50, 70, { align: "right" })
    .moveDown();
}

function generatePersonalInfo(doc, order, owner) {

  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Dodavatel", 50, 160)
    .text("Odběratel", 350, 160)
    .moveDown();

  doc
    .fontSize(10)
    .text(owner.name, 50, 185)
    .text(owner.address, 50, 200)
    .text(`${owner.zip}, ${owner.city}`, 50, 215)
    .text(owner.country, 50, 230)
    .text(`Ičo: ${owner.ico}`, 50, 245)
    .text('Neplátce DPH', 50, 260)
    .text('obchod@zrzavaopice.cz', 50, 275)
    .moveDown();

  doc
    .fontSize(10)
    .text(order.person.name, 350, 185)
    .text(order.address.street, 350, 200)
    .text(`${order.address.postCode}, ${order.address.city}`, 350, 215)
    .text('Česká republika', 350, 230)
    .text(order.person.email, 350, 245)
    .text(order.person.tel, 350, 260)
    .moveDown();
}

const generatePaymentDetail = async (doc, invoice, order, paymentMethod) => {

  const filePath = await generateQrCode(order);
  const vs = getVS(order.id);

  let orderDate = new Date(order.createdAt)
  const createdAt = `${orderDate.getDate()}. ${orderDate.getMonth()}. ${orderDate.getFullYear()}`;
  orderDate.setDate(orderDate.getDate() + 15);
  const payUntil = `${orderDate.getDate()}. ${orderDate.getMonth()}. ${orderDate.getFullYear()}`;


  generateHr(doc, 300);
  doc

    .text('Datum vystavení', 50, 310)
    .text('Datum splatnosti', 50, 325)
    .text('Způsob platby:', 50, 340)
    .text('Číslo účtu:', 50, 355)
    .text('Variabilní symbol:', 50, 370)
    .font('bold')
    .text(createdAt, 150, 310)
    .text(payUntil, 150, 325)
    .text(paymentMethod.head, 150, 340);
  if(paymentMethod.code === 'PRE') {
    doc
      .text(`${invoice.account}/${invoice.bankNum}`, 150, 355)
      .text(vs, 150, 370);
    if(filePath != '') {
      doc.image(filePath, 475, 310, { width: 75})
    }

  }



  generateHr(doc, 395);

}

const generateInvoiceTable = (doc, order, payMethod, transMethod) => {
  let i;
  const invoiceTableTop = 430;

  generateTableRow(
    doc,
    invoiceTableTop,
    "Položka",
    "Cena za kus",
    "Počet kusů",
    "Součet"
  );
  generateHr(doc, invoiceTableTop + 20, 3);
  let position = 0;
  for (i = 0; i < order.products.length; i++) {
    const item = order.products[i];
    position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      `${item.name} - ${item.color} `,
      formatCurrency(item.priceForOne),
      item.count,
      formatCurrency(item.priceForOne * item.count)
    );

    generateHr(doc, position + 20);
  }
  position += 30;
  generateTableRow(
    doc,
    position,
    `Doprava: ${transMethod.head}`,
    '',
    '',
    formatCurrency(transMethod.freeFrom > order.totalPrice ? transMethod.price : 0)
  );
  generateHr(doc, position + 20);
  position += 30;
  generateTableRow(
    doc,
    position,
    `Platba: ${payMethod.head}`,
    '',
    '',
    formatCurrency(payMethod.freeFrom > order.totalPrice ? payMethod.price : 0)
  );
  generateHr(doc, position + 20);

  position += 30;
  doc
    .fontSize(15)
    .font('bold')
    .text('Celkem k úhradě:', 200, position, { width: 250, align: "right" })
    .text(formatCurrency(order.totalPrice), 0, position, { align: "right" });

  generateFooter(doc, position+ 50)
}

function generateFooter(doc, y) {
  doc
    .fillColor("#b4b3b3")
    .fontSize(50)
    .font('bold')
    .text("NEPLAŤTE", 50, y,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y, lineW = 1) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(lineW)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(value) {
  return (value).toFixed(2) + ' Kč';
}


module.exports = {
  createInvoice,
};
