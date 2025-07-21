exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  specs: ["test.e2e.js"],

  exclude: [],

  services: [
    [
      "browserstack",
      {
        accessibility: true,
        accessibilityOptions: {
          wcagVersion: "wcag21a",
          includeIssueType: {
            bestPractice: false,
            needsReview: true,
          },
        },
      },
    ],
  ],

  maxInstances: 10,
  capabilities: [
    {
      browserName: "Chrome",
      browserVersion: "latest",
      "bstack:options": {
        os: "Windows",
        osVersion: "11",
        projectName: "404Deals Black Friday Testing",
        buildName: "E2E Tests",
      },
    },
    {
      browserName: "firefox",
      browserVersion: "latest",
      "bstack:options": {
        os: "Windows",
        osVersion: "11",
        projectName: "404Deals Black Friday Testing",
        buildName: "E2E Tests",
      },
    },
    {
      browserName: "Edge",
      browserVersion: "latest",
      "bstack:options": {
        os: "Windows",
        osVersion: "11",
        projectName: "404Deals Black Friday Testing",
        buildName: "E2E Tests",
      },
    },
    {
      browserName: "safari",
      browserVersion: "latest",
      "bstack:options": {
        os: "OS X",
        osVersion: "Sequoia",
        projectName: "404Deals Black Friday Testing",
        buildName: "E2E Tests",
      },
    },
  ],

  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: "mocha",
  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  onPrepare: function (config, capabilities) {},
};
