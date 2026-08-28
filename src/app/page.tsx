"use client"
import styles from "./page.module.css";
import { useState } from "react";
import type { RecognizedTextLinesResult } from "dynamsoft-capture-vision-bundle";
import dynamic from "next/dynamic";
// The Dynamsoft bundle touches `window` at import time, so all components that
// load it must be rendered client-side only.
const MRZScanner = dynamic(
  () => import("../components/MRZScanner"),
  {
    ssr: false,
  }
);
const MRZResultTable = dynamic(() => import("@/components/MRZResultTable"), { ssr: false });
export default function Home() {
  const [isScanning,setIsScanning] = useState(false);
  const [initialized,setInitialized] = useState(false);
  const [MRZ,setMRZ] = useState("");

  const onScanned = (result:RecognizedTextLinesResult) => {
    setIsScanning(false);
    if (result.textLineResultItems.length>0) {
      let str = "";
      str = result.textLineResultItems[0].text
      setMRZ(str);
    }
  }

  const toggleScanning = () => {
    setMRZ("");
    setIsScanning(!isScanning)
  }

  return (
    <main className={styles.main}>
      <h2>MRZ Scanner</h2>
      {!initialized &&(
        <button disabled>Initializing...</button>  
      )}
      {initialized &&(
        <button onClick={()=>toggleScanning()} >{isScanning?"Stop Scanning":"Start Scanning"}</button>
      )}
      <div className={styles.scanner + ((initialized && isScanning) ? "" : " "+styles.hidden)}>
        <div className={styles.cameracontainer}>
          <MRZScanner 
            isScanning={isScanning}
            onScanned={(result:RecognizedTextLinesResult)=>{onScanned(result)}}
            onInitialized={()=>{setInitialized(true)}}
          ></MRZScanner>
        </div>
      </div>
      <MRZResultTable MRZ={MRZ}></MRZResultTable>
    </main>
  );
}
