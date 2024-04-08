const crypto = require('crypto');

module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET') || crypto.randomBytes(16).toString('base64'),
    },
  },
  'transformer': {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      requestTransforms : {
        wrapBodyWithDataKey: true
      },
      hooks: {
        preResponseTransform : (ctx) => console.log('hello from the preResponseTransform hook!'),
        postResponseTransform : (ctx) => console.log('hello from the postResponseTransform hook!')
      },
      contentTypeFilter: {
        mode: 'allow',
        uids: {
          'api::article.article': true,
          'api::category.category': {
            'GET':true,
          }
        }
      },
      plugins: {
        ids: {
          'slugify': true,
        }
      }
    }
  },
});
