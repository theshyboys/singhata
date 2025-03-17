'use client';

import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
//import { useRouter } from "next/router";
import { useRouter } from 'next/navigation';
//import Head from "next/head";
//import Link from "next/link";
//import axios from "axios";

export default function QRScan() {
  const router = useRouter();
  const [data, setData] = useState("No result");
 // const [showModal, setShowModal] = useState(false);
  const qrRef = useRef(null);

  const handleScan = (result, error) => {
    if (!!result) {
      setData(result?.text);      
      //await axios.post(`/api/postData`, { data });
      router.push(`/product/${data}`);
      router.reload();
      qrRef.current.stop();
    }

    if (!!error) {
      console.info(error);
    }
  };

  return (
    <div>
        <QrReader
            className="lg:h-[400px] lg:w-[400px] h-[300px] w-[300px]"
            onResult={handleScan}
            constraints={{ facingMode: "environment" }}
            style={{ width: "40%", height: "40%" }}
            ref={qrRef}
        />
    </div>
  );
}
