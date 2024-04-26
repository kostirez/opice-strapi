module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/feed-creator',
     handler: 'feed-creator.create',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
