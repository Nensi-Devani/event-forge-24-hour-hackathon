const flaggedScores = [
  {
    id: "FG-031",
    team: "Nebula Forge",
    reason: "Large score variance between judges",
    delta: "2.8",
    priority: "High",
    priorityClass: "bg-error-container text-on-error-container",
  },
  {
    id: "FG-032",
    team: "Urban Loop",
    reason: "Missing innovation comments",
    delta: "1.1",
    priority: "Medium",
    priorityClass: "bg-secondary-fixed text-on-secondary-container",
  },
  {
    id: "FG-033",
    team: "Byte Bloom",
    reason: "Unreviewed rubric category",
    delta: "0.7",
    priority: "Low",
    priorityClass: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  },
];

const reviewTimeline = [
  {
    id: "RV-220",
    title: "Variance Auto-Flagged",
    subtitle: "Nebula Forge exceeded threshold by 2.8",
    time: "09:12 AM",
    icon: "warning",
  },
  {
    id: "RV-221",
    title: "Manual Audit Assigned",
    subtitle: "Assigned to Dr. Sarah Chen",
    time: "10:06 AM",
    icon: "person_search",
  },
  {
    id: "RV-222",
    title: "Consensus Re-Scoring",
    subtitle: "Pending final approval",
    time: "11:45 AM",
    icon: "rule_settings",
  },
];

export default function ScoringOversight() {
  return (
    <section className="font-body text-on-surface">
      <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-1 text-xs font-medium text-secondary">
            Admin / Reports
          </p>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight">
            Scoring Oversight
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Detect inconsistencies, review anomalies, and approve final results.
          </p>
        </div>
        <button className="w-fit rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-bold text-white shadow-[0px_10px_24px_rgba(0,61,155,0.28)] active:scale-95">
          Export Oversight Log
        </button>
      </header>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-outline">
            Flagged Entries
          </p>
          <p className="mt-2 font-headline text-4xl font-extrabold">12</p>
        </article>
        <article className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-outline">
            Resolved Today
          </p>
          <p className="mt-2 font-headline text-4xl font-extrabold">7</p>
        </article>
        <article className="rounded-2xl bg-primary p-5 text-white shadow-[0px_10px_26px_rgba(0,61,155,0.3)]">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-fixed-dim">
            Audit Confidence
          </p>
          <p className="mt-2 font-headline text-4xl font-extrabold">96%</p>
        </article>
      </div>

      <div className="mb-8 grid grid-cols-12 gap-6">
        <article className="col-span-12 overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest lg:col-span-8">
          <div className="flex items-center justify-between border-b border-surface-container-low px-6 py-4">
            <h2 className="font-headline text-2xl font-bold">
              Flagged Score Reviews
            </h2>
            <button className="rounded-lg bg-surface-container-low px-3 py-1.5 text-xs font-bold text-outline">
              Only Open
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-surface-container-low/60 text-[10px] uppercase tracking-widest text-outline">
                <tr>
                  <th className="px-6 py-4">Ref</th>
                  <th className="px-5 py-4">Team</th>
                  <th className="px-5 py-4">Issue</th>
                  <th className="px-5 py-4">Delta</th>
                  <th className="px-5 py-4">Priority</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {flaggedScores.map((item) => (
                  <tr
                    key={item.id}
                    className="group transition hover:bg-surface-container-low/30"
                  >
                    <td className="px-6 py-4 text-xs font-bold text-outline">
                      {item.id}
                    </td>
                    <td className="px-5 py-4 text-sm font-bold">{item.team}</td>
                    <td className="px-5 py-4 text-sm text-secondary">
                      {item.reason}
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-primary">
                      {item.delta}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${item.priorityClass}`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-1.5 opacity-0 transition group-hover:opacity-100">
                        <button className="rounded-lg p-1.5 text-secondary hover:bg-surface-container-low hover:text-primary">
                          <span className="material-symbols-outlined text-lg">
                            rule
                          </span>
                        </button>
                        <button className="rounded-lg p-1.5 text-secondary hover:bg-surface-container-low hover:text-primary">
                          <span className="material-symbols-outlined text-lg">
                            check_circle
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="col-span-12 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 lg:col-span-4">
          <h3 className="mb-4 font-headline text-xl font-bold">
            Review Timeline
          </h3>
          <div className="space-y-4">
            {reviewTimeline.map((entry) => (
              <div
                key={entry.id}
                className="flex gap-3 rounded-xl bg-surface-container-low/50 p-3"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-fixed text-primary">
                  <span className="material-symbols-outlined text-lg">
                    {entry.icon}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold">{entry.title}</p>
                  <p className="text-xs text-secondary">{entry.subtitle}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-outline">
                    {entry.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-inverse-surface to-[#18202a] p-6 text-white shadow-[0px_14px_30px_rgba(22,28,36,0.35)]">
        <span className="material-symbols-outlined absolute -right-8 -bottom-10 text-[160px] text-white/5">
          shield_with_heart
        </span>
        <div className="relative z-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-headline text-2xl font-bold">
              Integrity Safeguard
            </h3>
            <p className="text-sm text-slate-300">
              AI anomaly detection is active. 3 conflicts are waiting for manual
              approval.
            </p>
          </div>
          <button className="w-fit rounded-full bg-white/15 px-5 py-2.5 text-sm font-bold backdrop-blur-sm transition hover:bg-white/25">
            Open Conflict Queue
          </button>
        </div>
      </article>
    </section>
  );
}
