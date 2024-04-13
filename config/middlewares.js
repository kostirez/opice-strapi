module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  'strapi::cors',
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "editor.unlayer.com"],
          "frame-src": ["'self'", "editor.unlayer.com"],
          "img-src": [
            "'self'",
            "data:",
            "cdn.jsdelivr.net",
            "strapi.io",
            "s3.amazonaws.com",
          ],
        },
      },
    },
  },
];
