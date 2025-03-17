'use client';

import { useState } from 'react';
import Link from 'next/link';
import QRScanner from './components/QRScanner3';
//import QRScan from './components/QRScan';

/*
git init 
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/theshyboys/singhata/tree/main.git
git push -u origin main


git init 
git add .
git commit -m "first commit"
git branch -M main
git push -u origin main

https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme

*/
export default function Home() {


  function  CheckLine  () {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('line') > -1) {
      // แนะนำผู้ใช้ให้เปิดลิงก์ผ่าน browser ภายนอก
      const confirmOpen = confirm("เว็บนี้ต้องใช้กล้อง กรุณาเปิดผ่านเบราว์เซอร์ภายนอก เช่น Chrome หรือ Safari");
      if (confirmOpen) {
        const url = encodeURIComponent(window.location.href);
        // สำหรับ Android: เปิด Chrome
        if (ua.indexOf('android') > -1) {
          window.location = `intent://singhata-aq19.vercel.app//#Intent;scheme=https;package=com.android.chrome;end`;
        }
        // สำหรับ iOS: เปิด Safari
        else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) {
          window.location = window.location.href; // Safari จะเปิดอยู่แล้ว
        }
      }
    }
  }

  return (
   

    <main className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">QR Code Shopping</h1>
        <p className="mb-8 text-center text-gray-600">Scan a product QR code to start shopping</p>
       
        <CheckLine/>
       <div className="bg-white p-1 rounded-lg shadow-md"> 
           <QRScanner/>
           {/* <QRScan/> */}
        </div>
        {/* 
        <div className="mt-8 text-center">
          <Link href="/cart" className="text-blue-600 hover:underline">
            View Cart
          </Link>
        </div>
        */}
      </div>
    </main>
  );
}