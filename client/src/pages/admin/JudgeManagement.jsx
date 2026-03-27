import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000/api";

export default function JudgeManagement() {
  const [judges, setJudges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: [],
    track: "",
    status: "Active",
  });

  const judgesPerPage = 4;

  // Fetch judges from backend
  useEffect(() => {
    fetchJudges();
  }, []);

  const fetchJudges = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/judges`);
      if (!response.ok) throw new Error("Failed to fetch judges");
      const data = await response.json();
      setJudges(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching judges:", err);
      setError("Failed to load judges data");
      // Fallback to mock data if API fails
      setJudges([
        {
          id: 1,
          name: "Marcus Sterling",
          email: "m.sterling@techcorp.com",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAA_0xi-Zwww66xpH8Z6bpAHGWg5x1wM8ysQyMhLpZ0zpDe2YMWJe_nTjh3IZVQgWFJDaJWepTXmz7--9nSTkkqH-2t5pSAE930cV1yPodZ3jxfGL4qDKSVhmCc364qvHuIRzKJAAjEpaeKcCW_htz0SsmQ9wEXXZsk5NechyxODsma87kkZgLTmYzHy0da_HPbca8pILRqdH9fzuTiWJP_7MSOdQs33Orr5TK04_e-BpveiCyxstNzFRyRWM979nynKUznoKZtJ-oE",
          expertise: ["AI / ML", "Systems Architecture"],
          teams: "12 Teams",
          track: "Track: Fintech",
          status: "Active",
          statusColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
          dotColor: "bg-tertiary",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filter judges based on search and status
  const filteredJudges = judges.filter((judge) => {
    const matchesSearch =
      judge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judge.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || judge.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredJudges.length / judgesPerPage);
  const paginatedJudges = filteredJudges.slice(
    (currentPage - 1) * judgesPerPage,
    currentPage * judgesPerPage,
  );

  const handleAddJudge = () => {
    setModalMode("add");
    setSelectedJudge(null);
    setFormData({
      name: "",
      email: "",
      expertise: [],
      track: "",
      status: "Active",
    });
    setShowModal(true);
  };

  const handleEditJudge = (judge) => {
    setModalMode("edit");
    setSelectedJudge(judge);
    setFormData({
      name: judge.name,
      email: judge.email,
      expertise: judge.expertise || [],
      track: judge.track || "",
      status: judge.status,
    });
    setShowModal(true);
  };

  const handleDeleteJudge = async (judgeId) => {
    if (window.confirm("Are you sure you want to delete this judge?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/judges/${judgeId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete judge");
        setJudges(judges.filter((j) => j.id !== judgeId));
      } catch (err) {
        console.error("Error deleting judge:", err);
        alert("Failed to delete judge");
      }
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === "add") {
        const response = await fetch(`${API_BASE_URL}/judges`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to add judge");
        const data = await response.json();
        setJudges([...judges, data]);
      } else {
        const response = await fetch(
          `${API_BASE_URL}/judges/${selectedJudge.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          },
        );
        if (!response.ok) throw new Error("Failed to update judge");
        setJudges(
          judges.map((j) =>
            j.id === selectedJudge.id ? { ...j, ...formData } : j,
          ),
        );
      }
      setShowModal(false);
    } catch (err) {
      console.error("Error saving judge:", err);
      alert("Failed to save judge");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleExpertise = (exp) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(exp)
        ? prev.expertise.filter((e) => e !== exp)
        : [...prev.expertise, exp],
    }));
  };

  const stats = {
    totalJudges: judges.length,
    activePanels: judges.filter((j) => j.status === "Active").length,
    avgScoreDelay: "4.2",
    pendingInvitations: 3,
  };

  const expertiseStats = {
    "AI & MACHINE LEARNING": 45,
    "UX & PRODUCT DESIGN": 30,
    "WEB3 & BLOCKCHAIN": 25,
  };

  return (
    <section className="bg-surface text-on-surface min-h-screen font-body antialiased overflow-x-hidden">
      <div className="min-h-screen">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-8 py-4 h-20 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-30 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-8 flex-1">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-50 font-headline">
              Nexus Management
            </h2>
            <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl overflow-hidden transition-all">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none focus:ring-0 text-sm placeholder:text-slate-400 outline-none"
                placeholder="Search Users"
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-linear-to-br from-primary-container to-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-900/10 hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-sm">
                download
              </span>
              Export Data
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-500 hover:text-blue-500 transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-slate-500 hover:text-blue-500 transition-colors">
                <span className="material-symbols-outlined">help_outline</span>
              </button>
            </div>
          </div>
        </header>

        <div className="px-8 pt-10 pb-12">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <nav className="flex items-center gap-2 text-xs font-bold text-primary mb-2 uppercase tracking-tighter">
                <span>Events</span>
                <span className="material-symbols-outlined text-[10px]">
                  chevron_right
                </span>
                <span>Global Hackathon 2024</span>
              </nav>
              <h1 className="text-4xl font-black text-on-background tracking-tight font-headline">
                Judge Management
              </h1>
              <p className="text-on-surface-variant mt-2 max-w-2xl">
                Manage evaluation panels, expertise assignment, and judge status
                for the current event cycle.
              </p>
            </div>
            <button
              onClick={handleAddJudge}
              className="flex items-center gap-3 bg-surface-container-high text-primary px-8 py-4 rounded-xl font-bold hover:bg-surface-container-highest transition-all shadow-sm"
            >
              <span className="material-symbols-outlined">person_add</span>
              Add Judge
            </button>
          </div>

          {/* Bento Layout: Stats Summary & List */}
          <div className="grid grid-cols-12 gap-8">
            {/* Stats Bar */}
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-label">
                  Total Judges
                </p>
                <p className="text-3xl font-black text-primary font-headline">
                  {stats.totalJudges}
                </p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-label">
                  Active Panels
                </p>
                <p className="text-3xl font-black text-primary font-headline">
                  {String(stats.activePanels).padStart(2, "0")}
                </p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-label">
                  Avg Score Delay
                </p>
                <p className="text-3xl font-black text-primary font-headline">
                  {stats.avgScoreDelay}
                  <span className="text-sm font-medium text-slate-400 ml-1 tracking-normal font-body">
                    hrs
                  </span>
                </p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-label">
                  Pending Invitations
                </p>
                <p className="text-3xl font-black text-secondary font-headline">
                  {String(stats.pendingInvitations).padStart(2, "0")}
                </p>
              </div>
            </div>

            {/* Main Data Table Containers */}
            <div className="col-span-12 lg:col-span-8 space-y-8">

              {/* Pending Applications Table */}
              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800">
                <div className="px-8 py-5 flex items-center justify-between bg-surface-container-low/50 border-b border-primary/20">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <h3 className="font-bold text-lg font-headline text-primary">
                      Pending Applications
                    </h3>
                  </div>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">2 New Requests</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low/20">
                        <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label">
                          Applicant
                        </th>
                        <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label">
                          Specialization
                        </th>
                        <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {[
                        { name: "Devon Lane", email: "devon@cryptoview.com", spec: "Blockchain / DeFi", initial: "DL" },
                        { name: "Arlene McCoy", email: "arlene@uxdesign.net", spec: "Frontend & UI/UX", initial: "AM" }
                      ].map((pending, idx) => (
                        <tr key={"pend-"+idx} className="hover:bg-surface-container-low/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-black font-headline">
                                {pending.initial}
                              </div>
                              <div>
                                <p className="font-bold text-on-surface">{pending.name}</p>
                                <p className="text-xs text-slate-500">{pending.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-[10px] font-black uppercase rounded-full">
                              {pending.spec}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button className="px-4 py-2 border border-error text-error text-[10px] font-bold uppercase rounded-lg hover:bg-error hover:text-white transition-all shadow-sm">
                                Reject
                              </button>
                              <button className="px-4 py-2 bg-primary text-white text-[10px] font-bold uppercase rounded-lg hover:bg-primary/90 transition-all shadow-sm">
                                Approve
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Active Judges Table */}
              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800">
                <div className="px-8 py-6 flex items-center justify-between bg-surface-container-low/50 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold text-lg font-headline">
                  Active Judges List
                </h3>
                <div className="flex items-center gap-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-primary transition-colors px-3 py-1 rounded border border-slate-200 bg-white"
                  >
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="px-8 py-12 text-center text-slate-500">
                  Loading judges...
                </div>
              ) : error ? (
                <div className="px-8 py-12 text-center text-error">{error}</div>
              ) : paginatedJudges.length === 0 ? (
                <div className="px-8 py-12 text-center text-slate-500">
                  No judges found
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low/20">
                          <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label">
                            Judge Name
                          </th>
                          <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label">
                            Expertise
                          </th>
                          <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label">
                            Assigned Teams
                          </th>
                          <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label">
                            Status
                          </th>
                          <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {paginatedJudges.map((judge, idx) => {
                          const statusColor =
                            judge.status === "Active"
                              ? "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                              : "bg-error-container text-on-error-container";
                          const dotColor =
                            judge.status === "Active"
                              ? "bg-tertiary"
                              : "bg-error";
                          return (
                            <tr
                              key={judge.id || idx}
                              className="hover:bg-surface-container-low/50 transition-colors group"
                            >
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  {judge.avatar ? (
                                    <img
                                      className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10"
                                      src={judge.avatar}
                                      alt={judge.name}
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-black font-headline">
                                      {judge.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-bold text-on-surface">
                                      {judge.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                      {judge.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex flex-wrap gap-2">
                                  {judge.expertise &&
                                  judge.expertise.length > 0 ? (
                                    judge.expertise.map((exp, eIdx) => (
                                      <span
                                        key={eIdx}
                                        className={`px-3 py-1 ${eIdx === 0 ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-surface-container-high text-on-surface-variant"} text-[10px] font-black uppercase rounded-full`}
                                      >
                                        {exp}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-[10px] text-slate-400">
                                      Not specified
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <p className="text-sm font-medium text-on-surface">
                                  {judge.teams || "0 Teams"}
                                </p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                                  {judge.track || "Not Assigned"}
                                </p>
                              </td>
                              <td className="px-8 py-6">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${statusColor} text-[10px] font-black uppercase`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
                                  ></span>
                                  {judge.status}
                                </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => handleEditJudge(judge)}
                                    className="p-2 text-slate-400 hover:text-primary transition-colors"
                                  >
                                    <span className="material-symbols-outlined">
                                      edit
                                    </span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteJudge(judge.id)}
                                    className="p-2 text-slate-400 hover:text-error transition-colors"
                                  >
                                    <span className="material-symbols-outlined">
                                      delete
                                    </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination/Footer */}
                  <div className="px-8 py-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-surface-container-low/20">
                    <p className="text-xs text-slate-500 font-medium">
                      Showing{" "}
                      <span className="text-on-surface font-bold">
                        {paginatedJudges.length}
                      </span>{" "}
                      of{" "}
                      <span className="text-on-surface font-bold">
                        {filteredJudges.length}
                      </span>{" "}
                      judges
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-surface-container-lowest text-slate-400 disabled:cursor-not-allowed shadow-sm hover:disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined">
                          chevron_left
                        </span>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                              currentPage === page
                                ? "bg-primary text-on-primary shadow-sm"
                                : "hover:bg-surface-container-lowest text-slate-500"
                            }`}
                          >
<<<<<<< HEAD
                            {page}
                          </button>
                        ),
                      )}
                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-surface-container-lowest text-slate-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined">
                          chevron_right
                        </span>
                      </button>
                    </div>
                  </div>
                </>
              )}
=======
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${judge.dotColor}`}
                            ></span>
                            {judge.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined">
                                edit
                              </span>
                            </button>
                            <button className="p-2 text-slate-400 hover:text-error transition-colors">
                              <span className="material-symbols-outlined">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination/Footer */}
              <div className="px-8 py-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-surface-container-low/20">
                <p className="text-xs text-slate-500 font-medium">
                  Showing <span className="text-on-surface font-bold">4</span>{" "}
                  of <span className="text-on-surface font-bold">24</span>{" "}
                  judges
                </p>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg bg-surface-container-lowest text-slate-400 cursor-not-allowed shadow-sm">
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary text-xs font-bold shadow-sm">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-lowest text-slate-500 text-xs font-bold transition-colors">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-lowest text-slate-500 text-xs font-bold transition-colors">
                    3
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface-container-lowest text-slate-600 transition-colors shadow-sm">
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
              </div>
>>>>>>> 3a7f44ac2d84a0ea0fa3a21b1db0bf947bde24c5
            </div>

            {/* Side Card: Expertise Distribution */}
            <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg mb-6 font-headline">
                Panel Expertise
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2 font-label">
                    <span>{Object.keys(expertiseStats)[0]}</span>
                    <span className="text-primary">
                      {Object.values(expertiseStats)[0]}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${Object.values(expertiseStats)[0]}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2 font-label">
                    <span>{Object.keys(expertiseStats)[1]}</span>
                    <span className="text-secondary">
                      {Object.values(expertiseStats)[1]}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary"
                      style={{ width: `${Object.values(expertiseStats)[1]}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2 font-label">
                    <span>{Object.keys(expertiseStats)[2]}</span>
                    <span className="text-tertiary">
                      {Object.values(expertiseStats)[2]}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div
                      className="h-full bg-tertiary"
                      style={{ width: `${Object.values(expertiseStats)[2]}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-4 bg-primary-fixed/30 rounded-lg border border-primary/10">
                <p className="text-xs font-bold text-primary flex items-center gap-2 font-label tracking-wide">
                  <span className="material-symbols-outlined text-sm">
                    info
                  </span>
                  PANEL OPTIMIZATION
                </p>
                <p className="text-xs text-on-primary-fixed-variant mt-2 leading-relaxed">
                  You have a high density of AI experts. Consider adding more
                  Product Strategists for balanced scoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile Only) */}
      <button
        onClick={handleAddJudge}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-linear-to-br from-primary-container to-primary text-on-primary shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-50 md:hidden"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* Add/Edit Judge Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black font-headline text-on-background">
                {modalMode === "add" ? "Add New Judge" : "Edit Judge"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Judge Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Expertise Areas
                </label>
                <div className="space-y-2">
                  {["AI / ML", "UX / UI", "Blockchain", "Product Strategy"].map(
                    (exp) => (
                      <label key={exp} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={formData.expertise.includes(exp)}
                          onChange={() => toggleExpertise(exp)}
                          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-2"
                        />
                        <span className="text-sm text-on-surface">{exp}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Track
                </label>
                <input
                  type="text"
                  name="track"
                  value={formData.track}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Track: Fintech"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 bg-surface-container-high text-on-surface rounded-lg font-bold hover:bg-surface-container-highest transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity"
                >
                  {modalMode === "add" ? "Add Judge" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
