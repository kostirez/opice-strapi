const fs = require('fs');
const { setupStrapi, cleanupStrapi } = require("./strapi");
const {getVS} = require("../src/helpers/invoiceId");
beforeAll(async () => {
  await setupStrapi();
});
afterAll(async () => {
  await cleanupStrapi();
});

it("vs code is calculated", async () => {
  const vs = await getVS(123);
  expect(vs).toBeDefined();
});


it("vs code - last digits match", async () => {
  const vs = await getVS(23);
  expect(vs).toContain('23')
});
