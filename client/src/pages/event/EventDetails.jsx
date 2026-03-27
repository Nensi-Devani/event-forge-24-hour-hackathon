import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function EventDetails() {
  return (
    <div className="font-body bg-surface text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-8 py-12 w-full flex-1">
        {/* Hero Section */}
        <section className="relative mb-20 rounded-xl overflow-hidden shadow-2xl">
          <div className="h-[400px] w-full">
            <img 
              alt="Hackathon Banner" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf1SQfCtSmr9g4b8jNFvZeA-OUtWDF0SPPK4OvVfj6ewb9sClLZd2scyLbt4bKGOJW92ayD3RKc7KkOmo98ilmSSrmceWxokUdJJtdggPTHThipX2DDh9e7j4U7LmwPrOWIyRME6wU73XvMsO-e7iIqABHtuy8GCS8ylFfU0R5X55gnhNzz7SO16r-cUZDYjtWsNMqmvqolZ5b4mjTZycZG3O8m44lgJbPrXON7ulSMv3JBJJcGKazHjFVpNgDlyCIyxMJ1vqtIgZA" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container text-white rounded-full text-xs font-bold tracking-widest uppercase mb-4 w-fit">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              Live Registration
            </div>
            <h1 className="text-6xl font-extrabold text-white tracking-tighter mb-4 font-headline">Nexus Hack 2024</h1>
            <p className="text-xl text-white/80 max-w-2xl font-body leading-relaxed">
              The premier global hackathon for decentralized infrastructure and AI integration. Join 5,000+ developers to build the next generation of the web.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Content Area */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Overview & Problem Statements */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-8 bg-primary-container rounded-full"></div>
                <h2 className="text-3xl font-extrabold tracking-tight font-headline">Challenge Tracks</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TrackCard 
                  icon="smart_toy" 
                  title="AI & Autonomy" 
                  description="Build autonomous agents that can manage decentralized resources without human intervention." 
                />
                <TrackCard 
                  icon="account_balance_wallet" 
                  title="DeFi 2.0" 
                  description="Redefining liquidity through innovative lending protocols and cross-chain asset bridges." 
                />
                <TrackCard 
                  icon="security" 
                  title="Privacy First" 
                  description="Implementing zero-knowledge proofs for secure data exchange in healthcare and fintech." 
                />
                <div className="p-8 rounded-xl bg-surface-container-lowest transition-all hover:translate-x-1 border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-outline mb-2">add_circle</span>
                  <p className="text-sm font-medium text-outline pt-2">More tracks being announced...</p>
                </div>
              </div>
            </section>

            {/* Timeline / Schedule */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-8 bg-primary-container rounded-full"></div>
                <h2 className="text-3xl font-extrabold tracking-tight font-headline">Event Roadmap</h2>
              </div>
              <div className="space-y-6">
                <TimelineStep 
                  num="01" 
                  title="Ideation & Selection" 
                  date="Nov 15 - Nov 20" 
                  description="Teams submit initial project proposals and undergo basic technical feasibility screening."
                  active 
                />
                <TimelineStep 
                  num="02" 
                  title="The 48h Sprint" 
                  date="Dec 01 - Dec 03" 
                  description="The core building phase. 48 hours of uninterrupted development with mentor support." 
                />
                <TimelineStep 
                  num="03" 
                  title="Grand Finale & Demos" 
                  date="Dec 10, 2024" 
                  description="Top 10 teams pitch to a panel of VC judges and industry experts at the main stage." 
                  isLast 
                />
              </div>
            </section>

            {/* Rules & Guidelines */}
            <section className="bg-surface-container-high/30 p-10 rounded-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-8 bg-primary-container rounded-full"></div>
                <h2 className="text-3xl font-extrabold tracking-tight font-headline">Code of Conduct</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <RuleItem title="Originality First" desc="No pre-built projects. All code must be written during the event." />
                <RuleItem title="Team Limits" desc="Minimum 2, Maximum 5 members per team. Solo is permitted but discouraged." />
                <RuleItem title="Open Source" desc="Final submissions must be open-sourced under MIT or Apache 2.0 license." />
                <RuleItem title="Inclusivity" desc="Zero tolerance for harassment or discriminatory behavior." />
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 space-y-8">
            {/* Registration Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-8 border border-outline-variant/10">
              <div className="mb-8">
                <div className="text-3xl font-extrabold text-primary mb-1 font-headline">Free Admission</div>
                <p className="text-sm text-on-surface-variant font-medium">Application closes in 14 days</p>
              </div>
              <div className="space-y-6 mb-8">
                <SummaryRow icon="event" label="Registration Ends" value="Oct 31, 2024" />
                <SummaryRow icon="location_on" label="Venue" value="San Francisco, CA" />
                <SummaryRow icon="group" label="Registered" value="1,248 / 5,000" />
              </div>
              <button className="w-full bg-gradient-primary text-white py-4 rounded-xl font-headline font-extrabold text-lg shadow-lg active:scale-95 transition-all">
                Register Team
              </button>
              <p className="text-center text-[10px] text-outline mt-4 uppercase tracking-widest font-bold font-label">
                By registering you agree to our Terms
              </p>
            </div>

            {/* Quick Facts / Prizes Bento */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-tertiary-fixed p-6 rounded-2xl col-span-2 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-tertiary-fixed-variant tracking-widest mb-1 font-label">Total Prize Pool</p>
                  <h3 className="text-3xl font-extrabold text-on-tertiary-fixed font-headline">$150,000</h3>
                </div>
                <span className="material-symbols-outlined text-4xl text-on-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
              <div className="bg-secondary-fixed p-6 rounded-2xl">
                <p className="text-[10px] uppercase font-bold text-on-secondary-fixed-variant tracking-widest mb-1 font-label">Global Rank</p>
                <h3 className="text-xl font-extrabold text-on-secondary-fixed font-headline">Tier 1</h3>
              </div>
              <div className="bg-surface-container-high p-6 rounded-2xl">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-1 font-label">Mentors</p>
                <h3 className="text-xl font-extrabold text-on-surface font-headline">120+</h3>
              </div>
            </div>

            {/* Location Map Preview */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden h-48 relative group shadow-sm border border-slate-100 dark:border-slate-800">
              <img 
                alt="Map" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC61sO2ObXaXZFdmUZKk4g_hSPBr4Xy5LEICHkbfpZPhmU_6s03gjwBzY5qqH1Kve0hWF18CGsStDOtubHRI8pCirp0NF3W2RlEZ13Of_dTxBja-DNn5vac0mt6OYYI6dU1p0RV9UnyKROoW_fqpxTOSKheHhQA9zaAhivHVL7L12_HO2crjNtDT5mg-BntSlO-moBG6VYYX2M05x94oBmVJm-rS8qGJ1JdnJMmS5BtJT3cQiJ5akaX7VwDrzxO3a9SYPMoVNGggAfq" 
              />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-white transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-primary text-sm">explore</span>
                  <span className="text-xs font-bold uppercase tracking-tight text-primary">Open in Maps</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function TrackCard({ icon, title, description }) {
  return (
    <div className="p-8 rounded-xl bg-surface-container-lowest transition-all hover:translate-x-1 shadow-sm border border-slate-100 dark:border-slate-800">
      <span className="material-symbols-outlined text-primary mb-4 text-3xl">{icon}</span>
      <h3 className="text-xl font-bold mb-3 font-headline">{title}</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function TimelineStep({ num, title, date, description, active, isLast }) {
  return (
    <div className="relative flex gap-8 items-start">
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 ${
          active ? 'bg-primary-container text-white' : 'bg-surface-container-highest text-primary'
        }`}>
          {num}
        </div>
        {!isLast && <div className="w-0.5 h-full bg-surface-container-highest absolute top-12 left-6 -z-0"></div>}
      </div>
      <div className={`flex-1 p-6 rounded-xl ${active ? 'bg-surface-container-low' : 'bg-surface-container-lowest shadow-sm border border-slate-100 dark:border-slate-800'}`}>
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-lg font-headline">{title}</h4>
          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase font-label ${
            active ? 'text-primary-container bg-primary-fixed' : 'text-outline bg-surface-container-high'
          }`}>
            {date}
          </span>
        </div>
        <p className="text-sm text-on-surface-variant pt-1">{description}</p>
      </div>
    </div>
  );
}

function RuleItem({ title, desc }) {
  return (
    <li className="flex gap-4">
      <span className="material-symbols-outlined text-primary-container">check_circle</span>
      <div>
        <span className="block font-bold pb-1 font-headline">{title}</span>
        <span className="text-sm text-on-surface-variant leading-tight">{desc}</span>
      </div>
    </li>
  );
}

function SummaryRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20 last:border-0 last:pb-0">
      <span className="text-on-surface-variant text-sm flex items-center gap-2 font-medium">
        <span className="material-symbols-outlined text-lg">{icon}</span> {label}
      </span>
      <span className="font-bold text-sm">{value}</span>
    </div>
  );
}
