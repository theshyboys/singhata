import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { useRouter } from 'next/navigation';

export default function QRScanner3() {
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
        
        //alert("startScanning");
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((err) => console.error("Error accessing camera:", err));
          setScanning(true);
          requestAnimationFrame(tick);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        //alert("Error accessing camera:", err);
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
          // Draw rectangle around the detected QR code
          //drawRect(ctx, code.location);
          setScanResult(code.data);
          setScanning(false);          
          router.push(`/product/` + code.data);
          cancelAnimationFrame(animationFrame);
          if (stream) {
               stream.getTracks().forEach(track => track.stop());
          }
          
          
         // if (stream) {
         //   stream.getTracks().forEach(track => track.stop());
         // }

            
        } else {
          // Draw scanning frame when no QR code is detected
          drawScanningFrame(ctx, canvas.width, canvas.height);  
          if (scanning) {
            animationFrame = requestAnimationFrame(tick);
          }
        }
      } else if (scanning) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    // Draw rectangle around detected QR code
    const drawRect = (ctx, location) => {
      ctx.beginPath();
      ctx.moveTo(location.topLeftCorner.x, location.topLeftCorner.y);
      ctx.lineTo(location.topRightCorner.x, location.topRightCorner.y);
      ctx.lineTo(location.bottomRightCorner.x, location.bottomRightCorner.y);
      ctx.lineTo(location.bottomLeftCorner.x, location.bottomLeftCorner.y);
      ctx.lineTo(location.topLeftCorner.x, location.topLeftCorner.y);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#FF3B58";
      ctx.stroke();
      
      // Draw corner markers
      drawCorner(ctx, location.topLeftCorner, "#FF3B58");
      drawCorner(ctx, location.topRightCorner, "#FF3B58");
      drawCorner(ctx, location.bottomRightCorner, "#FF3B58");
      drawCorner(ctx, location.bottomLeftCorner, "#FF3B58");
    };
    
    // Draw corner markers
    const drawCorner = (ctx, position, color) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(position.x, position.y, 8, 0, 2 * Math.PI);
      ctx.fill();
    };
    
    // Draw scanning frame when no QR code is detected
    const drawScanningFrame = (ctx, width, height) => {
      // Calculate frame size (70% of the smaller dimension)
      const frameSize = Math.min(width, height) * 0.7;
      const frameX = (width - frameSize) / 2;
      const frameY = (height - frameSize) / 2;
      
      // Semi-transparent overlay
      //ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
      //ctx.fillStyle = "rgba(233, 196, 62, 0.98)";
      //ctx.fillRect(0, 0, width, height);
      
     // ctx.fillStyle = "rgba(255, 120, 120, 0.8)";
     // ctx.fillRect(frameX, frameY, frameSize, frameSize);

      // Clear the scanning area
      //ctx.clearRect(frameX, frameY, frameSize, frameSize);
      
      // Draw scanning frame
      //ctx.strokeStyle = "#2196F3";
      ctx.strokeStyle = "rgba(255, 255,255, 1.0)";
      ctx.lineWidth = 1;
      ctx.strokeRect(frameX, frameY, frameSize, frameSize);
      
      // Draw corner markers
      const cornerSize = 20;
      ctx.lineWidth = 8;
      
      ctx.strokeStyle = "rgba(255, 255, 255, 1.0)";

      // Top-left corner
      ctx.beginPath();
      ctx.moveTo(frameX, frameY + cornerSize);
      ctx.lineTo(frameX, frameY);
      ctx.lineTo(frameX + cornerSize, frameY);
      ctx.stroke();
      


      // Top-right corner
      ctx.beginPath();
      ctx.moveTo(frameX + frameSize - cornerSize, frameY);
      ctx.lineTo(frameX + frameSize, frameY);
      ctx.lineTo(frameX + frameSize, frameY + cornerSize);
      ctx.stroke();
      
      // Bottom-right corner
      ctx.beginPath();
      ctx.moveTo(frameX + frameSize, frameY + frameSize - cornerSize);
      ctx.lineTo(frameX + frameSize, frameY + frameSize);
      ctx.lineTo(frameX + frameSize - cornerSize, frameY + frameSize);
      ctx.stroke();
      
      // Bottom-left corner
      ctx.beginPath();
      ctx.moveTo(frameX + cornerSize, frameY + frameSize);
      ctx.lineTo(frameX, frameY + frameSize);
      ctx.lineTo(frameX, frameY + frameSize - cornerSize);
      ctx.stroke();
      
      

      // Add scanning line animation
      const currentTime = new Date().getTime();
      const scanLineY = frameY + (frameSize * (Math.sin(currentTime / 500) + 1) / 2);
      
      ctx.strokeStyle = "rgba(255, 255,255, 1.0)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(frameX, scanLineY);
      ctx.lineTo(frameX + frameSize, scanLineY);
      ctx.stroke();


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
        <canvas ref={canvasRef} style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}></canvas>
    </div>
  );
}