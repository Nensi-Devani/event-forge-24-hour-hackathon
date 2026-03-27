import React from 'react';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function EventManagement() {
  const eventsList = [
    { id: 1, initial: 'AI', bg: 'bg-primary-container/10', text: 'text-primary', name: 'AI Innovation Lab', type: 'Hackathon Series', venue: 'Virtual (Discord)', date: 'Oct 12 - 14, 2024', status: 'Live', statusBg: 'bg-tertiary-fixed', statusText: 'text-on-tertiary-fixed-variant', teams: '45 / 50', teamsColor: 'text-primary' },
    { id: 2, initial: 'DP', bg: 'bg-surface-container-highest', text: 'text-outline', name: 'Design Sprint Vol. 4', type: 'UI/UX Workshop', venue: 'London, UK', date: 'Nov 02 - 03, 2024', status: 'Draft', statusBg: 'bg-surface-container-high', statusText: 'text-secondary', teams: '0 / 20', teamsColor: 'text-secondary' },
    { id: 3, initial: 'BC', bg: 'bg-secondary-container/20', text: 'text-secondary', name: 'Blockchain Expo', type: 'Annual Conference', venue: 'New York, US', date: 'Sep 20 - 22, 2024', status: 'Completed', statusBg: 'bg-secondary-fixed', statusText: 'text-on-secondary-container', teams: '120 / 120', teamsColor: 'text-secondary' },
  ];

  const judgesList = [
    { id: 1, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyX8cBugzg9xU8iK5oD9r44sDpgetXT2ZJVEns2rphQloIynQ9GuJTRgcdcKgOqOLcJ4jJTwnW5VVK2Rhi5ZjMUvBSdRf-YczYymCkFH-DqjZ9vTe53RpgB_WSefozaqDwaV9DrrqfEHy6hCgn_pNzDCdPoIQte1JZiGVpDdt-BXNhnNcKOleL0f8DWLfDSd0ggCD5IWrCr56pGj4uIsMOsBrHwBWC2-WiF72AW1jidJDIcugYYTDDWqyk7E_Bx8hEe17rPThdY5mX", name: "Dr. Aris Thorne", role: "AI Specialist", assignment: "AI Lab", assignBg: "bg-primary-container/10", assignText: "text-primary", action: "Remove", actionText: "text-error" },
    { id: 2, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi24LI6wU72ybYA7k7KPbvUWEwII81g1y9lmLF13ps0_MeF9-IcG2g85UrBMi2WG4YiFK-SDQaxVGbYyKtc-uQiVMqgoCWwO8iLamaqOtJ4TMS604PMPnEsf7fzAGwyb8Wo_NNhZ2w_atnjVv-EoRo0IFOn9Ac3T_-Prp9a_VKgb8ntGmbEl1reESTpTPefNdC15nqmGQjGfLAjXQ5sifl63GZuwyffCeUB0qaJEhOysJeLKwIPRaW2ddBX_uzlsFRlp4W9Ms5Do3v", name: "Elena Rodriguez", role: "Senior UX Lead", assignment: "Design Sprint", assignBg: "bg-secondary-container/20", assignText: "text-secondary", action: "Remove", actionText: "text-error" },
    { id: 3, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8l8Uf_WtrbhFg3GYVoWFJN0DJVgVTtkFwpWl1RvWiAW7FXqTJNc2PoUPrFi961-lJEcBvYLOTJKUTfbOBilO-ep-Fi0GUMRohcj22Sre0InzV8IyEgilUcgbk7AXyKVvffeYxV8OtZFrgjF4YGFDhOSjjaMZWR0cSySCaKyUo_5mgmHlVq-7Ow0tKL4wnzAYx1B49XjL6UtF7PT0tgfX0cSai25BhM-SkDtTSdg1C_LRt9sC2TNBchr0kwkc8oiHaMWzuY6LjoVJA", name: "Marcus Chen", role: "Venture Partner", assignment: "Unassigned", assignBg: "bg-surface-container-highest", assignText: "text-outline", action: "Assign Now", actionText: "text-primary" },
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      
      {/* Main Content Canvas */}
      <main className="flex-1 ml-64 p-10 min-h-screen bg-background text-on-surface font-body antialiased">
        {/* Header Section */}
        <header className="flex justify-between items-end mb-12">
          <div>
            <nav className="flex items-center gap-2 text-secondary text-sm mb-2">
              <span>Admin</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary font-medium">Events Management</span>
            </nav>
            <h2 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">Event Directory</h2>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                className="pl-12 pr-6 py-3 bg-surface-container-low border-none rounded-full w-72 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all" 
                placeholder="Search events..." 
                type="text"
              />
            </div>
            <button className="bg-gradient-to-br from-primary-container to-primary text-on-primary px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-[0px_20px_40px_rgba(0,24,72,0.1)] hover:scale-[1.02] active:scale-95 transition-all">
              <span className="material-symbols-outlined">add</span>
              Create New Event
            </button>
          </div>
        </header>

        {/* Bento Layout: Active Event Highlight & Quick Stats */}
        <div className="grid grid-cols-12 gap-8 mb-12">
          {/* Large Featured Card */}
          <div className="col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 dark:border-slate-800">
            <div className="absolute inset-0 z-0">
              <img className="w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_AXqaSRZammWtVWJqGbY8Am8L-DYSsNy8Hi5nKd-dRgKGo8HLwqaeja3qu1TBfL0DBr3LHraS8FemqwlExNoHTQY1GuL15XGa47vC0ERqvAoLRxOPR97VzkVd45Q7GxR4TxtL_OEpvqS1BnN-04umIb8bgtVNAiGup-0EQQfQhK8T1YnkG-GQzJbU5avCLEBWs8J2oGn0LoRL2KnArHwkw-_aCDvoAdcR0rg-3MUKnxw1mFYMX5V4xa-hWJZmOKRavg2CiPLuSBlj" alt="Event highlighted" />
            </div>
            <div className="relative z-10 p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1.5 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
                  Live Now
                </span>
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-4 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXQwdvho8Zgs6yf6Pz_TiuVMg_HS0eAcmtTczMRrixqu8TxVA6jaKTi55mNGeT2qk3bf0h-hE1q_B3mYYM4RI1fDSffyRPnDFQHChRVJGK5GLPbVaOnA6etysuQ9gIKZl9fIGUDDYiKf0PI3MmPe-AjEkTgcLA1w92uTsY9mO9iA_6eLI6DBPiWyMDR2-RBlwn8Nqtuppf1m3ZXBOAigOMB5xiUDU9m3w5KTs27ZYhZ61_a-mr9dkdbtFIMBdL5JRUXWyuefSFKm85" alt="Participant" />
                  <img className="w-10 h-10 rounded-full border-4 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABqhk27IY1_Xr6OgmFcBhrQUqiaWfGgK_z7DYHETU-Y-kpKVfUemQR3KYElT4xKMXR0S_CmA6u3fkWr_6xXP-LADVkXdg8zmM1jhZCGesN1iG227BpMgX0SOfCADjJO28URZ4mylLw1RNGwr0y4GzTxQqAmcoRPOVN_6jmSr4sIM1cxXCFb7d6SGR_wnpoynlqxXNrykbtEQ4UqfbOqXmAM36or_6agKqD0WzE4H3Dyoqi2VuGVWjEt55Lyp-DvzMtz-Z8n3nkZNho" alt="Participant" />
                  <div className="w-10 h-10 rounded-full border-4 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-secondary">+12</div>
                </div>
              </div>
              <h3 className="text-3xl font-headline font-bold mb-2">Global Tech Summit 2024</h3>
              <p className="text-secondary mb-8 max-w-md">The flagship innovation event featuring 45+ speakers and 200 competitive teams worldwide.</p>
              <div className="mt-auto flex gap-10">
                <Metric label="Participants" value="2,480" />
                <Metric label="Submissions" value="142" />
                <Metric label="Avg. Score" value="8.4" />
              </div>
            </div>
          </div>

          {/* Stats Stack */}
          <div className="col-span-4 flex flex-col gap-8">
            <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined">pending_actions</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-outline uppercase tracking-wider">Draft Events</p>
                  <h4 className="text-2xl font-headline font-extrabold">04</h4>
                </div>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-2/3"></div>
              </div>
            </div>
            
            <div className="bg-primary text-white p-6 rounded-xl flex flex-col justify-center shadow-[0px_20px_40px_rgba(0,61,155,0.15)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">task_alt</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary-fixed-dim uppercase tracking-wider">Completed</p>
                  <h4 className="text-2xl font-headline font-extrabold">128</h4>
                </div>
              </div>
              <p className="text-[10px] text-primary-fixed-dim font-medium leading-relaxed">Year-to-date performance is 12% higher than previous period.</p>
            </div>
          </div>
        </div>

        {/* Event List Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-headline font-bold">Event Catalog</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-xs font-bold bg-white rounded-lg shadow-sm border border-outline-variant/10">Recent</button>
              <button className="px-4 py-2 text-xs font-bold text-outline hover:text-primary transition-colors">Alphabetical</button>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low/50 text-outline text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-8 py-5">Event Detail</th>
                  <th className="px-6 py-5">Venue</th>
                  <th className="px-6 py-5">Date Range</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Teams</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {eventsList.map(ev => (
                  <tr key={ev.id} className="group hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg ${ev.bg} flex items-center justify-center ${ev.text} font-bold`}>{ev.initial}</div>
                        <div>
                          <p className="font-bold text-on-surface">{ev.name}</p>
                          <p className="text-xs text-secondary">{ev.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm font-medium text-secondary">{ev.venue}</td>
                    <td className="px-6 py-6 text-sm font-medium text-secondary">{ev.date}</td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1 ${ev.statusBg} ${ev.statusText} rounded-full text-[10px] font-bold`}>{ev.status}</span>
                    </td>
                    <td className={`px-6 py-6 text-sm font-['Manrope'] font-bold ${ev.teamsColor}`}>{ev.teams}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white rounded-lg text-secondary hover:text-primary transition-all shadow-sm">
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg text-secondary hover:text-primary transition-all shadow-sm">
                          <span className="material-symbols-outlined text-xl">visibility</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Role Management & Create Form Side-by-Side Asymmetry */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Create/Edit Event Form Card */}
          <div className="col-span-7 bg-surface-container-lowest p-10 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-primary rounded-full"></div>
              <h3 className="text-2xl font-headline font-bold">Configure Event</h3>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold mb-2 block">Event Name</label>
                  <input className="w-full px-5 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all text-sm font-medium" type="text" defaultValue="New Global Hackathon" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold mb-2 block">Date Range</label>
                  <input className="w-full px-5 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 text-sm font-medium" placeholder="Select dates" type="text" defaultValue="" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold mb-2 block">Venue</label>
                  <input className="w-full px-5 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 text-sm font-medium" placeholder="City or Online" type="text" defaultValue="" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-outline font-bold mb-2 block">Description</label>
                <textarea className="w-full px-5 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 text-sm font-medium" rows="3" defaultValue="Enter high-level details about the event purpose and key takeaways..."></textarea>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold mb-2 block">Reg. Fee ($)</label>
                  <input className="w-full px-5 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 text-sm font-medium" type="number" defaultValue="49" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold mb-2 block">Max Teams</label>
                  <input className="w-full px-5 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 text-sm font-medium" type="number" defaultValue="100" />
                </div>
                <div className="flex items-end">
                  <button className="w-full h-[52px] bg-surface-container-high text-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all" type="button">
                    <span className="material-symbols-outlined text-lg">cloud_upload</span>
                    Hero Image
                  </button>
                </div>
              </div>
              <div className="pt-4 border-t border-surface-container-low flex justify-end gap-4">
                <button className="px-8 py-3 text-sm font-bold text-outline hover:text-on-surface transition-colors" type="button">Discard Draft</button>
                <button className="px-10 py-3 bg-primary text-on-primary rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all" type="button">Save Event Configuration</button>
              </div>
            </form>
          </div>

          {/* Role Management Section */}
          <div className="col-span-5 space-y-8">
            <div className="bg-surface-container-high/40 p-8 rounded-xl backdrop-blur-md border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-headline font-bold">Judge Assignments</h3>
                  <p className="text-xs text-secondary">Assign experts to current events</p>
                </div>
                <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <span className="material-symbols-outlined">person_add</span>
                </button>
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {judgesList.map(judge => (
                  <div key={judge.id} className="bg-white p-4 rounded-xl flex items-center justify-between group shadow-sm border border-slate-50">
                    <div className="flex items-center gap-4">
                      <img className="w-12 h-12 rounded-lg object-cover" src={judge.img} alt={judge.name} />
                      <div>
                        <p className="text-sm font-bold">{judge.name}</p>
                        <p className="text-[10px] text-outline uppercase font-bold tracking-tighter">{judge.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-[10px] ${judge.assignBg} ${judge.assignText} px-2 py-0.5 rounded font-bold mb-1`}>
                        {judge.assignment}
                      </span>
                      <button className={`${judge.actionText} text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity`}>
                        {judge.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-inverse-surface to-[#1a1f26] p-8 rounded-xl text-white relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/5 text-[120px] rotate-12">auto_awesome</span>
              <h4 className="text-lg font-headline font-bold mb-2">Automated Scoring</h4>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">Enable AI-assisted initial screening for faster judge reviews. Available for Pro events.</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-5 bg-primary rounded-full relative p-0.5">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm ml-auto"></div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Feature Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAB for Quick Actions */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-[0px_20px_40px_rgba(0,61,155,0.4)] hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-3xl">bolt</span>
      </button>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-widest text-outline font-bold">{label}</span>
      <span className="text-2xl font-headline font-extrabold text-primary">{value}</span>
    </div>
  );
}
