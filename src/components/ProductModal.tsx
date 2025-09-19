'use client';

import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  image: File | null;
  isRepresentative: boolean;
  isSeasonal: boolean;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (products: Product[]) => void;
}

export default function ProductModal({ isOpen, onClose, onSave }: ProductModalProps) {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: '', image: null, isRepresentative: false, isSeasonal: false },
  ]);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { id: Date.now(), name: '', image: null, isRepresentative: false, isSeasonal: false },
    ]);
  };

  const handleProductChange = (id: number, field: keyof Product, value: any) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleImageChange = (id: number, file: File | null) => {
    setProducts(
        products.map((p) => (p.id === id ? { ...p, image: file } : p))
    );
  };

  const handleSave = () => {
    // Add validation logic here if needed
    onSave(products);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">판매 상품 등록</h2>
        
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {products.map((product, index) => (
            <div key={product.id} className="border p-4 rounded-md">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 border-2 border-dashed rounded-md flex items-center justify-center">
                  <label className="cursor-pointer text-sm text-gray-500">
                    이미지 첨부
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleImageChange(product.id, e.target.files ? e.target.files[0] : null)}
                    />
                  </label>
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="제품명 입력"
                    className="w-full p-2 border rounded-md"
                    value={product.name}
                    onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={product.isRepresentative}
                      onChange={(e) => handleProductChange(product.id, 'isRepresentative', e.target.checked)}
                    />
                    대표상품
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={product.isSeasonal}
                      onChange={(e) => handleProductChange(product.id, 'isSeasonal', e.target.checked)}
                    />
                    계절상품
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddProduct}
          className="w-full mt-4 py-2 border-2 border-dashed rounded-md text-orange-500 hover:bg-orange-50"
        >
          + 제품 추가하기
        </button>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 border rounded-md text-white bg-orange-500 hover:bg-orange-600"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}