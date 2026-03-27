import React from "react";

const eventRows = [
  {
    id: 1,
    initial: "AI",
    initialClass: "bg-primary-fixed text-primary",
    name: "AI Innovation Lab",
    type: "Hackathon Series",
    venue: "Virtual (Discord)",
    date: "Oct 12 - 14, 2024",
    status: "Live",
    statusClass: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    teams: "45 / 50",
  },
  {
    id: 2,
    initial: "DP",
    initialClass: "bg-surface-container-high text-outline",
    name: "Design Sprint Vol.",
    type: "UI/UX Workshop",
    venue: "London, UK",
    date: "Nov 02 - 03, 2024",
    status: "Draft",
    statusClass: "bg-secondary-fixed text-on-secondary-container",
    teams: "0 / 20",
  },
  {
    id: 3,
    initial: "BC",
    initialClass: "bg-primary-fixed text-secondary",
    name: "Blockchain Expo",
    type: "Annual Conference",
    venue: "New York, US",
    date: "Sep 20 - 22, 2024",
    status: "Complete",
    statusClass: "bg-secondary-container/50 text-on-secondary-container",
    teams: "120 / 120",
  },
];

const judgeAssignments = [
  {
    id: 1,
    name: "Dr. Aris Thorne",
    role: "AI Specialist",
    tag: "AI Lab",
    tagClass: "bg-primary-fixed text-primary",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCyX8cBugzg9xU8iK5oD9r44sDpgetXT2ZJVEns2rphQloIynQ9GuJTRgcdcKgOqOLcJ4jJTwnW5VVK2Rhi5ZjMUvBSdRf-YczYymCkFH-DqjZ9vTe53RpgB_WSefozaqDwaV9DrrqfEHy6hCgn_pNzDCdPoIQte1JZiGVpDdt-BXNhnNcKOleL0f8DWLfDSd0ggCD5IWrCr56pGj4uIsMOsBrHwBWC2-WiF72AW1jidJDIcugYYTDDWqyk7E_Bx8hEe17rPThdY5mX",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "Senior UX Lead",
    tag: "Design Sprint",
    tagClass: "bg-secondary-fixed text-on-secondary-container",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDi24LI6wU72ybYA7k7KPbvUWEwII81g1y9lmLF13ps0_MeF9-IcG2g85UrBMi2WG4YiFK-SDQaxVGbYyKtc-uQiVMqgoCWwO8iLamaqOtJ4TMS604PMPnEsf7fzAGwyb8Wo_NNhZ2w_atnjVv-EoRo0IFOn9Ac3T_-Prp9a_VKgb8ntGmbEl1reESTpTPefNdC15nqmGQjGfLAjXQ5sifl63GZuwyffCeUB0qaJEhOysJeLKwIPRaW2ddBX_uzlsFRlp4W9Ms5Do3v",
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Venture Partner",
    tag: "Unassigned",
    tagClass: "bg-surface-container-high text-outline",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8l8Uf_WtrbhFg3GYVoWFJN0DJVgVTtkFwpWl1RvWiAW7FXqTJNc2PoUPrFi961-lJEcBvYLOTJKUTfbOBilO-ep-Fi0GUMRohcj22Sre0InzV8IyEgilUcgbk7AXyKVvffeYxV8OtZFrgjF4YGFDhOSjjaMZWR0cSySCaKyUo_5mgmHlVq-7Ow0tKL4wnzAYx1B49XjL6UtF7PT0tgfX0cSai25BhM-SkDtTSdg1C_LRt9sC2TNBchr0kwkc8oiHaMWzuY6LjoVJA",
  },
];

