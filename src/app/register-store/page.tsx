'use client';

import React from 'react';

export default function RegisterStorePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">점포 등록</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">점포 정보</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">점포 명</label>
                <input type="text" id="storeName" name="storeName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700">사업자등록번호</label>
                <input type="text" id="businessNumber" name="businessNumber" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">전화번호</label>
                <input type="text" id="phoneNumber" name="phoneNumber" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="storeAddress" className="block text-sm font-medium text-gray-700">점포 주소</label>
                <input type="text" id="storeAddress" name="storeAddress" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">추가 정보</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">판매 상품</label>
                <button className="mt-1 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">판매 상품 등록</button>
              </div>
              <div>
                <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700">점포 소개</label>
                <textarea id="storeDescription" name="storeDescription" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
              <button className="mt-4 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">AI 자동완성</button>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600">등록 완료</button>
        </div>
      </div>
    </div>
  );
}