import "dynamsoft-license";
import "dynamsoft-capture-vision-router";
import "dynamsoft-label-recognizer";
import { LicenseManager } from "dynamsoft-license";
import { CoreModule } from "dynamsoft-core";

if (CoreModule.isModuleLoaded("dlr") === false) {
  /** LICENSE ALERT - README
   * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
   */
  LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==");

  /**
   * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
   * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
   * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=9.6.20&utm_source=github#specify-the-license or contact support@dynamsoft.com.
   * LICENSE ALERT - THE END
   */

  CoreModule.engineResourcePaths = {
    std: 'https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-std@1.2.10/dist/',
    dip: 'https://cdn.jsdelivr.net/npm/dynamsoft-image-processing@2.2.30/dist/',
    core: "https://cdn.jsdelivr.net/npm/dynamsoft-core@3.2.30/dist/",
    license: "https://cdn.jsdelivr.net/npm/dynamsoft-license@3.2.21/dist/",
    cvr: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.2.30/dist/",
    dlr: "https://cdn.jsdelivr.net/npm/dynamsoft-label-recognizer@3.2.30/dist/",
    dce: "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.2/dist/",
    dnn: 'https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-dnn@1.0.20/dist/',
    dlrData: 'https://cdn.jsdelivr.net/npm/dynamsoft-label-recognizer-data@1.0.10/dist/',
    utility: 'https://cdn.jsdelivr.net/npm/dynamsoft-utility@1.2.20/dist/'
  };
}
