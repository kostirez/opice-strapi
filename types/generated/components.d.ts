import type { Schema, Attribute } from '@strapi/strapi';

export interface BasicArticlePreview extends Schema.Component {
  collectionName: 'components_basic_article_previews';
  info: {
    displayName: 'ArticlePreview';
    icon: 'file';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    urlParam: Attribute.String;
    mainImage: Attribute.Media;
    article: Attribute.Relation<
      'basic.article-preview',
      'oneToOne',
      'api::article.article'
    >;
  };
}

export interface BasicBtn extends Schema.Component {
  collectionName: 'components_basic_btns';
  info: {
    displayName: 'btn';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    link: Attribute.String;
    style: Attribute.Enumeration<['primary', 'secondary', 'link']>;
  };
}

export interface BasicCard extends Schema.Component {
  collectionName: 'components_basic_cards';
  info: {
    displayName: 'card';
  };
  attributes: {
    head: Attribute.String;
    text: Attribute.String;
    pic: Attribute.Media;
    link: Attribute.String;
  };
}

export interface BasicEmojiText extends Schema.Component {
  collectionName: 'components_basic_emoji_texts';
  info: {
    displayName: 'emojiText';
  };
  attributes: {
    text: Attribute.String;
    icon: Attribute.Media;
  };
}

export interface BasicFaq extends Schema.Component {
  collectionName: 'components_basic_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    question: Attribute.Text;
    answer: Attribute.Text;
  };
}

export interface BasicInnerHtml extends Schema.Component {
  collectionName: 'components_basic_inner_htmls';
  info: {
    displayName: 'innerHtml';
  };
  attributes: {
    text: Attribute.String;
    html: Attribute.Text;
  };
}

export interface BasicLink extends Schema.Component {
  collectionName: 'components_basic_links';
  info: {
    displayName: 'link';
    icon: 'arrowRight';
  };
  attributes: {
    name: Attribute.String;
    url: Attribute.String;
  };
}

export interface BasicList extends Schema.Component {
  collectionName: 'components_basic_lists';
  info: {
    displayName: 'list';
  };
  attributes: {
    items: Attribute.Component<'basic.emoji-text', true>;
  };
}

export interface BasicParagraph extends Schema.Component {
  collectionName: 'components_basic_paragraphs';
  info: {
    displayName: 'paragraph';
    description: '';
  };
  attributes: {
    head: Attribute.String;
    text: Attribute.Text;
  };
}

export interface BasicSlide extends Schema.Component {
  collectionName: 'components_basic_slides';
  info: {
    displayName: 'slide';
    icon: 'slideshow';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.Text;
    image: Attribute.Media;
  };
}

export interface BasicTest extends Schema.Component {
  collectionName: 'components_basic_tests';
  info: {
    displayName: 'infoCard';
    description: '';
  };
  attributes: {
    text: Attribute.Text;
    head: Attribute.String;
    btnText: Attribute.String;
    btnLink: Attribute.String;
  };
}

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

