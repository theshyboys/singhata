'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import PDFGenerator from '../components/PDFGenerator';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const subtotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax;
  
  const handleCheckout = () => {
    setIsGeneratingPDF(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="mb-4">Your cart is empty</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Scan a Product to Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cart.map((item) => (
                <div key={item.id} className="flex border-b p-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    {item.sku && <p className="mt-1 text-sm text-gray-500">SKU: {item.sku}</p>}
                    <div className="flex mt-2 items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1"
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Tax (8%)</p>
                <p>${tax.toFixed(2)}</p>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-4">
                  <p className="text-lg font-medium">Total</p>
                  <p className="text-lg font-medium">${total.toFixed(2)}</p>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 mb-3"
                >
                  Checkout & Save as PDF
                </button>
                <Link 
                  href="/" 
                  className="block text-center w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {isGeneratingPDF && (
        <PDFGenerator 
          cart={cart} 
          subtotal={subtotal} 
          tax={tax} 
          total={total} 
          onComplete={() => {
            setIsGeneratingPDF(false);
            clearCart();
          }}
        />
      )}
    </div>
  );
}