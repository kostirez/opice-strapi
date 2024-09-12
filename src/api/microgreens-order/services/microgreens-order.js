'use strict';

/**
 * microgreens-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::microgreens-order.microgreens-order', ({ strapi }) => ({
  async availabilityOk(products, pickUpDateString) {
    const microgreenBoxes = await strapi.entityService.findMany('api::microgreens-box.microgreens-box', {
      populate: {
        availableBoxes: true,
      },
    });
    const pickUpDate = new Date(pickUpDateString);

    let isOk = true
    products.forEach(p => {
      if (p.count === 0) {
        return;
      }
      const box = microgreenBoxes.find(b => b.id == p.boxId)
      for (let b of box.availableBoxes) {
        const sinceWhenString = (new Date(b.sinceWhen)).toDateString()
        if (b.count >= p.count && sinceWhenString === pickUpDate.toDateString()) {
          return;
        }
      }

      const readyToBeGrown = new Date()
      readyToBeGrown.setDate(readyToBeGrown.getDate() + box.growDuration);
      if(pickUpDate.getTime()>=readyToBeGrown.getTime()) {
        return
      }
      isOk=false;
    })
    return isOk;
  },

  async subtractAvailableBoxes(products, pickUpDateString) {
    const microgreenBoxes = await strapi.entityService.findMany('api::microgreens-box.microgreens-box', {
      populate: {
        availableBoxes: true,
      },
    });
    const pickUpDate = new Date(pickUpDateString);
    products.forEach(p => {
      const box = microgreenBoxes.find(b => b.id == p.boxId)
      let index = 0;
      for (let b of box.availableBoxes) {
        if (b.count >= p.count && (new Date(b.sinceWhen)).toDateString() === pickUpDate.toDateString()) {
          // remove from boxes
          b.count -= p.count;
          if (b.count===0){
            box.availableBoxes.splice(index, 1);
          }
          strapi.entityService
            .update('api::microgreens-box.microgreens-box', box.id, {
            data: {
              availableBoxes: box.availableBoxes,
            },
          });
          return;
        }
        index+=1;
      }
    });
  },
}));
