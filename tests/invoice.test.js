const fs = require('fs');
const { setupStrapi, cleanupStrapi } = require("./strapi");
const {createInvoice} = require("../src/helpers/invoice");
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

it("invoice is created", async () => {
  const invoiceBuffer = await createInvoice(mockOrder);
  expect(invoiceBuffer).toBeDefined();
});
