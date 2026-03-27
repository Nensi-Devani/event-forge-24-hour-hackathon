const teams = [
  {
    id: "TM-1001",
    name: "Nebula Forge",
    track: "AI + Education",
    members: 4,
    progress: 86,
    status: "Qualified",
    statusClass: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  },
  {
    id: "TM-1002",
    name: "Byte Bloom",
    track: "HealthTech",
    members: 3,
    progress: 64,
    status: "Review",
    statusClass: "bg-secondary-fixed text-on-secondary-container",
  },
  {
    id: "TM-1003",
    name: "Quantum Verse",
    track: "FinTech",
    members: 5,
    progress: 42,
    status: "Pending",
    statusClass: "bg-error-container text-on-error-container",
  },
  {
    id: "TM-1004",
    name: "Urban Loop",
    track: "ClimateTech",
    members: 4,
    progress: 74,
    status: "Qualified",
    statusClass: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  },
];

export default function TeamsDirectory() {
  return (
    <section className="font-body text-on-surface">
      <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-1 text-xs font-medium text-secondary">
            Admin / Teams
          </p>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight">
            Teams Directory
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor team progress, submission readiness, and qualification
            status.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full rounded-full bg-surface-container-low py-2.5 pl-10 pr-4 text-sm outline-none ring-primary/20 transition focus:ring-2 sm:w-72"
              placeholder="Search teams..."
              type="text"
            />
          </label>
          <button className="rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0px_10px_24px_rgba(0,61,155,0.28)] active:scale-95">
            Add Team
          </button>
        </div>
      </header>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-outline">
            Registered Teams
          </p>
          <p className="mt-2 font-headline text-4xl font-extrabold">128</p>
          <p className="mt-2 text-xs font-bold text-primary">+12 this week</p>
        </article>
        <article className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-outline">
            Avg Team Size
          </p>
          <p className="mt-2 font-headline text-4xl font-extrabold">4.1</p>
          <p className="mt-2 text-xs font-bold text-secondary">
            Across all tracks
          </p>
        </article>
        <article className="rounded-2xl bg-primary p-5 text-white shadow-[0px_10px_26px_rgba(0,61,155,0.3)]">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-fixed-dim">
            Ready To Pitch
          </p>
          <p className="mt-2 font-headline text-4xl font-extrabold">84</p>
          <p className="mt-2 text-xs font-bold text-primary-fixed-dim">
            65% completion rate
          </p>
        </article>
      </div>

      <div className="overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest">
        <div className="flex items-center justify-between border-b border-surface-container-low px-6 py-4">
          <h2 className="font-headline text-2xl font-bold">Active Teams</h2>
          <button className="rounded-lg bg-surface-container-low px-3 py-1.5 text-xs font-bold text-outline">
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-surface-container-low/60 text-[10px] uppercase tracking-widest text-outline">
              <tr>
                <th className="px-6 py-4">Team</th>
                <th className="px-5 py-4">Track</th>
                <th className="px-5 py-4">Members</th>
                <th className="px-5 py-4">Progress</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {teams.map((team) => (
                <tr
                  key={team.id}
                  className="group transition hover:bg-surface-container-low/30"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold">{team.name}</p>
                    <p className="text-xs text-secondary">{team.id}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-secondary">
                    {team.track}
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-primary">
                    {team.members}
                  </td>
                  <td className="px-5 py-4">
                    <div className="mb-1 h-1.5 w-32 overflow-hidden rounded-full bg-surface-container-highest">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${team.progress}%` }}
                      />
                    </div>
                    <p className="text-[11px] font-semibold text-outline">
                      {team.progress}%
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${team.statusClass}`}
                    >
                      {team.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1 opacity-0 transition group-hover:opacity-100">
                      <button className="rounded-lg p-1.5 text-secondary hover:bg-surface-container-low hover:text-primary">
                        <span className="material-symbols-outlined text-lg">
                          visibility
                        </span>
                      </button>
                      <button className="rounded-lg p-1.5 text-secondary hover:bg-surface-container-low hover:text-primary">
                        <span className="material-symbols-outlined text-lg">
                          edit
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
