import React from "react";

export default function Scoring() {
  const leaderboard = [
    {
      teamName: "Nova Stream",
      category: "Sustainable Energy",
      initials: "NV",
      color: "bg-primary/10 text-primary",
      score: "94.2",
      breakdown: { P: 19, A: 18, F: 20, U: 18, I: 19.2 },
      judges: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD3LI3mvBOAhmuQGY2r2GJ8Mop5fnQffeFe-FbZUjAwZm--Wt7hj6feXCwsoLedI2td3SCxMwCyr_4nvKmfVbLJnBcXN9ZEKYBPZCHiF3Ewgeyc8C6UgPX5f1TlN5JqNcMAFl9FKQ4lWosTUO5ovBh4zfSc-VFZ188XRgYkvtMro44Nbg14UCtA8GAhiTShRmWBaQIMPPLGUbioIS0ganbSclCw2NS3ZupPi-BKcp3pqvY0eUK0E9ehh9em4-WxfB4xya-0E3okRBIz",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBK2Lnysfj9cp43EMHn6EbwhhbXNhGCBl06ztyS25krELXA5Je4Pkp3OTVsma5tSF8f_y7k-J4uSXkm5qjweZ_ZDstvGAFdJ3Nl15mXTwVFST_aHV-TjyFxuxRAuXqDA7zdBl433M6KBDbI8ekMhuh2Siy3zfLQr-nEYh4SYry4PfEaX_-58WR8VIKgcEQrK3qQLojNJNpw3zrTNrdMI169qkXRuBYOg-bX_fu1YJ8DrlaEUtKrFdbtX9f8xCM_2jidnEHdjLzXwqG-",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNWTJfijeCtCxHs2mgNLW3l0efks-gfuOJWkgSVYPZgEEzcGLs84vf6WKcndDO1UNsljogR4_m0GynUfWm8IRYoplLxgDXe9VfWCHZQwLstlW72OISpJlSH7jzRpF3I7uYUXaxsjJvR_s5GGP-CKU7CxPgGQHcofC2jXe6nmu8RrEgyNzjGi46HBhZ0Z4HNXO06ecXJkrK4-ZcWbm_93KmbPEcLNZsuvNGi62Y755qBsjLbf1LRKVbA4U3eT5bOSbzHmEHnUrQAMTL",
      ],
      extraJudges: "+2",
      status: "Completed",
      statusColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    },
    {
      teamName: "Lumina Health",
      category: "BioTech Solutions",
      initials: "LX",
      color: "bg-secondary/10 text-secondary",
      score: "--.-",
      breakdown: { P: "--", A: "--", F: "--", U: "--", I: "--" },
      judges: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAsNTF1GSrIGZEW2mD4nO75cuQeBSzVpcop5fN9yWbKd09KrNN4BWTGuNMiyFTqvA1YODeGpm2SPDzCDyKCJ7x5HLADG2aLGLNQ7XPOe5S-ZU28tIAjSMn1jDfsxKeXRTqM3lxtkuTuiWhbQgLq0cYELoa005B19ihs9cPB5NeDNo-JtVwzpe0Gqs97hwoYdgfzbBvyZyUWkmaXQrcvS2DTJsQn4QVuGcNtcYfTEz6Mm6lvt52vzyTQ0T37CBNBOguG6xpqUpdDd4DL",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDRE4uVlcX4DWxy173f-BOV_pY8LggzrhscnRk4IK6V3NtrD-6IBBd1vw_bZ1pxwE1xz83pNI18KU40ThjgUbZjOamuwMhqMyqbDz6zNRhBY_d28_mzodS3ORTQl_43z3dZUevj7fIIjHjd7k4iG99IF8YApT8yRNisp01RzbSdmpanhEKD97EISQ242sUIKlsayNg4_KQx7unfVWBNInK2fQG8vpVJDmhlm8MM6IZ8E9RPoW8Q16KdlW9olo92GnL7Q5vgFsuFMad2",
      ],
      extraJudges: null,
      status: "In Progress",
      statusColor: "bg-secondary-container text-on-secondary-container",
    },
    {
      teamName: "Quantum Systems",
      category: "AI Computing",
      initials: "QS",
      color: "bg-tertiary-container/10 text-tertiary",
      score: "88.5",
      breakdown: { P: 17, A: 18, F: 19, U: 16.5, I: 18 },
      judges: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAuYllrdVyYslVyml7orbh5ecMZPf_VSkwn-aLXTNbdIEOqfaIJmeme_LGkVoixt190EraKIb3kO1GJ1ACwMFrVJn-f5iSo5FEF5HeevP1Cqoiy3PcM8vKtvlTuZo3Tly3Twv6y925QUL-nXDqhg3nfeQdU7Ci-Kqxc7IIHbZBvAC00-TWmFcEen9Tb-5stwkRuMT8bYLkMCM7CZlAGN_-uY_iR8wf9ERyjWwe5Twt03JJPk6M-4Pu6ORPcA1ECgPfGWsgutUpgCXQu",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCWQFfjTsXFoyb4w0uxpJWnhk55C1_3gWkAG3A6cfcAEMqbYYXzh6XFoDM7GFYkMf2-o2ky9glUaWhgSyekyi3tOrD3ZBEgn6dLIeSrFtZXauRMyyZfb8tVXDbrQT-2Fz5W9V-pA-EJ67smmzqkgw-V2iFMqGMnWu4cMK9X32cbXXma9JG-BmwsGSEl_rWfbp23JYKrUyRB5fEZK5HauDit_dUJ1u7oJ44GLlSa_s-FFs54c4BurU1JlIyYnCwCximpwTWSFja82xCX",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCkNRR_BaUAsWiJzQ-hjScymj5OhAfwE2e_ewRURSYkZMf_rvZ5fHkQBTQeiom13t0Fj2-gjAK9Ly65DweYiR2hiPJ6pZlcmhQ8jPgX9ENWf3ALrkxx1WA3sZvTMKB6mt1Y3IqDxkjJTfyGVfFKe5OVHNU4LrdpEQS7YlHwxyn5jOkqcJsTxRUnJAU-zSQNY9RtyIuyQlqnKY7RbaNmBNrNau0MzLa8BNSNO6Yggo5uffjzYygGpB5LWvF-SIh3vXXDu--MB6ZYEy-8",
      ],
      extraJudges: null,
      status: "Completed",
      statusColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    },
    {
      teamName: "Vertex Finance",
      category: "FinTech Platform",
      initials: "VF",
      color: "bg-error-container/10 text-error",
      score: "82.1",
      breakdown: { P: 16, A: 16, F: 18, U: 17, I: 15.1 },
      judges: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB8CSCf02qye4KFMxjnTxPceNP7mIZAM7vMvPyIW7XGiagg4RkKyE3z6I7VfgWAGLoXa0Y_tWju5HtuPmSehXjKSMXnQwNC_cNCnE2nfsqRqmsF4nM-U7a8KtnCGp31LM5zF1Y9pp7NMtK2CWdNNKIlcUvnKTVDjQBf9BtO8n3cgGNFJoocH3RGl1QYhrpD4nvEMtIAjxs8R3Y2ktTseys9mo-BzECysR-mY3DGjQK6tRPh9sEqx1m8tD2NJF_yrLymLGi4vUGFWZvR",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBFBItg2KRBZBA6_iJ8xaJQzZDFBSwmQv_ZDez9R9s9oPtr9FmSJ7D6_pBzISIhtR_I5SuEoa5_yhLj1LBZkx2PsE_54gKwZhMCwsqw8aNZRzmPHu7MazcxB75tc-NCN-NN5hp6NogqKbeDIvWID5Ygee2WFCerYW7cF6ZEP3BGmw8zre2mznEF0DVaIliGSrg0nDhN407OJMIdAaSPA7X-JMEdDJ1WOpNIPFkoXNSAR3sDWX-1B0O9teaZWAtdfDo1U0fBxXKjAia6",
      ],
      extraJudges: null,
      status: "Completed",
      statusColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    },
  ];

  return (
    <section className="bg-surface font-body text-on-surface antialiased min-h-screen overflow-x-hidden">
      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full px-8 py-4 h-20 sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-6">
          <h2 className="text-lg font-extrabold text-slate-900 font-headline">
            Nexus Management
          </h2>
          <div className="relative focus-within:ring-2 focus-within:ring-blue-500/20 rounded-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              className="bg-surface-container-low border-none rounded-full pl-12 pr-6 py-2 w-80 text-sm focus:bg-white focus:ring-0 transition-all outline-none"
              placeholder="Search teams or judges..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900">Admin User</p>
              <p className="text-[10px] text-slate-500">Super Admin</p>
            </div>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtMqDMUaBBOwj-2gvbLH2Vatc0ChKSJQ4K6HJX5Vi42CdICGqPagIBhXpza_MqUrauzU_81qlgSmkqhBGlBKXRQB7Ot49DLR6limNiITTQA2DUpQNPlrYIgHe2uD394wi0e1_NPpTE47bXq1V8Xtmon7qlJBf0fBxHGXc0OQC7qW0gWUmM3BLRzkSDNzkm-mojkfr4lQDikCMiI2LggQAcggpE8ly1Ci4x5RwXTuEVPk8G4EDgv_DfyRI20vN8FU9S104E61CseeNs"
              alt="Admin Avatar"
            />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="min-h-screen p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <nav className="flex gap-2 text-xs font-semibold text-primary mb-2">
              <span>Events</span>
              <span>/</span>
              <span className="text-slate-400">
                Global Innovation Summit 2024
              </span>
            </nav>
            <h3 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight">
              Scoring Overview
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select className="appearance-none bg-surface-container-low border border-slate-200 dark:border-slate-800 rounded-xl pl-6 pr-12 py-3 text-sm font-semibold text-slate-700 focus:ring-primary/20 cursor-pointer min-w-[240px] outline-none">
                <option>Global Innovation Summit 2024</option>
                <option>Regional Startup Weekend</option>
                <option>Tech Founders Expo</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                expand_more
              </span>
            </div>
            <button className="bg-gradient-to-r from-[#0052cc] to-[#003d9b] text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">
                ios_share
              </span>
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">
                leaderboard
              </span>
            </div>
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1 font-label">
                Average Event Score
              </p>
              <h4 className="text-4xl font-black font-headline text-primary tracking-tighter">
                84.2
                <span className="text-lg text-slate-400 font-body font-bold">
                  /100
                </span>
              </h4>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-tertiary-container bg-tertiary-fixed px-3 py-1 rounded-full w-fit">
              <span className="material-symbols-outlined text-sm">
                trending_up
              </span>
              +2.4 from last year
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">
                check_circle
              </span>
            </div>
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1 font-label">
                Evaluation Progress
              </p>
              <h4 className="text-4xl font-black font-headline text-on-surface tracking-tighter">
                78%
              </h4>
            </div>
            <div className="mt-6 w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0052cc] to-[#003d9b]"
                style={{ width: "78%" }}
              ></div>
            </div>
            <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-label">
              156 / 200 Teams Scored
            </p>
          </div>

          <div className="bg-primary-container p-8 rounded-xl flex flex-col justify-between shadow-xl relative overflow-hidden text-white">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div>
              <p className="text-blue-100 font-medium text-sm mb-1 font-label">
                Pending Discrepancies
              </p>
              <h4 className="text-4xl font-black font-headline tracking-tighter">
                12
              </h4>
            </div>
            <button className="mt-6 bg-white/20 hover:bg-white/30 transition-colors text-white text-xs font-bold py-2 px-4 rounded-lg w-fit backdrop-blur-sm z-10 cursor-pointer">
              Review Flagged Scores
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-surface-container-low flex justify-between items-center bg-white dark:bg-slate-900">
            <h5 className="font-bold text-lg font-headline">
              Live Scoring Leaderboard
            </h5>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider font-label">
                    Team Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider font-label">
                    Total Score
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider font-label">
                    Breakdown (P/A/F/U/I)
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider font-label">
                    Assigned Judges
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider font-label">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right font-label">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {leaderboard.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-surface-container-low/30 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${row.color} flex items-center justify-center font-bold font-headline`}
                        >
                          {row.initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">
                            {row.teamName}
                          </p>
                          <p className="text-[10px] text-slate-500 break-words max-w-[120px] leading-tight mt-0.5">
                            {row.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`font-black text-lg font-headline ${row.score === "--.-" ? "text-slate-400" : "text-primary"}`}
                      >
                        {row.score}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-1">
                        {["P", "A", "F", "U", "I"].map((key) => (
                          <div
                            key={key}
                            className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center"
                            title={key}
                          >
                            <span className="text-[8px] font-bold text-slate-400 uppercase font-headline">
                              {key}
                            </span>
                            <span
                              className={`text-[10px] font-bold ${row.score === "--.-" ? "text-slate-300 dark:text-slate-600" : "text-slate-700 dark:text-slate-300"} font-label`}
                            >
                              {row.breakdown[key]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex -space-x-2">
                        {row.judges.map((img, i) => (
                          <img
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                            src={img}
                            alt="Judge"
                          />
                        ))}
                        {row.extraJudges && (
                          <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 font-headline">
                            {row.extraJudges}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.statusColor} uppercase tracking-wide`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-primary font-bold text-xs hover:underline decoration-2 underline-offset-4 cursor-pointer">
                        View Scorecard
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-surface-container-low/20 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs font-medium text-slate-500">
              Showing 1-4 of 200 teams
            </p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm text-slate-400 hover:text-primary transition-colors border border-slate-100 dark:border-slate-800">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-container text-white shadow-md font-bold text-sm">
                1
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-800">
                2
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-800">
                3
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm text-slate-400 hover:text-primary transition-colors border border-slate-100 dark:border-slate-800">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FAB for Quick Audit */}
      <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-[#0052cc] to-[#003d9b] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group z-50 cursor-pointer">
        <span className="material-symbols-outlined text-2xl">add_chart</span>
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          New Scoring Audit
        </span>
      </button>
    </section>
  );
}