export interface CategoryCard extends Schema.Component {
  collectionName: 'components_category_cards';
  info: {
    displayName: 'card';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    pic: Attribute.Media;
    link: Attribute.String;
    head: Attribute.String;
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
    freeFrom: Attribute.Integer;
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

export interface CategoryProductDetail extends Schema.Component {
  collectionName: 'components_category_product_details';
  info: {
    displayName: 'ProductDetail';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    pics: Attribute.Media;
    text: Attribute.RichText;
  };
}

export interface CategoryProductOption extends Schema.Component {
  collectionName: 'components_category_product_options';
  info: {
    displayName: 'productOption';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    price: Attribute.Integer;
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

export interface CoreMenuItem extends Schema.Component {
  collectionName: 'components_core_menu_items';
  info: {
    displayName: 'MenuItem';
  };
  attributes: {
    text: Attribute.String;
    path: Attribute.String;
  };
}

export interface CoreMetaData extends Schema.Component {
  collectionName: 'components_core_meta_data';
  info: {
    displayName: 'metaData';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    tags: Attribute.Component<'core.meta-tags', true>;
  };
}

export interface CoreMetaTags extends Schema.Component {
  collectionName: 'components_core_meta_tags';
  info: {
    displayName: 'metaTags';
  };
  attributes: {
    name: Attribute.String;
    content: Attribute.String;
  };
}

export interface EshopBoxAvailable extends Schema.Component {
  collectionName: 'components_eshop_box_availables';
  info: {
    displayName: 'boxAvailable';
  };
  attributes: {
    sinceWhen: Attribute.Date;
    count: Attribute.Integer;
  };
}

export interface EshopMicrogreensBox extends Schema.Component {
  collectionName: 'components_eshop_microgreens_boxes';
  info: {
    displayName: 'microgreensBox';
  };
  attributes: {
    boxId: Attribute.String;
    count: Attribute.Integer;
  };
}

export interface PageItemBanner extends Schema.Component {
  collectionName: 'components_page_item_banners';
  info: {
    displayName: 'banner';
  };
  attributes: {
    head: Attribute.String;
    text: Attribute.Text;
    pic: Attribute.Media;
  };
}

export interface PageItemBlog extends Schema.Component {
  collectionName: 'components_page_item_blogs';
  info: {
    displayName: 'blog';
    icon: 'file';
    description: '';
  };
  attributes: {
    head: Attribute.String;
    text: Attribute.Text;
    articles: Attribute.Component<'basic.article-preview', true>;
  };
}

export interface PageItemCardsWithText extends Schema.Component {
  collectionName: 'components_page_item_cards_with_texts';
  info: {
    displayName: 'cardsWithText';
  };
  attributes: {
    head: Attribute.String;
    text: Attribute.Text;
    cards: Attribute.Component<'basic.card', true>;
    btn: Attribute.Component<'basic.btn'>;
  };
}

export interface PageItemCards extends Schema.Component {
  collectionName: 'components_page_item_cards';
  info: {
    displayName: 'cards';
    description: '';
  };
  attributes: {
    head: Attribute.String;
    cards: Attribute.Component<'basic.card', true>;
    size: Attribute.Enumeration<['small', 'big']>;
  };
}

export interface PageItemContactForm extends Schema.Component {
  collectionName: 'components_page_item_contact_forms';
  info: {
    displayName: 'contactForm';
    description: '';
  };
  attributes: {
    head: Attribute.String;
    showMail: Attribute.Boolean & Attribute.DefaultTo<true>;
    showSoc: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface PageItemEshopMenu extends Schema.Component {
  collectionName: 'components_page_item_eshop_menus';
  info: {
    displayName: 'EshopMenu';
  };
  attributes: {
    items: Attribute.Component<'basic.card', true>;
    head: Attribute.String;
  };
}

export interface PageItemFaq extends Schema.Component {
  collectionName: 'components_page_item_faqs';
  info: {
    displayName: 'Faq';
  };
  attributes: {
    head: Attribute.String;
    faqs: Attribute.Component<'basic.faq', true>;
  };
}

export interface PageItemInfoCards extends Schema.Component {
  collectionName: 'components_page_item_info_cards';
  info: {
    displayName: 'infoCards';
  };
  attributes: {
    cards: Attribute.Component<'basic.test', true>;
    head: Attribute.String;
  };
}

export interface PageItemOrderMicrogreens extends Schema.Component {
  collectionName: 'components_page_item_order_microgreens';
  info: {
    displayName: 'orderMicrogreens';
  };
  attributes: {
    head: Attribute.String;
    text: Attribute.Text;
  };
}

export interface PageItemPicAndText extends Schema.Component {
  collectionName: 'components_page_item_pic_and_texts';
  info: {
    displayName: 'picAndText';
    description: '';
  };
  attributes: {
    head: Attribute.String;
    text: Attribute.String;
    pic: Attribute.Media;
    btn: Attribute.Component<'basic.btn'>;
    layout: Attribute.Enumeration<['left', 'right', 'leftFlow', 'rightFlow']>;
  };
}

export interface PageItemProducts extends Schema.Component {
  collectionName: 'components_page_item_products';
  info: {
    displayName: 'products';
    description: '';
  };
  attributes: {
    category: Attribute.String;
    head: Attribute.String;
    pageSize: Attribute.Integer;
  };
}

export interface PageItemSteps extends Schema.Component {
  collectionName: 'components_page_item_steps';
  info: {
    displayName: 'steps';
    description: '';
  };
  attributes: {
    pics: Attribute.Media;
    steps: Attribute.Component<'basic.paragraph', true>;
    style: Attribute.Enumeration<['left', 'right']>;
    head: Attribute.String;
  };
}

export interface PageItemTextAndInnerHtml extends Schema.Component {
  collectionName: 'components_page_item_text_and_inner_htmls';
  info: {
    displayName: 'TextAndInnerHTML';
  };
  attributes: {
    items: Attribute.Component<'basic.inner-html', true>;
  };
}

export interface PageItemTitleAndPics extends Schema.Component {
  collectionName: 'components_page_item_title_and_pics';
  info: {
    displayName: 'titleAndPics';
  };
  attributes: {
    head: Attribute.String;
    pics: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'basic.article-preview': BasicArticlePreview;
      'basic.btn': BasicBtn;
      'basic.card': BasicCard;
      'basic.emoji-text': BasicEmojiText;
      'basic.faq': BasicFaq;
      'basic.inner-html': BasicInnerHtml;
      'basic.link': BasicLink;
      'basic.list': BasicList;
      'basic.paragraph': BasicParagraph;
      'basic.slide': BasicSlide;
      'basic.test': BasicTest;
      'category.address': CategoryAddress;
      'category.card': CategoryCard;
      'category.email-template': CategoryEmailTemplate;
      'category.eshop-category': CategoryEshopCategory;
      'category.menu-item': CategoryMenuItem;
      'category.payment': CategoryPayment;
      'category.person': CategoryPerson;
      'category.pic-item': CategoryPicItem;
      'category.product-detail': CategoryProductDetail;
      'category.product-option': CategoryProductOption;
      'category.product-summary': CategoryProductSummary;
      'category.restaurants': CategoryRestaurants;
      'category.transport': CategoryTransport;
      'core.menu-item': CoreMenuItem;
      'core.meta-data': CoreMetaData;
      'core.meta-tags': CoreMetaTags;
      'eshop.box-available': EshopBoxAvailable;
      'eshop.microgreens-box': EshopMicrogreensBox;
      'page-item.banner': PageItemBanner;
      'page-item.blog': PageItemBlog;
      'page-item.cards-with-text': PageItemCardsWithText;
      'page-item.cards': PageItemCards;
      'page-item.contact-form': PageItemContactForm;
      'page-item.eshop-menu': PageItemEshopMenu;
      'page-item.faq': PageItemFaq;
      'page-item.info-cards': PageItemInfoCards;
      'page-item.order-microgreens': PageItemOrderMicrogreens;
      'page-item.pic-and-text': PageItemPicAndText;
      'page-item.products': PageItemProducts;
      'page-item.steps': PageItemSteps;
      'page-item.text-and-inner-html': PageItemTextAndInnerHtml;
      'page-item.title-and-pics': PageItemTitleAndPics;
    }
  }
}
