'use client'
import { useState } from 'react'
import { Truck, ShieldCheck, MapPin, MessageSquare, X, ShoppingCart, Home, Grid, User, ShoppingBag } from 'lucide-react'

const products = [
  { model: "iPhone 15 Pro Max", price: "72,200", original: "144,400" },
  { model: "iPhone 14 Pro Max", price: "61,200", original: "122,400" },
  { model: "iPhone 13 Pro Max", price: "51,200", original: "102,400" },
  { model: "iPhone 15", price: "52,000", original: "104,000" },
  { model: "iPhone 14", price: "41,000", original: "82,000" },
  { model: "iPhone 13", price: "36,000", original: "72,000" }
]

export default function App() {
  const [cartCount, setCartCount] = useState(0)
  const [selectedPhone, setSelectedPhone] = useState(null)
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' })

  const handleWhatsApp = () => {
    const msg = `🚨 *CARREFOUR ORDER* 🚨%0A%0A*Model:* ${selectedPhone.model}%0A*Price:* KES. ${selectedPhone.price}%0A---%0A*Name:* ${formData.name}%0A*Address:* ${formData.address}%0A*Phone:* ${formData.phone}`
    window.open(`https://wa.me/14033884121?text=${msg}`)
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-24">
      {/* HEADER */}
      <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-40">
        <h1 className="font-black italic text-xl text-blue-800">iPhone Centre</h1>
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">{cartCount}</span>
        </div>
      </div>

      {/* DELIVERY ESTIMATE (Carrefour Style) */}
      <div className="p-4 bg-slate-50 m-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-slate-600" />
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Get It Delivered By</p>
            <p className="text-sm font-black">Scheduled: Thu, Apr 9th - Sun, Apr 12th</p>
          </div>
          <span className="ml-auto bg-green-700 text-white text-[10px] px-2 py-1 rounded-md font-bold uppercase">Free delivery</span>
        </div>
      </div>

      {/* PRODUCTS LIST */}
      <div className="p-4 space-y-6">
        {products.map((p, i) => (
          <div key={i} className="border-b pb-6 last:border-0">
             <div className="bg-slate-100 h-64 rounded-2xl mb-4" /> {/* Placeholder for Photo */}
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-2xl font-black italic">{p.model}</p>
                 <p className="text-xs text-slate-500 font-bold uppercase mt-1 italic">Including VAT</p>
               </div>
               <div className="text-right">
                 <p className="text-2xl font-black">KES <span className="text-3xl">{p.price}</span></p>
                 <p className="text-sm text-slate-400 line-through">KES {p.original}</p>
               </div>
             </div>
             
             {/* ADD TO CART BUTTON (Bottom of product) */}
             <button 
               onClick={() => { setSelectedPhone(p); setCartCount(prev => prev + 1); }}
               className="w-full bg-blue-700 text-white font-black py-4 rounded-xl mt-4 active:scale-95 transition-all uppercase italic tracking-wider"
             >
               Add to cart
             </button>
          </div>
        ))}
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 px-2 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center text-blue-700 font-bold"><Home className="w-6 h-6" /><span className="text-[10px] mt-1">Home</span></div>
        <div className="flex flex-col items-center text-slate-400 font-bold"><Grid className="w-6 h-6" /><span className="text-[10px] mt-1">Categories</span></div>
        <div className="flex flex-col items-center text-slate-400 font-bold"><User className="w-6 h-6" /><span className="text-[10px] mt-1">Profile</span></div>
        <div className="flex flex-col items-center text-slate-400 font-bold">
           <div className="relative">
             <ShoppingCart className="w-6 h-6" />
             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
           </div>
           <span className="text-[10px] mt-1">Cart</span>
        </div>
      </div>

      {/* CHECKOUT MODAL (Triggered when clicking Add to Cart) */}
      {selectedPhone && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-black italic">DELIVERY DETAILS</h3>
              <button onClick={() => setSelectedPhone(null)} className="p-2 bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <input onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full bg-slate-50 border p-4 rounded-xl font-bold" />
              <input onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Delivery Address" className="w-full bg-slate-50 border p-4 rounded-xl font-bold" />
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 border-r pr-2">+254</span>
                <input onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="7XX XXX XXX" className="w-full bg-slate-50 border py-4 pl-16 pr-4 rounded-xl font-bold" />
              </div>
              <button 
                onClick={handleWhatsApp}
                className="w-full bg-blue-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-6 h-6" /> ORDER ON WHATSAPP
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
