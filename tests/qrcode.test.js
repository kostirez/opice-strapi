const { setupStrapi, cleanupStrapi } = require("./strapi");
const {generateQrCode} = require("../src/helpers/grcode");
const fs = require("fs");

beforeAll(async () => {
  await setupStrapi();
});
afterAll(async () => {
  await cleanupStrapi();
});

const mockOrder = {
  products: [],
  transportCode: "OSOB",
  transportPlace: {},
  paymentCode: "PRE",
  gdpr: true,
  obchodniPodminky: true,
  address: {
    street: 'address 123/443',
    city: 'city',
    postCode: 12323
  },
  person: {
    name: 'name and surname',
    email: 'mail@zrzavaopice.cz',
    tel: 123123123,
  },
  note: 'note',
  totalPrice: 12321,
};

it("qrcode is created", async () => {
  const QrCodePath = await generateQrCode(mockOrder);
  expect(QrCodePath).toBeDefined();
});


it("qrcode file exist", async () => {
  const QrCodePath = await generateQrCode(mockOrder);
  expect(fs.existsSync(QrCodePath)).toBe(true)
});


it("qrcode failed without totalPrice", async () => {
  mockOrder.totalPrice = null;
  const QrCodePath = await generateQrCode(mockOrder);
  expect(fs.existsSync(QrCodePath)).toBe(false)
});
