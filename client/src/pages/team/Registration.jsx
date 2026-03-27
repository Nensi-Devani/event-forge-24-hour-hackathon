import React from 'react';
import Header from '../../components/layout/Header';

export default function TeamRegistration() {
  return (
    <div className="font-body text-on-surface antialiased bg-background min-h-screen flex flex-col relative overflow-hidden">
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-8 py-12 w-full flex-1 relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight mb-4">Complete Registration</h1>
          <p className="text-secondary max-w-2xl">Finalize your team details for the Global Hackathon 2024. Your progress is saved automatically.</p>
        </header>

        {/* Progress Stepper */}
        <div className="mb-16">
          <div className="flex items-center justify-between max-w-4xl relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-container-high -translate-y-1/2 -z-10 rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-gradient-to-r from-[#0052cc] to-[#003d9b] -translate-y-1/2 -z-10 rounded-full"></div>
            
            {/* Step 1 Done */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center shadow-lg">
                <span className="font-headline font-extrabold">1</span>
              </div>
              <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary">Team Info</span>
            </div>
            
            {/* Step 2 Active */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center shadow-lg ring-4 ring-primary/10">
                <span className="font-headline font-extrabold">2</span>
              </div>
              <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary">Members</span>
            </div>
            
            {/* Step 3 Inactive */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest text-secondary flex items-center justify-center">
                <span className="font-headline font-extrabold">3</span>
              </div>
              <span className="font-headline font-bold text-xs uppercase tracking-widest text-secondary">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Form Section */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section: Member Details */}
            <section className="space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-headline text-on-surface">Member Details</h2>
                  <p className="text-sm text-secondary mt-1">Teams must have between 2 and 4 participants.</p>
                </div>
                <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold rounded-full uppercase tracking-tighter">
                  Required: 2-4 Members
                </span>
              </div>
              
              <div className="grid gap-6">
                {/* Team Leader Card */}
                <div className="p-8 bg-surface-container-lowest rounded-xl shadow-sm space-y-6 relative overflow-hidden border border-slate-100 dark:border-slate-800">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                  <div className="flex items-center gap-3 relative z-10">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                    <h3 className="font-headline font-extrabold text-lg">Team Leader</h3>
                    <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">check_circle</span> Verified</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-secondary ml-1 font-label">Full Name</label>
                      <input className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all outline-none font-body text-on-surface" readOnly type="text" value="Alex Rivera" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-secondary ml-1 font-label">Email Address</label>
                      <input className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all outline-none font-body text-on-surface" readOnly type="email" value="alex.rivera@design.co" />
                    </div>
                  </div>
                </div>
                
                {/* Member 2 (Validation Highlight) */}
                <div className="p-8 bg-surface-container-lowest rounded-xl shadow-sm space-y-6 border-2 border-error/20 ring-4 ring-error/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">person</span>
                      <h3 className="font-headline font-extrabold text-lg">Member 2</h3>
                      <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-tighter">Pending Verification</span>
                    </div>
                    <button className="text-error text-sm font-bold flex items-center gap-1 hover:text-error/80 transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span> Remove
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-secondary ml-1 font-label">Full Name</label>
                      <input className="w-full bg-surface-container-low border-transparent rounded-lg p-4 focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all outline-none font-body" placeholder="Enter name" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-secondary ml-1 font-label">Email Address</label>
                      <input className="w-full bg-surface-container-low border-transparent rounded-lg p-4 focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all outline-none font-body" placeholder="email@example.com" type="email" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-error text-xs font-semibold bg-error-container/30 p-3 rounded-lg">
                    <span className="material-symbols-outlined text-sm">info</span>
                    Minimum 2 members required to proceed.
                  </div>
                </div>

                {/* Add Member Button */}
                <button className="w-full py-6 border-2 border-dashed border-outline-variant rounded-xl text-secondary font-headline font-bold hover:bg-surface-container transition-colors flex items-center justify-center gap-2 group">
                  <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add_circle</span>
                  Add Member (Max 4)
                </button>
              </div>
            </section>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8">
              <button className="px-8 py-4 text-primary font-headline font-extrabold flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
                <span className="material-symbols-outlined">arrow_back</span>
                Back: Team Info
              </button>
              <button className="px-10 py-4 bg-gradient-to-br from-primary-container to-primary text-white rounded-full font-headline font-extrabold shadow-lg hover:shadow-primary/20 active:scale-95 transition-all">
                Review & Pay
              </button>
            </div>
          </div>

          {/* Sidebar: Order Summary */}
          <aside className="lg:col-span-4 sticky top-28">
            <div className="bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
              <div className="bg-primary-container p-8 text-white relative">
                <div className="relative z-10">
                  <h3 className="font-headline font-extrabold text-xl">Order Summary</h3>
                  <p className="text-white/70 text-sm">Global Hackathon 2024</p>
                </div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mb-8"></div>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-secondary font-medium">Base Registration</span>
                    <span className="font-headline font-bold">₹150.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-secondary font-medium">Members (2nd-4th)</span>
                    <span className="font-headline font-bold text-tertiary">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-secondary font-medium">Workshop Bundle</span>
                    <span className="font-headline font-bold">₹25.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-secondary font-medium">Processing Fee</span>
                    <span className="font-headline font-bold">₹4.50</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-outline-variant/30">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-on-surface font-extrabold font-headline">Total Amount</span>
                    <span className="text-3xl font-extrabold font-headline text-primary">₹179.50</span>
                  </div>
                  
                  <div className="bg-surface-container-low p-4 rounded-lg space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-secondary font-label">Promotional Code</p>
                    <div className="flex gap-2">
                      <input className="flex-1 bg-white border-transparent focus:ring-2 focus:ring-primary/40 rounded text-sm px-3 py-2 outline-none font-medium" placeholder="SAVE20" type="text" />
                      <button className="bg-secondary text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-tight hover:bg-on-secondary-container transition-colors">Apply</button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-tertiary-fixed/20 rounded-lg">
                  <span className="material-symbols-outlined text-tertiary text-lg">verified_user</span>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-on-tertiary-fixed-variant">Secure Checkout</p>
                    <p className="text-[10px] text-on-tertiary-fixed-variant leading-relaxed opacity-80">Encryption ensures your payment data is protected. SSL certified 256-bit.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Card Asymmetry */}
            <div className="mt-8 relative h-48 rounded-xl overflow-hidden shadow-lg group border border-slate-100 dark:border-slate-800">
              <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmR_0hbmYOHgOm46sasXYP5c2PD8El33aSs9IxLGAe9tWSXFhd99VNm3r4afJPM2iaxe-gLLJYc8iZAOr9IQ8u0UwrAYDkNUuKT9pYdN4K2hDV_COvdddB8ix7ErXbVBvuv1pfpcV_Qf5PiT8Di0VPi6URpeIpLVNxGBlc7u_CStsU6MxWazP387qd6xDymxcrEOrL0ihwz9en6dp1auc7jaursh27MeQ_7p8iVmYwJXBxi8ovPk10aPeJfHKKXL0Af1ZvlVgAGK-9" alt="Tech event stage" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-6">
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest font-label">Bonus Content</p>
                <h4 className="text-white font-headline font-extrabold text-lg">Win a trip to Silicon Valley</h4>
                <p className="text-white/70 text-xs mt-1 font-body">Top teams qualify for the Global Finals.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Visual Texture Element (Bottom right) */}
      <div className="fixed bottom-0 right-0 -z-10 opacity-10 pointer-events-none">
        <svg fill="none" height="400" viewBox="0 0 400 400" width="400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" fill="url(#paint0_linear)" r="400"></circle>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="0" x2="400" y1="0" y2="400">
              <stop stopColor="#0052CC"></stop>
              <stop offset="1" stopColor="#003D9B"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
