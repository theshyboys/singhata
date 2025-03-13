'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        // In a real app, you'd fetch from an API using the ID from the QR code
        // For this example, we'll simulate an API call
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
      });
      router.push('/cart');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4">Loading product information...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The scanned QR code did not match any product in our database.</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Scan Another QR Code
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 relative h-64 md:h-auto md:w-1/2">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
              {product.category}
            </div>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-xl text-blue-600">${product.price.toFixed(2)}</p>
            
            <div className="mt-4">
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="text-gray-700 mr-2">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border-r"
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border-l"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
              >
                Add to Cart
              </button>
              
              <div className="mt-4 text-center">
                <Link href="/" className="text-blue-600 hover:underline">
                  Scan Another QR Code
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// Mock API function - in a real app, this would fetch from your backend
async function fetchProductById(id) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock product database based on QR code values
    const products = {
      'product-123': {
        id: 'product-123',
        name: 'ปลาส้มต้นตำรับ',
        price: 129.99,
        description: '“ปลาส้ม” ถือเป็นสินค้าของฝากที่ขึ้นชื่ออีกอย่างหนึ่งของ จ.ยโสธร ปลาส้มที่วางขายมีอยู่หลายเจ้าหลายยี่ห้อให้ผู้บริโภคได้เลือกซื้อ “แม่ยมปลาส้ม” ก็เป็นอีกเจ้าหนึ่งที่ได้รับความนิยมเพราะเป็นปลาส้มสูตรโบราณที่ทำขายมานานกว่า 30 ปี \
สำหรับวัตถุดิบที่นำมาทำเป็นปลาส้มนั้น ส่วนใหญ่เป็นปลาตะเพียนที่มีขนาดตัวโตพอเหมาะ โดยเลือกซื้อจากเกษตรกรที่เลี้ยงปลาตะเพียนในแถบภาคกลางในราคากิโลกรัมละ 50-60 บาท ปลาตะเพียนที่นำมาทำปลาส้มต้องเป็นปลาที่สดใหม่เท่านั้น เริ่มต้นด้วยการขอดเกล็ดออกและชำแหละแยกเอาไข่ปลาและขี้ปลาออก \
จากนั้นนำไปล้างด้วยน้ำสะอาด จำนวน 3 น้ำ แล้วนำตัวปลาไปทาด้วยเกลือทะเลให้ทั่วทิ้งไว้ประมาณ 10 นาที ก่อนที่จะนำไปคลุกเคล้ากับเครื่องปรุงการทำปลาส้มสูตรโบราณ ประกอบด้วย เกลือ, ข้าวเหนียวนึ่ง และกระเทียมที่โขลกละเอียด อัตราส่วนตามสูตรผสมน้ำเล็กน้อยคลุกเคล้าให้เข้ากันกับปลาที่ชำแหละเสร็จ \
หลังจากนั้นหมักทิ้งไว้ประมาณ 2 วัน ก็จะได้ปลาส้มสูตรโบราณที่มีรสชาติอร่อย กลิ่นหอมชวนรับประทาน',
        category: 'Electronics',
        image: '/assest/plasom.png',
         sku: 'WH-NC-2000',
      },'product-': {
        id: 'product-789',
        name: 'Wireless Headphones',
        price: 129.99,
        description: 'Premium wireless headphones with noise cancellation technology and 20 hour battery life.',
        category: 'Electronics',
        image: '/assest/WirelessHeadphones.jpg',
         sku: 'WH-NC-2000',
      },
      'product-456': {
        id: 'product-456',
        name: 'Smart Watch',
        price: 199.99,
        description: 'Track fitness, receive notifications, and more with this waterproof smartwatch.',
        category: 'Wearables',
        image: '/assest/SmartWatch.jpg',
        sku: 'SW-FIT-101',
      },
      // Add more mock products as needed
    };
    
    return products[id] || null;
  }