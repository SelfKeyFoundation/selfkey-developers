/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'exchanges',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: '/img/key-exchanges.png',
    infoLink: 'https://selfkey.org',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Developers',
  tagline: 'Developer Support for SelfKey Projects',
  url: 'https://selfkeyfoundation.github.io',
  baseUrl: '/selfkey-developers',

  // Used for publishing and more
  projectName: 'selfkey-developers',
  organizationName: 'SelfKeyFoundation',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'getting-started/selfkey-intro', label: 'Docs'},
    {doc: 'resources/overview', label: 'Resources'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],
  disableHeaderTitle: true,

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/logo.png',
  footerIcon: 'img/logo.png',
  favicon: 'img/favicon.png',

  /* colors for website */
  colors: {
    primaryColor: '#195d6d',
    secondaryColor: '#1e7287',
  },

  /* custom fonts for website */
  fonts: {
    myFont: [
      "Proxima Nova",
      "Sans-Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' SelfKey Foundation',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'obsidian',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/logo.png',
  twitterImage: 'img/logo.png'
};

module.exports = siteConfig;
