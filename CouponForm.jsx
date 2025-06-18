import { useState } from 'react';
import axios from 'axios';

export default function CouponForm({ onSuccess }) {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/coupons/create', { code, discount }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCode('');
      setDiscount('');
      onSuccess();
      alert('✅ কুপন পাঠানো হয়েছে অ্যাডমিনের কাছে।');
    } catch (err) {
      alert('❌ সাবমিশন ব্যর্থ হয়েছে!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">নতুন কুপন তৈরি করুন</h2>
      <input
        className="border w-full p-2 mb-2"
        type="text"
        placeholder="Coupon Code"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-2"
        type="number"
        placeholder="Discount %"
        value={discount}
        onChange={e => setDiscount(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}