import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, ArrowLeft, Info, Loader2 } from 'lucide-react';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { toast } from 'sonner';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const data = await fetchProductById(parseInt(id));
            setProduct(data || null);
        } catch (error) {
            console.error("Error loading product");
        } finally {
            setLoading(false);
        }
    }
    loadProduct();
  }, [id]);

  if (loading) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-green-600 mb-4" />
            <p className="text-gray-500">Loading details...</p>
        </div>
      );
  }

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 text-green-600 hover:underline"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.unit} of ${product.name} to cart`);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-green-600 mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to shopping
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-auto bg-white p-8 h-full max-h-[600px] flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain max-h-[400px]"
            />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide text-green-700 uppercase bg-green-100 rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
               <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0"/>
               <div>
                 <span className="text-sm font-semibold text-gray-900 block">Nutrition Facts</span>
                 <span className="text-sm text-gray-500">{product.nutrition}</span>
               </div>
            </div>

            <div className="border-t border-gray-100 pt-8 mt-auto">
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <span className="text-xl text-gray-500 mb-1">/ {product.unit}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrement}
                    className="p-3 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-l-lg transition-colors"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-12 text-center text-lg font-medium text-gray-900">{quantity}</span>
                  <button
                    onClick={increment}
                    className="p-3 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-r-lg transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg text-lg font-medium"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
