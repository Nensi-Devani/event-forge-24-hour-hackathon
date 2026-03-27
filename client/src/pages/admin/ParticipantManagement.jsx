import React from "react";

export default function ParticipantManagement() {
  const participants = [
    {
      teamName: "CyberSentinels",
      teamId: "#9921",
      leaderName: "David Chen",
      leaderAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC54B4aEJax67h93Tt7YO35FxZXfJlx5r_eEUUowVYL9wsVuUNrNb-br3RJaajU8rui6zGTCidICmFJ5hym-OsG2JIqaS4GYOtyODmyEkpo68V7omD1xuKek0BX8Q6VNmrfH_uj1uONd2-4e9HifXQyg4iEbOTDTaonAi62na2rjUKxYbwKlC4IKcHMI6h9TCv6-DYbOascgRTtrpfKAX6Szydv7zJSC1_L-k51ZZxXrxingfbi4PkaHm_YOkNC85KZoADsOMndd4h-",
      membersCount: 4,
      problem: "Decentralized Threat Intelligence",
      date: "Oct 12, 2023",
      status: "Verified",
      statusColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
      statusIcon: "check_circle",
    },
    {
      teamName: "EcoFlow AI",
      teamId: "#9844",
      leaderName: "Sarah Jenkins",
      leaderAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAVMprmgQ3p09cecujI7CfLD0xtbj-OeF2vqriF_i_QIPDvCdMGGyT1BKHag69fl5eJe_k1BIj92g6UL2v9GWP0-btrF08Y4-ODqZIYbwYkD5AQXKnVeHGrThFOKgeITyCEcreiPq5BUySgiVsFwlX7fnry09DK8ZvjpFk4OVxPZpMbriFXxopUsEWdRHJd2tAw-vIMJV6oT8WdMITfLQ7Qsb13M98NUVDlI5z3htrvDbvvHiqB3HCWEXpST0oapm4pnPWJ58AULtQ5",
      membersCount: 3,
      problem: "Optimizing Urban Waste Routes",
      date: "Oct 14, 2023",
      status: "Pending",
      statusColor: "bg-error-container text-on-error-container",
      statusIcon: "pending",
    },
    {
      teamName: "Visionary Lab",
      teamId: "#9710",
      leaderName: "Marcus Thorne",
      leaderAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCRImNXFhsVnmsF2ew8oBn-OTuISp54-HfEgDhyzEP3cWuubDtJFFoaoNq55levp_DdKsxaZbpEwtGTFr19JsJxkrR2pgEekGVT9Pex-hqodTNGmxip8cdU5P5-hyFqOq07bcC8EEFiQvJmGVIMsyeoU5_nSF3vk5avhieHPiAbz0bWQlPUZpYdx_nWufp9ksQsszWezXBSFbbaw6G500j4J1HjmaLe7ucQmf9pZ1ddTYTe9dHmVDr6uY03iX_IMDbOd2z2snzfC6g1",
      membersCount: 2,
      problem: "AR for Accessibility Education",
      date: "Oct 15, 2023",
      status: "Verified",
      statusColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
      statusIcon: "check_circle",
    },
    {
      teamName: "Quantum Core",
      teamId: "#9662",
      leaderName: "Elena Rodriguez",
      leaderAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDLD32-aYtMVwMAB1mWPEhlw_6dYGhPPgLFLSb4gAxaT8xSO7MjE9LSZLhoMB-uUvmo3aylqann4kPics3XIjmYtQ0z7fol4SFuqWpB0r5wr6DQ-qvf91hW7u_CfpDrLsiEFcYjdq6l55RADoE0Pg-0r3vfa3VtWlGZmJhVG4E8cYDp0s67oRNvFa1S-CTqn_njx-WuXMRN8IDqDTDHXE2teon--LrUrdSUr_qX4A50MI5S11-DPpXa3mN8joxPKiJ1LHhWl2kTm7fb",
      membersCount: 4,
      problem: "Post-Quantum Cryptography Layer",
      date: "Oct 18, 2023",
      status: "Pending",
      statusColor: "bg-error-container text-on-error-container",
      statusIcon: "pending",
    },
  ];

  return (
    <section className="bg-surface text-on-surface min-h-screen font-body antialiased overflow-x-hidden">
      <div className="min-h-screen">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-8 py-4 h-20 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-30 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="Search teams or members..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
              <div className="text-right">
                <p className="text-sm font-bold text-on-surface">Alex Rivera</p>
                <p className="text-[10px] uppercase tracking-wider text-outline">
                  Lead Admin
                </p>
              </div>
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvZ-iPF1iacjNPQTsz-mm17flAiR_HkYEC38mUXRbQuMhx7H05h_E6iAUZyGm8LCEk6KspRiaeZS_8W80e96HfmIFyT_N7X24J2nNu0k-XRhqeJt-_4ehkWD7fiimT8Lj7oBuf6A05dlOIrXGc3TiUml_KyA_oH_HavMsTTdt0YvI5-HxUa_ds83oft_P187IMU2A6h89Tb8By661UHanjgi8-At0U5StHB9FmcUoZXH4XL1d6ENNATZ-WNhjVuWxre92tl1W9xv1c"
                alt="Admin Avatar"
              />
            </div>
          </div>
        </header>

        <div className="px-8 pt-10 pb-12">
          {/* Editorial Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">
                Participant Management
              </h2>
              <p className="text-on-surface-variant max-w-xl">
                Curate and oversee all registered teams for the upcoming
                hackathon season. Managing high-impact collaborations across
                borders.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1 font-label">
                  Active Event
                </label>
                <div className="bg-surface-container-lowest rounded-xl px-4 py-2 flex items-center gap-3 shadow-sm cursor-pointer hover:bg-surface-container-low transition-colors border border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-primary">
                    event
                  </span>
                  <span className="font-bold text-sm">
                    Global Hackathon 2024
                  </span>
                  <span className="material-symbols-outlined text-outline text-sm">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Total Teams */}
            <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden group transition-all hover:-translate-y-1 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="relative z-10">
                <p className="text-sm font-medium text-outline mb-1 font-label">
                  Total Registered Teams
                </p>
                <h3 className="text-4xl font-black text-on-surface font-headline">
                  128
                </h3>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  <span>+12% from last week</span>
                </div>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-surface-container-low transition-transform group-hover:scale-110">
                groups
              </span>
            </div>

            {/* Total Participants */}
            <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden group transition-all hover:-translate-y-1 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="relative z-10">
                <p className="text-sm font-medium text-outline mb-1 font-label">
                  Total Participants
                </p>
                <h3 className="text-4xl font-black text-on-surface font-headline">
                  512
                </h3>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-tertiary">
                  <span className="material-symbols-outlined text-sm">
                    person_pin
                  </span>
                  <span>Capacity: 85%</span>
                </div>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-surface-container-low transition-transform group-hover:scale-110">
                emoji_people
              </span>
            </div>

            {/* Needing Verification */}
            <div className="bg-primary p-6 rounded-xl relative overflow-hidden group transition-all hover:-translate-y-1 shadow-lg shadow-primary/20">
              <div className="relative z-10">
                <p className="text-sm font-medium text-primary-container mb-1 font-label">
                  Needing Verification
                </p>
                <h3 className="text-4xl font-black text-white font-headline">
                  14
                </h3>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-on-primary-container">
                  <span className="material-symbols-outlined text-sm">
                    priority_high
                  </span>
                  <span>Action Required</span>
                </div>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-on-primary-container/20 transition-transform group-hover:scale-110">
                verified_user
              </span>
            </div>
          </div>

          {/* Team Table Section */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="px-8 py-6 flex justify-between items-center border-b border-outline-variant/10">
              <h3 className="text-xl font-bold text-on-surface font-headline">
                Registered Teams
              </h3>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-white transition-colors">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
                <button className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-white transition-colors">
                  <span className="material-symbols-outlined">sort</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-outline font-label">
                      Team Name
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline font-label">
                      Team Leader
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline text-center font-label">
                      Members
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline font-label">
                      Problem Statement
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline font-label">
                      Reg. Date
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline font-label">
                      Status
                    </th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-outline text-right font-label">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {participants.map((team, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-surface-container-low/30 transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="font-bold text-on-surface">
                          {team.teamName}
                        </div>
                        <div className="text-[10px] text-primary font-medium">
                          Team ID: {team.teamId}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <img
                            className="w-8 h-8 rounded-full object-cover"
                            src={team.leaderAvatar}
                            alt={team.leaderName}
                          />
                          <span className="text-sm font-semibold">
                            {team.leaderName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-bold">
                          {team.membersCount}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm text-on-surface-variant max-w-[200px] truncate">
                          {team.problem}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-outline">
                        {team.date}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full ${team.statusColor} text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 w-fit`}
                        >
                          <span
                            className="material-symbols-outlined text-xs"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {team.statusIcon}
                          </span>
                          {team.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-primary hover:bg-primary/10">
                            Message
                          </button>
                          <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-white">
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-4 bg-surface-container-low/20 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-medium text-outline">
                Showing 1-10 of 128 registered teams
              </p>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors text-outline">
                  <span className="material-symbols-outlined text-sm">
                    chevron_left
                  </span>
                </button>
                <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high transition-colors text-xs font-bold">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high transition-colors text-xs font-bold">
                  3
                </button>
                <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors text-outline">
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-primary-container to-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group z-50">
        <span className="material-symbols-outlined">person_add</span>
        <span className="absolute right-full mr-4 px-3 py-1 bg-on-surface text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Add Team
        </span>
      </button>
    </section>
  );
}
