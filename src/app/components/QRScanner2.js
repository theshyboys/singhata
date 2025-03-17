import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { useRouter } from 'next/navigation';


export default function QRScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanResult, setScanResult] = useState('');
  const [scanning, setScanning] = useState(false);
  const router = useRouter();


  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    let animationFrame;
    let stream;

    const startScanning = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setScanning(true);
          requestAnimationFrame(tick);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    const tick = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        
        if (code) {
          setScanResult(code.data);
          setScanning(false);
          router.push(`/product/` + code.data);
          
          //alert(code.data);

          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
        } else if (scanning) {
          animationFrame = requestAnimationFrame(tick);
        }
      } else if (scanning) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    startScanning();

    return () => {
      cancelAnimationFrame(animationFrame);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [scanning]);

  const handleRescan = () => {
    setScanResult('');
    setScanning(true);
  };

  return (
    <div className="qr-scanner">
        <video ref={videoRef} style={{ display: 'none' }}></video>
        <canvas ref={canvasRef} style={{ width: '100%' }}></canvas>
    </div>
  );
}