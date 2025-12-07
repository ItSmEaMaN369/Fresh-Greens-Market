import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { UserInfo } from '../types';
import { toast } from 'sonner';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  if (cart.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      clearCart();
      toast.success('Order placed successfully!');
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Thank you for shopping with FreshGreens. We'll send a confirmation email to {formData.email} shortly.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center text-gray-500 hover:text-green-600 mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Cart
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea
                name="address"
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                value={formData.address}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
               <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h3>
               <div className="flex items-center gap-2">
                 <input type="radio" id="cod" name="payment" defaultChecked className="text-green-600 focus:ring-green-500" />
                 <label htmlFor="cod" className="text-sm text-gray-700">Cash on Delivery (Standard)</label>
               </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
           <div className="bg-gray-50 rounded-xl p-6 lg:p-8 border border-gray-100 sticky top-24">
             <h2 className="text-xl font-bold text-gray-900 mb-6">Your Order</h2>
             <ul className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
               {cart.map((item) => (
                 <li key={item.id} className="flex gap-4">
                   <div className="h-16 w-16 bg-white rounded-md overflow-hidden border border-gray-200">
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1">
                     <h4 className="font-medium text-gray-900">{item.name}</h4>
                     <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                   </div>
                   <div className="text-right">
                      <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                   </div>
                 </li>
               ))}
             </ul>

             <div className="border-t border-gray-200 pt-4 space-y-2">
               <div className="flex justify-between text-gray-600">
                 <span>Subtotal</span>
                 <span>${cartTotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-gray-600">
                 <span>Delivery Fee</span>
                 <span className="text-green-600">Free</span>
               </div>
               <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                 <span>Total</span>
                 <span>${cartTotal.toFixed(2)}</span>
               </div>
             </div>

             <button
               type="submit"
               form="checkout-form"
               className="w-full mt-6 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
             >
               Place Order
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;