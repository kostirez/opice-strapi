import type { Schema, Attribute } from '@strapi/strapi';

export interface CategoryAddress extends Schema.Component {
  collectionName: 'components_category_addresses';
  info: {
    displayName: 'address';
    description: '';
  };
  attributes: {
    street: Attribute.String;
    city: Attribute.String;
    postCode: Attribute.Integer;
  };
}

export interface CategoryEmailTemplate extends Schema.Component {
  collectionName: 'components_category_email_templates';
  info: {
    displayName: 'emailTemplate';
    description: '';
  };
  attributes: {
    from: Attribute.String;
    html: Attribute.Text;
    subject: Attribute.String;
    code: Attribute.String;
  };
}

export interface CategoryEshopCategory extends Schema.Component {
  collectionName: 'components_category_eshop_categories';
  info: {
    displayName: 'eshop_category';
    description: '';
  };
  attributes: {
    head: Attribute.String;
    pic: Attribute.Media;
    url: Attribute.String;
    icon: Attribute.Media;
  };
}

export interface CategoryMenuItem extends Schema.Component {
  collectionName: 'components_category_menu_items';
  info: {
    displayName: 'MenuItem';
  };
  attributes: {
    head: Attribute.String;
    url: Attribute.String;
  };
}

export interface CategoryPayment extends Schema.Component {
  collectionName: 'components_category_payments';
  info: {
    displayName: 'PaymentTransport';
    description: '';
  };
  attributes: {
    head: Attribute.String;
    text: Attribute.Text;
    code: Attribute.String;
    price: Attribute.Decimal;
    icon: Attribute.Media;
  };
}

export interface CategoryPerson extends Schema.Component {
  collectionName: 'components_category_people';
  info: {
    displayName: 'person';
  };
  attributes: {
    name: Attribute.String;
    email: Attribute.String;
    tel: Attribute.BigInteger;
  };
}

export interface CategoryPicItem extends Schema.Component {
  collectionName: 'components_category_pic_items';
  info: {
    displayName: 'PicItem';
    description: '';
  };
  attributes: {
    head: Attribute.String;
    pic: Attribute.Media;
  };
}

export interface CategoryProductSummary extends Schema.Component {
  collectionName: 'components_category_product_summaries';
  info: {
    displayName: 'ProductSummary';
  };
  attributes: {
    name: Attribute.String;
    color: Attribute.String;
    size: Attribute.String;
    count: Attribute.Integer;
    priceForOne: Attribute.Decimal;
  };
}

export interface CategoryRestaurants extends Schema.Component {
  collectionName: 'components_category_restaurants';
  info: {
    displayName: 'TextItem';
    description: '';
  };
  attributes: {
    head: Attribute.String;
    text: Attribute.Text;
  };
}

export interface CategoryTransport extends Schema.Component {
  collectionName: 'components_category_transports';
  info: {
    displayName: 'Transport';
  };
  attributes: {
    head: Attribute.String;
    text: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'category.address': CategoryAddress;
      'category.email-template': CategoryEmailTemplate;
      'category.eshop-category': CategoryEshopCategory;
      'category.menu-item': CategoryMenuItem;
      'category.payment': CategoryPayment;
      'category.person': CategoryPerson;
      'category.pic-item': CategoryPicItem;
      'category.product-summary': CategoryProductSummary;
      'category.restaurants': CategoryRestaurants;
      'category.transport': CategoryTransport;
    }
  }
}
