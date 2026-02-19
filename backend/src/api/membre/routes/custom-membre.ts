export default {
  routes: [
    {
      method: 'GET',
      path: '/membres/me',
      handler: 'membre.findMe',
      config: {
        policies: [],
      },
    },
  ],
};
