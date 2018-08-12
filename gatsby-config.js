const secrets = require('./secrets.json')
const { spaceId, accessToken } = secrets

module.exports = {
  siteMetadata: {
    title: 'Qucode - React Development',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId,
        accessToken,
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {},
    },
  ],
}
