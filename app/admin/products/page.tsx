'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function AddProduct() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', category: 'Electronics', stock: '10' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert('Product saved directly into your database pipeline!');
      router.push('/admin');
    } else {
      alert('Error updating database catalog');
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-12 bg-white border p-8 rounded-xl shadow-sm">
      <Link href="/admin" className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:underline mb-4 uppercase tracking-wider">
        <ArrowLeft className="w-3 h-3" /> <span>Back to Admin Panel</span>
      </Link>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product to Store Catalog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Product Title</label>
          <input
            type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none" placeholder="Wireless Mechanical Keyboard"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Price ($ USD)</label>
            <input
              type="number" step="0.01" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none" placeholder="89.99"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Inventory Stock Count</label>
            <input
              type="number" required value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none" placeholder="15"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Category Classification</label>
          <select
            value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none"
          >
            <option value="Electronics">Electronics</option>
            <option value="Peripherals">Peripherals</option>
            <option value="Office">Office</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Image URL Link</label>
          <input
            type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none" placeholder="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Description Summary</label>
          <textarea
            rows={3} required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none" placeholder="Describe key dimensions, hardware, or specifications..."
          />
        </div>

        <button
          type="submit" disabled={saving}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-sm shadow hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving Platform Entities...' : 'Commit Product Entry'}</span>
        </button>
      </form>
    </div>
  );
}