import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import EventCard from '../../components/ui/EventCard';

export default function Home() {
  const events = [
    {
      id: 1,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_gBbTAh59QsNZW9dRHOpb4sgws8Ok7lyxbpyaDMxYQK4_qPYAxlbSJ9owz1JXLzz7mipUEcq_ZlOmYOSKcavv5GT2Tc7FWnIOPQT0TWcBPCdmbfCyD4pNRCrgM6AV5-NKCqKPYCtwkt5oo39MdmwU-zt3tvSdhPRx0XpBzm7q8ri4xMGSFz-PVbv1AU-El3fF7_dj7ea2PsQ0aUwG8Zfj0xeb1cOblq94zfk3RJTO-NPph83JT4tH1FRFxqFj6GF8JR1xsm92JSRS",
      category: "Hackathon",
      price: "₹49.00",
      date: "Oct 24, 2024",
      location: "San Francisco",
      title: "NextGen AI Hackathon",
      description: "Build the future of generative AI with top mentors from Silicon Valley's leading labs.",
      attendees: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB-PPdjpaO5sxbyJfwCby4fQDYkyV8lK5OlWWBh35a_oYXStuAp0XR4MjeOHXMsl0XCZ81A3SL098kRfCAHepplX-MXaCmto7VZUCuftzrDelIQGOrn7C6bkxT5bXJ4jmjwRNcHMOSnRoX65Ftd1ARSj1JH6-qG-nvdDej-YWAKNqR9C65OudFKboWZ98JlLEHMGVoQK_oAG7-668ucyi_qwOZMGz7_98Tjp6xmUcuIlsysbZ8bqbxjYXFfNh08cr1pD7gLjNU5IQoe",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCM4I8oYoGkdXKbDgHPFes-s0xs35hQe0F1PV5JXO6umRB3RShcgE4LC2MiqkTsdCMYp8ivOixJiBbuiN5TLwOXcZPecOPgbJFnR8i2hjbtOXlxhRbnrMwdqXs43gCEDQFFzBubCXmvUmXhokeRacPV3OZtxXoIRMeILGtqi6hUexMSaLn4PfWBBC-foubXDxbfUe9h10GrkyRNJZ6MUE8WczLk_GjJ3-0cA6gIsJDCJl0h4gQx5Dt6jX1eniRQiLp3WO-tTXRkkk07"
      ],
      extraAttendeesCount: 42
    },
    {
      id: 2,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxvw8ESijAspNnxCrEQJxKYSAF4i-nVV304NzLOMHiI53FN-CwYqdYZuPaj7JceJB43_7w7n9kX__oAcrQZwNg_MzrHJCYBXOYBlwQbWEUmF9FBfvXj_KJxc7m8cZNS5dx1uF3YQpfAUWGQHY3ht6xVBNH0GIRuPanlx_EoV3uUN8gYBE4bkAYQYjeukt7aHEoghf2MHuMmaRx5F3H1r3MjhQyoBcWppjGVnXRJUC-YjWgh0CNPGuedfr-m7eujN1xwjv_NkE6Fiwx",
      category: "Competition",
      price: "Free",
      date: "Nov 12, 2024",
      location: "Online",
      title: "Algorithmic Masters Vol. 4",
      description: "Test your coding speed and logic against the world's best programmers in this global challenge.",
      attendees: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAKAgYGopvyc5iZ_ObRSQPE4YvJ4_5ujsW9qM5D_H4eWmQAa1vnTsL__RFm1fjEr9h81xyliSmSL_hgeVSyXu9sKq9fBAkA2U9JHihkJy2kMhSrC5JhTxtl6w3bb9w6Vm1zuY-VgIzf9FPxpCM3HJhhCT3U4tx8__LvZpHRwpvXWV0c0VykzvopfG1befYn29C_jEDzdsI-RxuXGIIEp6L-JIanfkdCUhF2tHQqd_JvIgHAyz7Qtv5JTWRDqPPb8goPtXCbSRYSy6KR"
      ],
      extraAttendeesCount: 150
    },
    {
      id: 3,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBanvMRIq8ddXkpiaRp1aXfWx-Ue_wmTK71bV0ofj02sklZu2AwZVmNXGipLbzlcfqJBgMnPPtkEDeSNEBrO_QAgwf-VSOTYQ_Vch2isqr5Enw4fs8vtf-pJ-Lj23Zbe-AICZKqeYQt0GCdShvZWtJkYXae3M0t0zq2JhnVbDn7FLOUsjkCeEkYRFxS865BcDPpdKlyV9C997-b_UDMO5FEqy1idrw1tzYlRj0PqARiTkU8O0isb6zNvAItTG0177CXdkdkES5ojVRv",
      category: "Design Sprint",
      price: "₹120.00",
      date: "Dec 05, 2024",
      location: "London, UK",
      title: "UX Design Intensive",
      description: "A 48-hour hands-on workshop focusing on user-centered design for emerging technologies.",
      attendees: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDH2tWdE_Rbl4S7gV1J_ahdESVlpi6xbMeop1aeuwa5szsjtCSuCW1SZ0Qs5TFhJslTpy0Do5SgobRzz21NUe-aqfdfdHoqnoxVWHiG2-6heMW_4885NtQ2pi21eeclPjwHQswrI78s9_5wLtbDLsYLvK07_CJcG53yWbIElEbIyRqmqtMclMj3f6FuDom1386kkCfduO1XLBVGCWEUphdjD0msSQGH3H7pxc4zs6RpqPd2bTTvKjOVNgbhMqG-H2_N0aznfm-EKVxP",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDcz6SLRe8ofQZgCWJSDnMW1sVAearzfch2X3TbDQZgNLagBC1qxBZtQkLZ9tkc5mg8NSDAvZnvGS_71Yv7EjDQzphmXDFZ8fz6tHXlfZxdWvS12Jh34-RQINYbZOPk_FU1wEX5xxkdblwvSJcfFS_mvxNmH52OaNSu6Z56TyirGE17BrR9jyi71i235Vc8biD9YXQHatSnIHp_mW3S9PsXpWhH8URi_VaGbSXnrkRGnjFjZCmQScEOWz6yZOQ2lsDsTLGkr-4-MN68"
      ],
      extraAttendeesCount: 12
    },
    {
      id: 4,
      isSpecial: true,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBARxSeg__EJc_BCKTwkV2POcyBIsk9SU_uDE7SkSfN41ToYyeB17PRSEDQbx2ifSnrtXzlvMyeEofSOmtrRcR5UafoCnzX9_HdNrpdDc8YIDOgfQyM-oa_RyxhEG7g4kaU2oDJtVjiUKmgQhoR_lUt5pbLYBiinqXu8QRawnr3VJN9r0RbF0RnenuMY1NlqxKsXs2tZ39iHg7FvY9WQ_5C778Lgj0A5UatBG5RwxedncpqYmooXp8J9BWHMhdaTkj0CY-NgQMNtDU7",
      category: "Special Event",
      price: "₹299.00",
      date: "Jan 15-17, 2025",
      location: "Museum of Science",
      title: "Retro Tech Expo & Symposium",
      description: "Celebrate the history of computing with interactive exhibits, rare hardware demos, and talks from the pioneers who built the web. A nostalgic journey through four decades of innovation.",
      attendees: [],
      extraAttendeesCount: 0
    },
    {
      id: 5,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXY3I2FKx9ug-3rj6c1f_GTQIV7PEOQJiNbEEDWLBKENYTWFlMlsAqkXkVxvY3oTzt21qtflILPNyr2roZXrwn0rX2XPtfOD3EbV1kumHyHcuCsPNL7Lf3AiUDIOH0nOjV7WeTGEhJ8nSsfrPNs4xFQeW7W3ogVCyovMj8MpqnPTrpiVOmev8xlhJHaDYgshBM4Fl8fB2bvqvSPXU2b9W-Y3kp7UN2zRlyI9wAJwfw__DS2K-O8WjBTud3m9mUGkpBPgKyhKHKrtuW",
      category: "Cybersecurity",
      price: "₹15.00",
      date: "Oct 30, 2024",
      location: "Online",
      title: "Defend the Perimeter: CTF",
      description: "A capture the flag event for aspiring security researchers. Learn modern pentesting techniques.",
      attendees: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB52MtcjP8wNFsNKbd8JtEsliejAM9a9fxLDcSvPGo0bWaH5p4KIKtrCL_yTUGmxGi_i3nLeVS2woV3jcxg-5MCD4YaGXD96Sb1FlJZiYBfGtQ3tI73coOfVyEUJf-yfNiLIZAo8VmPBANixKJpJWv3MneTQyJDvnmuB4KU4mpZVLmr1lB76Y9OL_VxPCZlCe7Sc76iYHZt23EOUTA_Ku3xFyJm3iE-wc437WbFEEnUkACPEENBDL8waZ-wHU8H7nZ0CLbi66gUe5Az"
      ],
      extraAttendeesCount: 88
    }
  ];

  return (
    <div className="font-body text-on-surface antialiased bg-background min-h-screen flex flex-col">
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-8 pb-24 w-full flex-1">
        {/* Hero Section */}
        <section className="mt-8 mb-16 relative rounded-xl overflow-hidden aspect-[21/9] min-h-[400px] flex items-center">
          <img className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOkbcNLxXefSWKZaa9oRhClM7o-2J7gwU9GnCxUGyrD_BjmYXzqSoQEQQ-j6tTA8--vJF_7eGDBagx6X85Por6wX_7CPqNzbkQYUZqVnNGEwZcgF5LpF0VjOFjyE9NeZlWbxXIvRehTREFyV2QA8jpcDgR2wY-FhhrRzu6-2ZG9bpeOxcE6BFyv48S-1U-NTq0s39JfkIbVXZ-q9H5ujDptpwP0zCnioiu6Sawb5PZopgqhEjMNGEJGFYL8UU7_-UcDnuawm4WEsEP" alt="Tech stage" />
          <div className="absolute inset-0 bg-gradient-to-r from-on-primary-fixed/80 via-on-primary-fixed/40 to-transparent"></div>
          <div className="relative z-10 px-16 max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold tracking-widest uppercase mb-4 font-label">
              Featured Now
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white font-headline leading-tight tracking-tighter mb-6">
              Global Developer Summit 2024
            </h1>
            <p className="text-lg text-blue-100/90 mb-8 font-body leading-relaxed">
              Join 50,000+ developers for the most anticipated tech event of the year. Keynotes from industry leaders, hands-on labs, and networking.
            </p>
            <div className="flex gap-4">
              <button className="signature-gradient text-white px-8 py-4 rounded-full font-bold font-headline premium-shadow active:scale-95 transition-all">Get Tickets</button>
              <button className="glass-effect text-on-surface px-8 py-4 rounded-full font-bold font-headline active:scale-95 transition-all backdrop-blur-md bg-white/70">Learn More</button>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-10">
              <div>
                <h3 className="font-headline font-bold text-lg mb-6 text-on-surface">Categories</h3>
                <div className="space-y-3">
                  {['Hackathons', 'Coding Competitions', 'Design Sprints', 'Workshops'].map((cat, idx) => (
                    <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                      <input defaultChecked={idx===0} className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 bg-surface-container-low" type="checkbox"/>
                      <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-headline font-bold text-lg mb-6 text-on-surface">Format</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 rounded-full bg-primary-container text-white text-xs font-bold font-label">All</button>
                  <button className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold font-label hover:bg-surface-container-highest transition-colors">Online</button>
                  <button className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold font-label hover:bg-surface-container-highest transition-colors">In-person</button>
                </div>
              </div>

              <div>
                <h3 className="font-headline font-bold text-lg mb-6 text-on-surface">Tech Stack</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                    <input className="w-full pl-9 pr-3 py-2 bg-surface-container-low border-none rounded-lg text-xs focus:ring-2 focus:ring-primary/40" placeholder="Filter skills..." type="text"/>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Python', 'AWS', 'Figma'].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold uppercase tracking-wider rounded">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Event Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Upcoming Tech Events</h2>
                <p className="text-on-surface-variant font-body mt-1">Found 124 curated events for you</p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-lg">
                <button className="p-2 bg-surface-container-lowest shadow-sm rounded-md text-primary">
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">list</span>
                </button>
              </div>
            </div>

            {/* Bento-style Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {events.map((ev) => (
                <EventCard key={ev.id} {...ev} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex items-center justify-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">3</button>
              <span className="px-2 text-outline">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">12</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-24 right-8 md:bottom-8 signature-gradient w-14 h-14 rounded-full text-white flex items-center justify-center premium-shadow active:scale-90 transition-all z-40 hover:rotate-90">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
