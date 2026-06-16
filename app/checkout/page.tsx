'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { ShieldCheck } from 'lucide-react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const total = searchParams.get('total') || '0.00';
  const items = searchParams.get('items') || '[]';

  const [form, setForm] = useState({ name: '', address: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.address) return alert('Please enter your details');
    setSubmitting(true);

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName: form.name, address: form.address, total: parseFloat(total), items })
    });

    if (res.ok) {
      alert('Order securely processed via Sandbox Gateway!');
      router.push('/');
    } else {
      alert('Checkout error processing order context');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white border p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Checkout</h2>
      <p className="text-xs text-gray-500 mb-6">Complete your delivery information below.</p>

      <div className="bg-gray-50 p-4 rounded-xl border mb-6 text-sm">
        <div className="flex justify-between font-bold text-gray-900 text-base">
          <span>Order Grand Total:</span>
          <span>${parseFloat(total).toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Full Name</label>
          <input
            type="text" required value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Shipping Address</label>
          <textarea
            required rows={3} value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
            placeholder="123 Tech Street, Campus Town"
          />
        </div>

        <button
          type="submit" disabled={submitting}
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm shadow hover:bg-emerald-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{submitting ? 'Verifying Gateway...' : 'Place Order'}</span>
        </button>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading checkout processing context...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}