import fs from "fs";

export const config = {
    specs: [
        "../test/specs/**/*.js"
    ],
    suites: {
        regression: ["../test/specs/**/*.js"]
    },
    maxInstances: 5,
    capabilities: [{
        browserName: "chrome",
        "goog:chromeOptions": {
            args: [
                "--disable-infobars",
                "--disable-popup-blocking",
                "--disable-notifications",
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-devtools",
                "--disable-extensions",
                "--window-size=1920,1080"
            ],
            excludeSwitches: ["enable-logging"]
        },
        "wdio:enforceWebDriverClassic": true
    }],
    logLevel: "info",
    outputDir: "output/logs/wdio",
    waitforTimeout: 5000,
    connectionRetryTimeout: 10000,
    connectionRetryCount: 3,
    services: ["chromedriver"],
    framework: "mocha",
    mochaOpts: {
        timeout: 3600000
    },
    reporters: [
        "spec",
        ["junit", {
            outputDir: "output/results",
            outputFileFormat: function(options) {
                return `report-${options.cid}-${options.capabilities.browserName}.xml`;
            }
        }]
    ],
    beforeSession: async () => {
        global.config = JSON.parse(fs.readFileSync("./config/config.json"));
    },
    before: async () => {
        await browser.maximizeWindow();
    }
};