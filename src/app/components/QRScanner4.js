'use client';

import { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from 'next/navigation';

export default function QRScanner() {
  const [scanResult, setScanResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Create QR scanner only on client side
    if (typeof window !== 'undefined') {
      
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      onScanSuccess
    );

    function onScanSuccess(result) {
      setScanResult(result);
      
      // Redirect to product page with the scanned product ID
      router.push(`/product/${result}`);
      //html5QrCode.clear();
      html5QrCode.stop();
      //html5QrCode.clear();
    }

   
      // Clean up on component unmount
      return () => {
        console.log('RETURN');
        //html5QrCode.stop();
        html5QrCode.clear();
      };
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center">
      <div id="reader" className="w-full"></div>
      {scanResult && (
        <div className="mt-4">
          {/* <p>QR Code detected: {scanResult}</p> */}
        </div>
      )}
    </div>
  );
}