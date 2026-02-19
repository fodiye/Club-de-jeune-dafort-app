export default {
  routes: [
    {
      method: 'GET',
      path: '/cotisations/mine',
      handler: 'cotisation.findMine',
      config: {
        policies: [],
      },
    },
  ],
};
