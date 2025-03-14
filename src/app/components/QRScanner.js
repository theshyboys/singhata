'use client';

import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import {Html5QrcodeScanType} from 'html5-qrcode';
import { useRouter } from 'next/navigation';

export default function QRScanner() {
  const [scanResult, setScanResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Create QR scanner only on client side
    //if (typeof window !== 'undefined') {
      
        const scanner = new Html5QrcodeScanner('reader',  { facingMode: { exact: "environment"} }, {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
        
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],

      });

      function success(result) {
        scanner.clear();
        setScanResult(result);
        // Redirect to product page with the scanned product ID
        router.push(`/product/${result}`);
      }

      function error(err) {
        console.warn(err);
      }

      scanner.render(success, error);


      // Clean up on component unmount
      return () => {
        scanner.clear();
      };
    //}
  }, [router]);

  return (
    <div className="flex flex-col items-center">
      <div id="reader" className="w-full"></div>
      {scanResult && (
        <div className="mt-4">
          <p>QR Code detected: {scanResult}</p>
        </div>
      )}
    </div>
  );
}