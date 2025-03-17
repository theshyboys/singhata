'use client';
import React, { useRef, useState, useEffect } from "react";
//import QrReader from "react-web-qr-reader";
import { QrReader } from "react-qr-reader";
//import { redirect } from "react-router-dom";
import { useRouter } from 'next/navigation';


const QRScanner2 = () => {
  const delay = 500;
  const router = useRouter();
  const qrCodeRef = useRef(null);

  const stopVideo = () => {
    qrCodeRef.current.clearComponent();
  };

  useEffect(() => {
    console.log("reader mount");
    console.log(qrCodeRef?.current);
    return () => {
      console.log("unmount");
      qrCodeRef?.current.clearComponent();
    };
  }, []);

  const previewStyle = {
    height: 250,
    width: 250,
  };

  const [result, setResult] = useState("No result");

  const handleScan = (result) => {
    if (result) {
      console.log("result.data", result.data);
      setResult(result.data);
      router.push(`/product/${result}`);
      qrCodeRef?.current.stopCamera();
      qrCodeRef?.current.clearComponent();
      //redirect(`/success/`);
    }
  };

  const handleError = (error) => {
    console.log(error);
  };

  return (
      <QrReader
        ref={qrCodeRef}
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
  );
};

export default QRScanner2;