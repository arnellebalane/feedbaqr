module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        features: {
          auth: false,
          database: false,
          firestore: true,
          storage: true,
          messaging: false,
          functions: false,
          performance: false,
        },
        credentials: {
          apiKey: 'AIzaSyBXewH-sBCdokkUVKqmgnFpNB72Jesoqu4',
          authDomain: 'feedbaqr.firebaseapp.com',
          databaseURL: 'https://feedbaqr.firebaseio.com',
          projectId: 'feedbaqr',
          storageBucket: 'feedbaqr.appspot.com',
          messagingSenderId: '900927958030',
          appId: '1:900927958030:web:cf48a72c686cc3d229a05f',
          measurementId: 'G-T9H3Z3DV63',
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
