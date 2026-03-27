import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ScoringOversight() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [event, setEvent] = useState(null);
  const [selectedRound, setSelectedRound] = useState('');
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { API.get('/events?limit=100').then(res => setEvents(res.data.events || [])).catch(console.error); }, []);

  useEffect(() => {
    if (selectedEvent) API.get(`/events/${selectedEvent}`).then(res => { setEvent(res.data); if (res.data.rounds?.[0]) setSelectedRound(res.data.rounds[0]._id); }).catch(console.error);
  }, [selectedEvent]);

  useEffect(() => {
    if (selectedEvent && selectedRound) {
      setLoading(true);
      API.get(`/scores/event/${selectedEvent}/round/${selectedRound}`).then(res => setScores(res.data)).catch(console.error).finally(() => setLoading(false));
    }
  }, [selectedEvent, selectedRound]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(event?.title || 'Event Scores', 14, 22);
    const round = event?.rounds?.find(r => r._id === selectedRound);
    doc.setFontSize(12);
    doc.text(`Round: ${round?.name || 'N/A'}`, 14, 32);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 40);

    const headers = ['Rank', 'Team', ...(round?.evaluationCriteria?.map(c => c.name) || []), 'Total'];
    const data = scores.map((s, i) => [
      i + 1,
      s.team?.teamName || 'N/A',
      ...(s.criteriaScores?.map(cs => cs.score) || []),
      s.totalScore || 0,
    ]);

    autoTable(doc, { head: [headers], body: data, startY: 48, styles: { fontSize: 10 }, headStyles: { fillColor: [0, 82, 204] } });
    doc.save(`${event?.title || 'scores'}_round_${round?.name || ''}.pdf`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Scoring & Reports</h1>
          <p className="text-on-surface-variant mt-1">View scores and export event-wise data as PDF.</p>
        </div>
        {scores.length > 0 && (
          <button onClick={exportPDF} className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all active:scale-95 w-full md:w-auto justify-center">
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span> Export PDF
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 font-label">Event</label>
          <select value={selectedEvent} onChange={e => { setSelectedEvent(e.target.value); setScores([]); }} className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/40">
            <option value="">Select event...</option>
            {events.map(ev => <option key={ev._id} value={ev._id}>{ev.title}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 font-label">Round</label>
          <select value={selectedRound} onChange={e => setSelectedRound(e.target.value)} disabled={!event} className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/40">
            <option value="">Select round...</option>
            {event?.rounds?.map(r => <option key={r._id} value={r._id}>Round {r.roundNumber}: {r.name}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
      ) : scores.length > 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="bg-surface-container-low">
                <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Rank</th>
                <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Team</th>
                {event?.rounds?.find(r => r._id === selectedRound)?.evaluationCriteria?.map((c, i) => (
                  <th key={i} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{c.name}</th>
                ))}
                <th className="px-6 py-4 text-xs font-bold text-primary uppercase tracking-wider text-right">Total</th>
              </tr></thead>
              <tbody className="divide-y divide-surface-container">
                {scores.map((s, idx) => (
                  <tr key={s._id} className={`hover:bg-surface-container-low/50 transition-colors ${idx < 3 ? 'bg-amber-50/30' : ''}`}>
                    <td className="px-6 py-4 font-headline font-extrabold text-lg">{String(idx + 1).padStart(2, '0')}</td>
                    <td className="px-6 py-4 font-bold text-sm">{s.team?.teamName || 'N/A'}</td>
                    {s.criteriaScores?.map((cs, ci) => (
                      <td key={ci} className="px-6 py-4 text-sm font-medium text-on-surface-variant">{cs.score}</td>
                    ))}
                    <td className="px-6 py-4 text-right font-headline font-bold text-primary text-lg">{s.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : selectedEvent && selectedRound ? (
        <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border"><span className="material-symbols-outlined text-4xl text-outline mb-2 block">leaderboard</span><p className="text-on-surface-variant">No scores recorded for this round yet.</p></div>
      ) : null}
    </div>
  );
}
