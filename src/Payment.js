import React from 'react';

const Payment = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200 max-w-xl w-full text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Payment Portal</h2>
        <p className="text-lg text-gray-700 mb-8">This is your secure payment page. Further integration will be implemented here for billing and payment processing.</p>
        <div className="p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-500">
            Payment features coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