export default function EventManagement() {
  return (
    <section className="font-body text-on-surface">
      <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-1 flex items-center gap-2 text-xs font-medium text-secondary">
            <span>Admin</span>
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
            <span className="text-primary">Events Management</span>
          </p>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight">
            Event Directory
          </h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block">
            <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              type="text"
              placeholder="Search events..."
              className="w-full rounded-full border border-transparent bg-surface-container-low py-3 pl-12 pr-4 text-sm outline-none transition focus:border-primary/20 focus:ring-2 focus:ring-primary/20 sm:w-72"
            />
          </label>
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-[0px_12px_28px_rgba(0,61,155,0.25)] transition hover:brightness-105 active:scale-95">
            <span className="material-symbols-outlined text-lg">add</span>
            Create New Event
          </button>
        </div>
      </header>

      <div className="mb-8 grid grid-cols-12 gap-6">
        <article className="col-span-12 overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest lg:col-span-8">
          <div className="relative h-full overflow-hidden p-6">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,61,155,0.08),rgba(0,82,204,0.03))]" />
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(0,61,155,0.25)_1px,transparent_0)] [background-size:22px_22px]" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-4 flex items-start justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#ffd9cc] px-3 py-1 text-[11px] font-bold text-[#8a2a00]">
                  <span className="h-2 w-2 rounded-full bg-[#ff4b1f]" />
                  Live Now
                </span>
                <div className="flex -space-x-2">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXQwdvho8Zgs6yf6Pz_TiuVMg_HS0eAcmtTczMRrixqu8TxVA6jaKTi55mNGeT2qk3bf0h-hE1q_B3mYYM4RI1fDSffyRPnDFQHChRVJGK5GLPbVaOnA6etysuQ9gIKZl9fIGUDDYiKf0PI3MmPe-AjEkTgcLA1w92uTsY9mO9iA_6eLI6DBPiWyMDR2-RBlwn8Nqtuppf1m3ZXBOAigOMB5xiUDU9m3w5KTs27ZYhZ61_a-mr9dkdbtFIMBdL5JRUXWyuefSFKm85"
                    alt="Attendee"
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuABqhk27IY1_Xr6OgmFcBhrQUqiaWfGgK_z7DYHETU-Y-kpKVfUemQR3KYElT4xKMXR0S_CmA6u3fkWr_6xXP-LADVkXdg8zmM1jhZCGesN1iG227BpMgX0SOfCADjJO28URZ4mylLw1RNGwr0y4GzTxQqAmcoRPOVN_6jmSr4sIM1cxXCFb7d6SGR_wnpoynlqxXNrykbtEQ4UqfbOqXmAM36or_6agKqD0WzE4H3Dyoqi2VuGVWjEt55Lyp-DvzMtz-Z8n3nkZNho"
                    alt="Attendee"
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
                  <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-surface-container-high text-[10px] font-bold text-secondary">
                    +12
                  </span>
                </div>
              </div>

              <h2 className="mb-2 font-headline text-4xl font-extrabold tracking-tight">
                Global Tech Summit 2024
              </h2>
              <p className="mb-6 max-w-xl text-sm text-secondary">
                The flagship innovation event featuring 45+ speakers and 200
                competitive teams worldwide.
              </p>

              <div className="mt-auto grid max-w-lg grid-cols-3 gap-6 border-t border-outline-variant/30 pt-4">
                <Metric label="Participants" value="2,480" />
                <Metric label="Submissions" value="142" />
                <Metric label="Avg. Score" value="8.4" />
              </div>
            </div>
          </div>
        </article>

        <div className="col-span-12 grid gap-4 lg:col-span-4">
          <article className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-primary shadow-sm">
                <span className="material-symbols-outlined text-lg">
                  pending_actions
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline">
                  Draft Events
                </p>
                <p className="font-headline text-3xl font-extrabold leading-none">
                  04
                </p>
              </div>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
              <div className="h-full w-2/3 bg-primary" />
            </div>
          </article>

          <article className="rounded-2xl bg-primary p-5 text-white shadow-[0px_12px_28px_rgba(0,61,155,0.3)]">
            <div className="mb-3 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
                <span className="material-symbols-outlined text-lg">
                  task_alt
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed-dim">
                  Completed
                </p>
                <p className="font-headline text-3xl font-extrabold leading-none">
                  128
                </p>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-primary-fixed-dim">
              Year-to-date performance is 12% higher than previous period.
            </p>
          </article>
        </div>
      </div>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-headline text-2xl font-bold">Event Catalog</h3>
          <div className="flex items-center gap-2 text-xs font-bold">
            <button className="rounded-full bg-white px-3 py-1.5 text-on-surface shadow-sm">
              Recent
            </button>
            <button className="rounded-full px-3 py-1.5 text-outline">
              Alphabetical
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-surface-container-low/60 text-[10px] uppercase tracking-widest text-outline">
                <tr>
                  <th className="px-6 py-4">Event Detail</th>
                  <th className="px-5 py-4">Venue</th>
                  <th className="px-5 py-4">Date Range</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Teams</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {eventRows.map((event) => (
                  <tr
                    key={event.id}
                    className="group transition hover:bg-surface-container-low/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`grid h-9 w-9 place-items-center rounded-lg text-xs font-bold ${event.initialClass}`}
                        >
                          {event.initial}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{event.name}</p>
                          <p className="text-xs text-secondary">{event.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-secondary">
                      {event.venue}
                    </td>
                    <td className="px-5 py-4 text-sm text-secondary">
                      {event.date}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${event.statusClass}`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-primary">
                      {event.teams}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-1.5 opacity-0 transition group-hover:opacity-100">
                        <button className="rounded-lg p-1.5 text-secondary hover:bg-surface-container-low hover:text-primary">
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </button>
                        <button className="rounded-lg p-1.5 text-secondary hover:bg-surface-container-low hover:text-primary">
                          <span className="material-symbols-outlined text-lg">
                            visibility
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

      <section className="grid grid-cols-12 gap-6">
        <article className="col-span-12 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6 lg:col-span-7">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-6 w-1 rounded-full bg-primary" />
            <h3 className="font-headline text-3xl font-bold tracking-tight">
              Configure Event
            </h3>
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-outline">
                Event Name
              </label>
              <input
                type="text"
                defaultValue="New Global Hackathon"
                className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none ring-primary/20 transition focus:ring-2"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-outline">
                  Date Range
                </label>
                <input
                  type="text"
                  placeholder="Select dates"
                  className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none ring-primary/20 transition focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-outline">
                  Venue
                </label>
                <input
                  type="text"
                  placeholder="City or Online"
                  className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none ring-primary/20 transition focus:ring-2"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-outline">
                Description
              </label>
              <textarea
                rows="3"
                defaultValue="Enter high-level details about the event purpose and key takeaways..."
                className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none ring-primary/20 transition focus:ring-2"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-outline">
                  Reg. Fee ($)
                </label>
                <input
                  type="number"
                  defaultValue="49"
                  className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none ring-primary/20 transition focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-outline">
                  Max Teams
                </label>
                <input
                  type="number"
                  defaultValue="100"
                  className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none ring-primary/20 transition focus:ring-2"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-surface-container-high text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
                >
                  <span className="material-symbols-outlined text-lg">
                    image
                  </span>
                  Hero Image
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-surface-container-low pt-3">
              <button
                type="button"
                className="px-5 py-2 text-sm font-bold text-outline transition hover:text-on-surface"
              >
                Discard Draft
              </button>
              <button
                type="button"
                className="rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-bold text-white shadow-[0px_8px_24px_rgba(0,61,155,0.25)] transition hover:brightness-105 active:scale-95"
              >
                Save Event Configuration
              </button>
            </div>
          </form>
        </article>

        <div className="col-span-12 space-y-4 lg:col-span-5">
          <article className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-headline text-2xl font-bold">
                  Judge Assignments
                </h3>
                <p className="text-xs text-secondary">
                  Assign experts to current events
                </p>
              </div>
              <button className="grid h-9 w-9 place-items-center rounded-full bg-primary-fixed text-primary transition hover:bg-primary hover:text-white">
                <span className="material-symbols-outlined text-lg">
                  person_add
                </span>
              </button>
            </div>

            <div className="space-y-3">
              {judgeAssignments.map((judge) => (
                <div
                  key={judge.id}
                  className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={judge.avatar}
                      alt={judge.name}
                      className="h-11 w-11 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold">{judge.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-outline">
                        {judge.role}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-md px-2 py-1 text-[10px] font-bold ${judge.tagClass}`}
                  >
                    {judge.tag}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-inverse-surface to-[#171c24] p-5 text-white">
            <span className="material-symbols-outlined absolute -right-6 -bottom-8 text-[110px] text-white/5">
              auto_awesome
            </span>
            <h4 className="mb-1 font-headline text-xl font-bold">
              Automated Scoring
            </h4>
            <p className="mb-4 text-sm text-slate-300">
              Enable AI-assisted initial screening for faster judge reviews.
              Available for Pro events.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-10 items-center rounded-full bg-primary p-0.5">
                <div className="ml-auto h-4 w-4 rounded-full bg-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">
                Feature Enabled
              </span>
            </div>
          </article>
        </div>
      </section>

      <button className="fixed bottom-8 right-8 z-30 grid h-12 w-12 place-items-center rounded-full bg-gradient-primary text-white shadow-[0px_14px_30px_rgba(0,61,155,0.35)] transition hover:brightness-105 active:scale-95">
        <span className="material-symbols-outlined text-xl">bolt</span>
      </button>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-outline">
        {label}
      </p>
      <p className="font-headline text-3xl font-extrabold text-primary">
        {value}
      </p>
    </div>
  );
}
