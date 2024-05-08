const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadAndSaveFile(url, filePath) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filePath));
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error(`Error downloading file: ${error.message}`);
  }
}

async function savePngFileFromUrl(url, saveDirectory, name) {
  try {
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
    }

    const fileName = path.basename(`${name}.png`);
    const filePath = path.join(saveDirectory, fileName);

    await downloadAndSaveFile(url, filePath);

    return filePath;
  } catch (error) {
    throw new Error(`Error saving PNG file from URL: ${error.message}`);
  }
}

module.exports = {
  savePngFileFromUrl
}
