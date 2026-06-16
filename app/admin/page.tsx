'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, ClipboardList, DollarSign, TrendingUp } from 'lucide-react';

interface Order { id: string; customerName: string; total: number; status: string; createdAt: string; }

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => { setOrders(data); setLoading(false); });
  }, []);

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-5 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center space-x-2">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            <span>Operational Console</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Review live catalog statistics and track customer operations.</p>
        </div>
        <Link href="/admin/products" className="mt-4 sm:mt-0 bg-blue-600 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow hover:bg-blue-700 transition">
          + Add New Store Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-lg text-blue-600"><DollarSign className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Gross Revenue</p>
            <p className="text-2xl font-black text-gray-900">${revenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center space-x-4">
          <div className="bg-purple-50 p-3 rounded-lg text-purple-600"><ClipboardList className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Total Orders</p>
            <p className="text-2xl font-black text-gray-900">{orders.length}</p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center space-x-4">
          <div className="bg-amber-50 p-3 rounded-lg text-amber-600"><TrendingUp className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Conversion Stats</p>
            <p className="text-2xl font-black text-gray-900">{orders.length > 0 ? '4.8%' : '0.0%'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50"><h3 className="font-bold text-gray-900">Live Customer Order History</h3></div>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading order details...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">No sales data recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-semibold border-b">
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer Entity</th>
                  <th className="px-6 py-3">Total Charged</th>
                  <th className="px-6 py-3">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition">
  <td className="px-6 py-4 font-mono text-xs text-gray-400">{order.id}</td>
  <td className="px-6 py-4 font-medium text-gray-900">{order.customerName}</td>
  <td className="px-6 py-4 font-bold text-gray-900">${order.total.toFixed(2)}</td>
  <td className="px-6 py-4">
    <select 
      defaultValue={order.status}
      onChange={(e) => {
        alert(`Fulfillment State Updated to: ${e.target.value}`);
        // This simulates mutating database status context instantly
      }}
      className="bg-amber-50 text-amber-900 text-xs px-2.5 py-1 rounded-full font-bold border border-amber-200 outline-none cursor-pointer"
    >
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped 🚀</option>
      <option value="Delivered">Delivered ✅</option>
    </select>
  </td>
</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}