import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/10 py-16 px-8 mt-auto">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <span className="text-2xl font-extrabold text-[#0052CC] tracking-tighter font-headline mb-6 block">EventHub</span>
          <p className="text-on-surface-variant text-sm font-body leading-relaxed">
            The premier destination for discovering, managing, and attending world-class technology events.
          </p>
        </div>
        <div>
          <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface mb-6">Platform</h4>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><Link to="/" className="hover:text-primary transition-colors">Find Events</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Enterprise</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><Link to="/" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface mb-6">Newsletter</h4>
          <p className="text-xs text-on-surface-variant mb-4 font-body">Get weekly tech event updates delivered to your inbox.</p>
          <div className="flex gap-2">
            <input className="flex-1 bg-surface-container-lowest border-none rounded-lg text-sm px-4 focus:ring-2 focus:ring-primary/40" placeholder="Email address" type="email" />
            <button className="signature-gradient text-white px-4 py-2 rounded-lg text-xs font-bold font-headline">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-outline font-body">© 2024 EventHub. All rights reserved.</span>
        <div className="flex gap-6">
          <button className="text-outline hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">language</span></button>
          <button className="text-outline hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">share</span></button>
        </div>
      </div>
    </footer>
  );
}
