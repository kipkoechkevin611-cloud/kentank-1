'use client';

import React, { useState } from 'react';
import Modal from './ui/Modal';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Phone, MapPin, Package, CheckCircle, AlertCircle } from 'lucide-react';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({ isOpen, onClose, productName = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    product: productName,
    quantity: '1',
    additionalNotes: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+254|0)?[7]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Kenyan phone number';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.product.trim()) {
      newErrors.product = 'Product selection is required';
    }
    
    if (parseInt(formData.quantity) < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const message = `
🌊 *KENTANK WATER TANK ORDER*

👤 *Customer Details:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Location: ${formData.location}

📦 *Order Details:*
• Product: ${formData.product}
• Quantity: ${formData.quantity}
${formData.additionalNotes ? `• Notes: ${formData.additionalNotes}` : ''}

🚚 *Delivery Information:*
• Free countrywide delivery
• 2-3 business days delivery time

✅ *Please confirm my order and provide payment details.*
    `.trim();

    const whatsappUrl = `https://wa.me/254737042076?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Your Water Tank">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Order Benefits:</p>
              <ul className="space-y-1">
                <li>• Free countrywide delivery</li>
                <li>• 15-year manufacturer warranty</li>
                <li>• Genuine Kentank products</li>
                <li>• Professional installation available</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g., 0712 345 678"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Location *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your location (town/county)"
            />
          </div>
          {errors.location && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.location}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product *
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              required
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${errors.product ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Select product"
            />
          </div>
          {errors.product && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.product}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity *
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.quantity}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            rows={3}
            placeholder="Any special requirements or questions..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          Submit Order via WhatsApp
        </motion.button>

        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to be contacted via WhatsApp regarding your order.
        </p>
      </form>
    </Modal>
  );
};

export default WhatsAppOrderModal;
