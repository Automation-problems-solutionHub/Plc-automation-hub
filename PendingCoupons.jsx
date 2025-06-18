import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PendingCoupons() {
  const [coupons, setCoupons] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await axios.get('/api/coupons/pending', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCoupons(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await axios.put(`/api/coupons/${action}/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchPending();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Pending Coupons</h2>
      {coupons.length === 0 ? (
        <p>🎉 কোনো Pending কুপন নেই!</p>
      ) : (
        coupons.map(coupon => (
          <div key={coupon._id} className="border-b py-2 flex justify-between items-center">
            <div>
              <strong>{coupon.code}</strong> - {coupon.discount}% <br />
              <span className="text-sm text-gray-500">By: {coupon.createdBy?.email || 'N/A'}</span>
            </div>
            <div className="space-x-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => handleAction(coupon._id, 'approve')}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleAction(coupon._id, 'reject')}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}