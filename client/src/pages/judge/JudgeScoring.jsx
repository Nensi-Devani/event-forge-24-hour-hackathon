import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';

export default function JudgeScoring() {
  const { eventId } = useParams();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(eventId || '');
  const [event, setEvent] = useState(null);
  const [selectedRound, setSelectedRound] = useState('');
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scoringTeam, setScoringTeam] = useState(null);
  const [scores, setScores] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMyEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) fetchEventDetails();
  }, [selectedEvent]);

  useEffect(() => {
    if (selectedEvent && selectedRound) fetchTeams();
  }, [selectedEvent, selectedRound]);

  const fetchMyEvents = async () => {
    try {
      const res = await API.get('/scores/judge/my-events');
      setEvents(res.data);
      if (eventId && res.data.find(e => e._id === eventId)) {
        setSelectedEvent(eventId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEventDetails = async () => {
    try {
      const res = await API.get(`/events/${selectedEvent}`);
      setEvent(res.data);
      if (res.data.rounds?.length > 0) {
        setSelectedRound(res.data.rounds[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/scores/event/${selectedEvent}/teams?roundId=${selectedRound}`);
      setTeams(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openScoring = (team) => {
    setScoringTeam(team);
    setMessage('');
    const round = event?.rounds?.find(r => r._id === selectedRound);
    const initialScores = {};
    if (team.score) {
      team.score.criteriaScores.forEach(cs => {
        initialScores[cs.criteriaName] = cs.score;
      });
    } else {
      round?.evaluationCriteria?.forEach(c => {
        initialScores[c.name] = 0;
      });
    }
    setScores(initialScores);
  };

  const handleSubmitScore = async () => {
    setSubmitting(true);
    setMessage('');
    try {
      const criteriaScores = Object.entries(scores).map(([criteriaName, score]) => ({
        criteriaName,
        score: Number(score),
      }));
      await API.post('/scores', {
        team: scoringTeam._id,
        event: selectedEvent,
        roundId: selectedRound,
        criteriaScores,
      });
      setMessage('Score submitted successfully!');
      setScoringTeam(null);
      fetchTeams();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to submit score');
    } finally {
      setSubmitting(false);
    }
  };

  const currentRound = event?.rounds?.find(r => r._id === selectedRound);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Team Scoring</h1>
        <p className="text-on-surface-variant mt-2">Evaluate teams based on the criteria defined for each round.</p>
      </div>

      {message && (
        <div className={`mb-6 p-3 rounded-xl text-sm font-medium text-center ${message.includes('success') ? 'bg-green-50 border border-green-200 text-green-600' : 'bg-red-50 border border-red-200 text-red-600'}`}>
          {message}
        </div>
      )}

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-on-surface font-label">Select Event</label>
          <select
            value={selectedEvent}
            onChange={(e) => { setSelectedEvent(e.target.value); setSelectedRound(''); setTeams([]); }}
            className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-purple-500"
          >
            <option value="">Choose an event...</option>
            {events.map(ev => (
              <option key={ev._id} value={ev._id}>{ev.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-on-surface font-label">Select Round</label>
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-purple-500"
            disabled={!event}
          >
            <option value="">Choose a round...</option>
            {event?.rounds?.map(round => (
              <option key={round._id} value={round._id}>
                Round {round.roundNumber}: {round.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Criteria info */}
      {currentRound && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">Evaluation Criteria</p>
          <div className="flex flex-wrap gap-3">
            {currentRound.evaluationCriteria?.map((c, i) => (
              <span key={i} className="bg-white px-3 py-1 rounded-full text-xs font-medium text-purple-700 border border-purple-200">
                {c.name} (max: {c.maxScore})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Teams Table */}
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full"></div></div>
      ) : teams.length > 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Team</th>
                <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Leader</th>
                <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Members</th>
                <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {teams.map((team) => (
                <tr key={team._id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-on-surface">{team.teamName}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{team.leader?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{(team.members?.length || 0) + 1}</td>
                  <td className="px-6 py-4">
                    {team.scored ? (
                      <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs font-bold">Scored ({team.score?.totalScore})</span>
                    ) : (
                      <span className="bg-amber-50 text-amber-600 px-2 py-1 rounded-full text-xs font-bold">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openScoring(team)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-700 transition-colors"
                    >
                      {team.scored ? 'Update Score' : 'Score'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedEvent && selectedRound ? (
        <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border">
          <span className="material-symbols-outlined text-4xl text-outline mb-2 block">groups</span>
          <p className="text-on-surface-variant font-medium">No teams registered for this event yet.</p>
        </div>
      ) : null}

      {/* Scoring Modal */}
      {scoringTeam && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setScoringTeam(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-headline font-bold mb-1">Score: {scoringTeam.teamName}</h3>
            <p className="text-sm text-outline mb-6">Round {currentRound?.roundNumber}: {currentRound?.name}</p>

            <div className="space-y-4">
              {currentRound?.evaluationCriteria?.map((criteria, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-bold text-on-surface">{criteria.name}</label>
                    <span className="text-xs text-outline">Max: {criteria.maxScore}</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max={criteria.maxScore}
                    value={scores[criteria.name] || 0}
                    onChange={(e) => {
                      const val = Math.min(Number(e.target.value), criteria.maxScore);
                      setScores({ ...scores, [criteria.name]: val });
                    }}
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-purple-500"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-purple-50 rounded-xl text-center">
              <span className="text-xs font-bold uppercase text-purple-600">Total Score </span>
              <span className="text-2xl font-headline font-extrabold text-purple-700 ml-2">
                {Object.values(scores).reduce((a, b) => a + Number(b), 0)}
              </span>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setScoringTeam(null)} className="flex-1 py-3 rounded-xl border border-outline-variant/30 font-bold text-sm hover:bg-surface-container transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSubmitScore}
                disabled={submitting}
                className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Score'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
