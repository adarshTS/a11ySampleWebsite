exports.config = {
  runner: "browserstack",
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  hostname: "hub-cloud.browserstack.com",
  port: 443,
  protocol: "https",
  path: "/wd/hub",

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

  onPrepare: function (config, capabilities) {
    console.log(
      "🚀 Running tests on BrowserStack - skipping local driver setup"
    );
    process.env.WDIO_SKIP_DRIVER_INSTALL = "true";
    process.env.SKIP_SELENIUM_INSTALL = "true";
    process.env.EDGEDRIVER_SKIP_DOWNLOAD = "true";
  },
};
