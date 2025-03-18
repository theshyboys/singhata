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
      
      const scanner = new Html5QrcodeScanner('reader', {
          fps: 10,
          qrbox: 250,
          
         // useBarCodeDetectorIfSupported: true,
          rememberLastUsedCamera: true,
         // showTorchButtonIfSupported: false,
         // showZoomSliderIfSupported: false,
         // defaultZoomValueIfSupported: 1.5,
          supportedScanTypes: [
              Html5QrcodeScanType.SCAN_TYPE_CAMERA,
              Html5QrcodeScanType.SCAN_TYPE_FILE,
          ],
          //rememberLastUsedCamera: true,
          // Use back camera
          defaultDeviceId: 'environment',
          // Camera facing mode: environment = back camera
          facingMode: { exact: 'environment' }
      },true);

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
          {/* <p>QR Code detected: {scanResult}</p> */}
        </div>
      )}
    </div>
  );
}