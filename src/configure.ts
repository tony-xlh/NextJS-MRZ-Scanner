import { LicenseManager, CoreModule } from "dynamsoft-capture-vision-bundle";

// LICENSE ALERT - README
// To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==", true);

// You can visit https://www.dynamsoft.com/customer/license/trialLicense/?product=dcv&package=cross-platform to get your own trial license good for 30 days.
// LICENSE ALERT - THE END

// Load the engine files (.wasm/.worker.js) from the CDN so that webpack
// bundling does not break the SDK's sibling-file resolution in Next.js.
CoreModule.engineResourcePaths = {
  rootDirectory: "https://cdn.jsdelivr.net/npm/"
};
