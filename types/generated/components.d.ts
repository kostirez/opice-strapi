import type { Schema, Attribute } from '@strapi/strapi';

export interface CategoryEshopCategory extends Schema.Component {
  collectionName: 'components_category_eshop_categories';
  info: {
    displayName: 'eshop_category';
  };
  attributes: {
    label: Attribute.String;
    img: Attribute.Media;
  };
}

export interface CategoryRestaurants extends Schema.Component {
  collectionName: 'components_category_restaurants';
  info: {
    displayName: 'restaurants';
  };
  attributes: {
    head: Attribute.String;
    description: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'category.eshop-category': CategoryEshopCategory;
      'category.restaurants': CategoryRestaurants;
    }
  }
}
