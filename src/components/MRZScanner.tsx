import "../configure"; // license + CDN engine paths, executed on the client only
import { CaptureVisionRouter, CameraEnhancer, CameraView } from "dynamsoft-capture-vision-bundle";
import type { RecognizedTextLinesResult } from "dynamsoft-capture-vision-bundle";
import { MutableRefObject, useEffect, useRef } from "react";
import React from "react";

export interface MRZScannerProps{
  isScanning?:boolean;
  onInitialized?:()=>void;
  onScanned?:(results:RecognizedTextLinesResult)=>void;
}

const MRZScanner: React.FC<MRZScannerProps> = (props:MRZScannerProps) => {
  const initialized = useRef(false);
  const cameraEnhancer = useRef<CameraEnhancer|null>(null);
  const router = useRef<CaptureVisionRouter|null>(null);
  const container:MutableRefObject<HTMLDivElement|null>  = useRef(null);
  useEffect(()=>{
    init();
  },[])

  useEffect(()=>{
    if (props.isScanning === true) {
      startScanning();
    }else{
      stopScanning();
    }
  },[props.isScanning])

  const init = async () => {
    if (initialized.current == false) {
      initialized.current = true;
      await initCameraEnhancer();
      await initCaptureVisionRouter();
      if (props.onInitialized) {
        props.onInitialized();
      }
      if (props.isScanning === true) {
        startScanning();
      }
    }
  }

  const initCaptureVisionRouter = async () => {
    // Preload the deep-learning models used by the MRZ template so the first
    // recognition does not pay the download cost.
    await CaptureVisionRouter.appendDLModelBuffer(["MRZCharRecognition", "MRZTextLineRecognition"]);
    router.current = await CaptureVisionRouter.createInstance();
    // Load the MRZ text line specifications from the custom template file.
    await router.current.initSettings("/template.json");
    // Define a callback for results.
    router.current.addResultReceiver({
      onRecognizedTextLinesReceived: (result: RecognizedTextLinesResult) => {
        console.log(result);
        if (props.onScanned) {
          props.onScanned(result);
        }
      }
    });
    if (cameraEnhancer.current) {
      await router.current.setInput(cameraEnhancer.current);
    }
  }

  const initCameraEnhancer = async () => {
    const cameraView = await CameraView.createInstance();
    cameraEnhancer.current = await CameraEnhancer.createInstance(cameraView);
    container.current!.append(cameraView.getUIElement());
  }

  const startScanning = async () => {
    stopScanning();
    if (cameraEnhancer.current && router.current) {
      cameraEnhancer.current.open();
      router.current.startCapturing("ReadMRZ")
    }
  }

  const stopScanning = () => {
    if (cameraEnhancer.current && router.current) {
      router.current.stopCapturing();
      cameraEnhancer.current.close();
    }
  }

  return (
    <div ref={container} style={{width:"100%",height:"100%"}}></div>
  )
}

export default MRZScanner;
