const fs = require("fs");
const got = require("got");
const { pipeline } = require('stream')


module.exports = {
  async generateQrCode(amount, vs, message) {
    const api = 'https://api.paylibo.com/paylibo/generator/czech/image';
    const url = `${api}?accountNumber=2602805796&bankCode=2010&amount=${amount}&currency=CZK&vs=${vs}&message=${message}`;
    const filePath = `./.tmp/qrpayment/${vs}.png`;
    const readStream = got.stream(url);
    pipeline(readStream, fs.createWriteStream(filePath), (err) => {
      if (err) {
        console.log(err);
        return '';
      } else {
        console.log("Write complete");
        return filePath;
      }
    });
  }
}
