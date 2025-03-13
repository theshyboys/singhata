'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // You could implement analytics tracking here
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-green-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Order Complete!</h1>
        <p className="mb-6 text-gray-600">
          Your order has been successfully processed and saved as a PDF file.
          Thank you for shopping with QR Shop!
        </p>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
