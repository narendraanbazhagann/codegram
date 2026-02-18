import { motion } from 'framer-motion';
import { Trophy, Medal, ArrowUp, ArrowDown, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
    const topPlayers = [
        { rank: 1, name: "CodeMaster", elo: 2847, winRate: "82%", matches: 450, trend: "up", avatar: "CodeMaster" },
        { rank: 2, name: "AlgoKing", elo: 2631, winRate: "78%", matches: 380, trend: "up", avatar: "AlgoKing" },
        { rank: 3, name: "DevQueen", elo: 2518, winRate: "75%", matches: 410, trend: "down", avatar: "DevQueen" },
        { rank: 4, name: "ScriptWizard", elo: 2489, winRate: "74%", matches: 520, trend: "up", avatar: "ScriptWizard" },
        { rank: 5, name: "ByteBoss", elo: 2412, winRate: "72%", matches: 300, trend: "down", avatar: "ByteBoss" },
        { rank: 6, name: "NodeNinja", elo: 2385, winRate: "71%", matches: 290, trend: "up", avatar: "NodeNinja" },
        { rank: 7, name: "ReactRacer", elo: 2350, winRate: "70%", matches: 340, trend: "up", avatar: "ReactRacer" },
        { rank: 8, name: "PythonPro", elo: 2315, winRate: "69%", matches: 400, trend: "down", avatar: "PythonPro" },
    ];

    return (
        <div className="min-h-screen px-4 py-12 pb-24">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6"
                    >
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs font-black text-yellow-500 uppercase tracking-widest">Global Rankings</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black text-white mb-4"
                    >
                        World Leaderboard
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        The top developers competing for glory. Rank up by winning battles and solving complex algorithmic challenges.
                    </motion.p>
                </header>

                {/* Top 3 Podium */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
                    {/* Rank 2 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl text-center relative order-2 md:order-1"
                    >
                        <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full mb-4 border-4 border-slate-700 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topPlayers[1].avatar}`} alt="Avatar" />
                        </div>
                        <Medal className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <h3 className="text-xl font-bold text-white mb-1">{topPlayers[1].name}</h3>
                        <p className="text-purple-400 font-black text-2xl">{topPlayers[1].elo}</p>
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center font-black text-slate-400 border border-slate-700">2</div>
                    </motion.div>

                    {/* Rank 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-b from-yellow-500/20 to-slate-900/40 backdrop-blur-xl border border-yellow-500/30 p-10 rounded-[2.5rem] text-center relative order-1 md:order-2 md:scale-110 shadow-2xl shadow-yellow-500/10"
                    >
                        <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full mb-4 border-4 border-yellow-500 overflow-hidden shadow-xl shadow-yellow-500/20">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topPlayers[0].avatar}`} alt="Avatar" />
                        </div>
                        <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                        <h3 className="text-2xl font-black text-white mb-1">{topPlayers[0].name}</h3>
                        <p className="text-yellow-500 font-black text-3xl">{topPlayers[0].elo}</p>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center font-black text-slate-900 border-4 border-slate-950 text-xl shadow-xl">1</div>
                    </motion.div>

                    {/* Rank 3 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl text-center relative order-3"
                    >
                        <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full mb-4 border-4 border-amber-800/50 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topPlayers[2].avatar}`} alt="Avatar" />
                        </div>
                        <Medal className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                        <h3 className="text-xl font-bold text-white mb-1">{topPlayers[2].name}</h3>
                        <p className="text-purple-400 font-black text-2xl">{topPlayers[2].elo}</p>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center font-black text-amber-600 border border-slate-700">3</div>
                    </motion.div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search players..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-300 font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <select className="flex-1 md:flex-none px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-300 font-bold focus:outline-none hover:bg-slate-800 transition-colors">
                            <option>All Time</option>
                            <option>Monthly</option>
                            <option>Weekly</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/50">
                                    <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Rank</th>
                                    <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Player</th>
                                    <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest text-center">Trend</th>
                                    <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Rating</th>
                                    <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Win Rate</th>
                                    <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Matches</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topPlayers.map((player, idx) => (
                                    <motion.tr
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={player.rank}
                                        className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group"
                                    >
                                        <td className="px-8 py-6 font-black text-slate-500">#{player.rank}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden border border-slate-700 group-hover:border-purple-500/50 transition-colors">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.avatar}`} alt="Avatar" />
                                                </div>
                                                <span className="font-bold text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight">{player.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center">
                                                {player.trend === 'up' ? (
                                                    <ArrowUp className="w-5 h-5 text-green-500" />
                                                ) : (
                                                    <ArrowDown className="w-5 h-5 text-red-500" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-black text-purple-400 font-mono">{player.elo}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden mb-1">
                                                <div className="bg-purple-500 h-full" style={{ width: player.winRate }} />
                                            </div>
                                            <span className="text-xs font-bold text-slate-400">{player.winRate}</span>
                                        </td>
                                        <td className="px-8 py-6 text-slate-400 font-medium">{player.matches}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="mt-12 text-center text-slate-500 text-sm font-medium">
                    Showing top 50 players worldwide. Updated every 60 seconds.
                    <div className="mt-6 flex justify-center gap-4">
                        <button className="px-6 py-2 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors">Previous</button>
                        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors font-bold shadow-lg shadow-purple-500/20">Next Page</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
