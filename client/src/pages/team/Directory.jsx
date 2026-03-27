import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Directory() {
  const teams = [
    {
      rank: '01',
      name: 'Neural Vortex',
      initials: 'NV',
      color: 'bg-primary-container text-white',
      problem: 'AI for Healthcare',
      problemColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      leader: { name: 'Alex Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmrO_mSZnu1EJayJo5g4xgtY5uS2pZ7jSgBAtb5DRrTmXeGnrk8evgSTZChZfpljEc4KGC3iSSgIQTOy6fhyWJKIV3zIxwLv40iBG0Gc4K_wFefDtlBqaVmmX6hv1fmH8SQhDsVrcZelMRBCDmAyzC2uLu0V8zmKGU-SSMNkK_WVWMOgzrOwome4CXN_aBC2Xl4C7fM62eFe8W4NqNwIo-gaSHa-mGLs2dhq4x8WLqA1Ek-YHyg6XIDZODCs4LAhnjjdkFSeJbhYPX' },
      members: [
        { initials: 'JD', color: 'bg-slate-200 text-slate-700' },
        { initials: 'SK', color: 'bg-slate-200 text-slate-700' },
      ],
      extraMembers: '+2',
      techStack: ['Python', 'PyTorch', 'FastAPI']
    },
    {
      rank: '02',
      name: 'EcoLogix',
      initials: 'EL',
      color: 'bg-secondary-container text-on-secondary-container',
      problem: 'Sustainable Energy',
      problemColor: 'bg-secondary-fixed text-on-secondary-fixed-variant',
      leader: { name: 'Sarah Jenkins', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUA7EraVc0y4CBDWqMIWAXrHvcPcVyn3tB_zm1WlZMcZOgPGj0DrEsIRUrjzFnqyfLD8sRxABsX3pFGODjGqx6RXA5ysMj-P28POmYdv5vu0mAo_Y1AvjDeGxd_0UyksAYz236T1A-tNYPVpG2kWgDZLsLQ2OTYsaJbu6Mt22zLwxVPdNEJ7YqD4TI5kiBjmoWEuEgiIMZN6CdX_i0uXtTeRj0y5keGZ4zsS1OBtoM9BI9F_3U68__0ydCey1KAd4omarrz3fqk0tA' },
      members: [
        { initials: 'MT', color: 'bg-slate-200 text-slate-700' },
      ],
      extraMembers: '+4',
      techStack: ['Rust', 'AWS', 'PostgreSQL']
    },
    {
      rank: '03',
      name: 'BlockQuest',
      initials: 'BQ',
      color: 'bg-tertiary-container text-on-tertiary-container',
      problem: 'Decentralized Finance',
      problemColor: 'bg-primary-fixed text-on-primary-fixed-variant',
      leader: { name: 'David Miller', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmsfEnyDYyRJQaHXxEqsyEhMpVgGycRxix7CC3aqKhCsmDxMnjIytwgPzBZS5HZUDbnjFRJVIJoKxAzk4fYxfqpEz2qVuGBUplFo7YyqWzvU78Zupp_75QH1npx-HO7cNK3lZW-MK3TVhiUqePDYmD3wjtmfUDtfqNXPdNfkJQmqNbYjWLCEDZ2zKTbJQsPDFrMCiohy5kQkCdWhv_SEfwocfT4aXZwvzra0m2cSS0DQ1iKxcjXtS-ZMeTZgTADA3R1yzW0m5e3TDc' },
      members: [
        { initials: 'AL', color: 'bg-slate-200 text-slate-700' },
        { initials: 'RB', color: 'bg-slate-200 text-slate-700' },
      ],
      extraMembers: '+1',
      techStack: ['Solidity', 'React', 'Ethers.js']
    },
    {
      rank: '04',
      name: 'UrbanMind',
      initials: 'UM',
      color: 'bg-surface-container-highest text-primary',
      problem: 'Smart Mobility',
      problemColor: 'bg-surface-container-high text-on-surface-variant',
      leader: { name: 'Marcus Tuan', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCupx9bK65q5yTMM8ENftrkF4pVZqhVRmaDlEUnme-0_Lg_zsdNY-0JRRI7fJtUoxZPEDoL6zkwGdlSvQ3RVvbBI7mR7mH24WzM_yZk7FBkghjYzU54qFU1qBOUBNMQiIT5mXXRkF7O3mllI9wvHCCi1WBuZOX0o9wZnnGMNvvIINhBYFjJTDydZYMPqSMEXLWMw7fnSfebKq7GTdp_lgKdpaeqbggVBvqknn5Yyo0du_Oqk3vb0ZnncPeoJDIp9ccnuhnfYoMMvq1c' },
      members: [
        { initials: 'CC', color: 'bg-slate-200 text-slate-700' },
      ],
      extraMembers: '+3',
      techStack: ['Go', 'Google Maps API', 'Kafka']
    },
    {
      rank: '05',
      name: 'Quantum Core',
      initials: 'QC',
      color: 'bg-primary/10 text-primary',
      problem: 'AI for Healthcare',
      problemColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      leader: { name: 'Elena Rodriguez', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3X3x9zexsPywdEoOTjs30yhbhr8SCbOlcOAORtCcS5WynZ7DzSEj-_jVZEwtHYi56EBoFA2rU_qhr0_XBPlnb_axZLaC75Pcimfdh94KAooRv-fXXPpzfVSS4jlip86kcDddkuSThsuElHwDX8IK46qZKQIF2gDM196qku_zsKcTQK8Xd9LzsSywahHZ9LngedKHSTIuTrQWGrhgoVyLbQWD76INlTdz89j-9eRFRadyOeXR3NhjrsaiYsxPtuN-bj-gejuxRCK-V' },
      members: [
        { initials: 'ER', color: 'bg-slate-200 text-slate-700' },
        { initials: 'MK', color: 'bg-slate-200 text-slate-700' },
      ],
      extraMembers: '+2',
      techStack: ['Python', 'TensorFlow', 'Kubernetes']
    }
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen font-body antialiased flex flex-col">
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-8 py-12 flex-1 w-full">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Global Hackathon 2024</span>
              <h1 className="text-5xl font-extrabold text-on-surface tracking-tight mb-4 font-headline">Teams Directory</h1>
              <p className="text-outline text-lg max-w-2xl leading-relaxed">
                Explore the diverse range of talent and innovation. Browse through 124 registered teams tackling complex challenges in AI, Sustainability, and FinTech.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-surface-container-highest px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">groups</span>
                <span className="font-headline font-bold text-on-surface">124 Teams</span>
              </div>
              <div className="bg-surface-container-highest px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                <span className="font-headline font-bold text-on-surface">582 Participants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-surface-container-low rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input className="w-full bg-surface-container-lowest border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 text-sm outline-none" placeholder="Search by team name or leader..." type="text" />
          </div>
          <div className="flex items-center gap-2 min-w-[200px]">
            <span className="text-xs font-bold text-outline uppercase px-2 font-label">Filter By:</span>
            <select className="bg-surface-container-lowest border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-sm flex-1 cursor-pointer outline-none">
              <option>All Problem Statements</option>
              <option>AI for Healthcare</option>
              <option>Sustainable Energy Systems</option>
              <option>Decentralized Finance</option>
              <option>Smart Urban Mobility</option>
            </select>
          </div>
          <button className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant p-3 rounded-xl transition-all outline-none">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="py-6 px-8 font-headline text-xs font-extrabold uppercase tracking-wider text-outline">Rank</th>
                  <th className="py-6 px-4 font-headline text-xs font-extrabold uppercase tracking-wider text-outline">Team Name</th>
                  <th className="py-6 px-4 font-headline text-xs font-extrabold uppercase tracking-wider text-outline">Problem Statement</th>
                  <th className="py-6 px-4 font-headline text-xs font-extrabold uppercase tracking-wider text-outline">Team Leader</th>
                  <th className="py-6 px-4 font-headline text-xs font-extrabold uppercase tracking-wider text-outline">Members</th>
                  <th className="py-6 px-8 font-headline text-xs font-extrabold uppercase tracking-wider text-outline">Tech Stack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {teams.map((team, idx) => (
                  <tr key={team.rank} className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="py-6 px-8 font-headline font-extrabold text-primary text-lg">{team.rank}</td>
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg ${team.color} flex items-center justify-center font-bold font-headline`}>{team.initials}</div>
                        <span className="font-headline font-bold text-on-surface">{team.name}</span>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <span className={`${team.problemColor} px-3 py-1 rounded-full text-xs font-bold`}>{team.problem}</span>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-2">
                        <img className="w-8 h-8 rounded-full" src={team.leader.avatar} alt={team.leader.name} />
                        <span className="text-sm font-medium">{team.leader.name}</span>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex -space-x-2">
                        {team.members.map((member, mIdx) => (
                          <div key={mIdx} className={`w-7 h-7 rounded-full border-2 border-white ${member.color} flex items-center justify-center text-[10px] font-bold font-headline`}>
                            {member.initials}
                          </div>
                        ))}
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-primary-container text-white flex items-center justify-center text-[10px] font-bold font-headline">
                          {team.extraMembers}
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex flex-wrap gap-2">
                        {team.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-bold px-2 py-0.5 bg-surface-container-high rounded-md text-outline font-label uppercase">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination/Footer */}
          <div className="px-8 py-6 border-t border-surface-container-low flex justify-between items-center bg-surface-container-lowest">
            <p className="text-sm text-outline font-medium">Showing 1 to 10 of 124 teams</p>
            <div className="flex items-center gap-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-low transition-all text-outline">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-container text-white font-bold text-sm shadow-sm">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-low transition-all font-bold text-sm text-outline">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-low transition-all font-bold text-sm text-outline">3</button>
              <span className="px-2 text-outline">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-low transition-all font-bold text-sm text-outline">13</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-low transition-all text-outline">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Promotional Banner / Featured Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 relative h-[300px] rounded-[2.5rem] overflow-hidden group">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYomcVkkbUtfzVvZWJ_dDkV2VSnE_u9oxPiEZkolZI3S4Yx4XBLczG7O8fwq7Yq9Asaczg-RKiOumnpRPGCpGmd42U0GqhWreF3vRGDLri-I9eN7H6un3LajB9KimDPLjONv9h4wq_AKTDnsqf-reHU8OWljQnb-VBOGrPttPW8jwtlqsX8Klz8yxOia4UYlzt-Qkuq0jZhweCAQfjw7AD4VKDXE7yuqxepc-fF7jgtAMVatLSHEddQC0sdQDxIO5G2ifZgG9ShO9B" alt="Mentorship Session" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/20 p-12 flex flex-col justify-end">
              <h3 className="text-3xl font-extrabold text-white mb-2 leading-tight font-headline">Join the Mentorship<br/>Session this Friday</h3>
              <p className="text-white/80 max-w-sm mb-6">Learn from industry veterans from Google, Meta, and Tesla about scaling your project.</p>
              <button className="w-fit bg-white text-primary px-8 py-3 rounded-full font-bold text-sm hover:shadow-xl hover:-translate-y-1 transition-all">Register Now</button>
            </div>
          </div>
          
          <div className="bg-surface-container-low rounded-[2.5rem] p-10 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined">emoji_events</span>
            </div>
            <h3 className="text-2xl font-extrabold mb-4 tracking-tight font-headline">Prize Pool Update</h3>
            <p className="text-outline text-sm leading-relaxed mb-6">Total prizes increased to ₹150,000 across all categories. Top team in AI category wins an exclusive accelerator spot.</p>
            <a className="text-primary font-bold text-sm flex items-center gap-2 group w-fit cursor-pointer">
              View full breakdown
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>
      </main>

      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}
