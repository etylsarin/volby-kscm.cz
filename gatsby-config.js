const pkg = require('./package.json');
const DESC = 'KSČM je strana minulosti. Její představitelé mají na svědomí mnoho hříchů z předlistopadové i polistopadové éry.';

module.exports = {
  siteMetadata: {
    title: pkg.description,
    description: DESC,
    author: pkg.author,
    siteUrl: pkg.homepage,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: pkg.description,
        short_name: pkg.name,
        description: DESC,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: "src/images/icon.png",
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        svgo: false,
        ref: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: require.resolve(`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`),
      options: {
        path: __dirname,
      },
    },
    `gatsby-plugin-sharp`,
    "gatsby-plugin-sitemap",
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout.tsx")
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 550,
            }
          },
        ],
        rehypePlugins: [
          {
            resolve: 'rehype-slug'
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          'G-2DBHBVRPLQ'
        ],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: false,
        },
      },
    },
  ],
};
