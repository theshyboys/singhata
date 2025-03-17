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
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">QR Code Shopping</h1>
        <p className="mb-8 text-center text-gray-600">Scan a product QR code to start shopping</p>
      
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