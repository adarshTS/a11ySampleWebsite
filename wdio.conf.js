const now = new Date();
const date = now.toLocaleDateString("en-US");
const time = now.toLocaleTimeString("en-US", { hour12: false });
const commonOptions = {
  projectName: "404Deals Black Friday Testing",
  buildName: `E2E Tests ${date} ${time}`,
  selfHeal: true
};

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
        ...commonOptions,
      },
    },
    // {
    //   browserName: "firefox",
    //   browserVersion: "latest",
    //   "bstack:options": {
    //     os: "Windows",
    //     osVersion: "11",
    //     ...commonOptions,
    //   },
    // },
    // {
    //   browserName: "edge",
    //   browserVersion: "latest",
    //   "bstack:options": {
    //     os: "Windows",
    //     osVersion: "11",
    //     ...commonOptions,
    //   },
    // },
    // {
    //   browserName: "safari",
    //   browserVersion: "latest",
    //   "bstack:options": {
    //     os: "OS X",
    //     osVersion: "Sequoia",
    //     ...commonOptions,
    //   },
    // },
  ],

  logLevel: "info",
  waitforTimeout: 100000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: "mocha",
  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 100000,
  },
};