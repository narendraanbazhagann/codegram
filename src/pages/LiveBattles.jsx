import { motion } from 'framer-motion';
import { Play, Eye, Users, Clock, Flame, ArrowRight, Activity } from 'lucide-react';

const LiveBattles = () => {
    const activeBattles = [
        { id: 101, p1: "AliceCode", p1Rank: "Diamond", p2: "BobBuilder", p2Rank: "Platinum", topic: "Graphs", viewers: 1420, timeLeft: "12:45", stage: "Late Game" },
        { id: 102, p1: "CyberPunk", p1Rank: "Master", p2: "NeoDev", p2Rank: "Master", topic: "Dynamic Programming", viewers: 5200, timeLeft: "05:12", stage: "Critical" },
        { id: 103, p1: "SarahScript", p1Rank: "Gold", p2: "DaveDeploy", p2Rank: "Gold", topic: "Arrays", viewers: 230, timeLeft: "25:00", stage: "Opening" },
        { id: 104, p1: "Pythonic", p1Rank: "Platinum", p2: "JavaJitsu", p2Rank: "Diamond", topic: "Trees", viewers: 890, timeLeft: "08:30", stage: "Mid Game" },
        { id: 105, p1: "Rustic", p1Rank: "Silver", p2: "GoGopher", p2Rank: "Gold", topic: "Strings", viewers: 156, timeLeft: "14:20", stage: "Mid Game" },
        { id: 106, p1: "WarpSpeed", p1Rank: "Master", p2: "TimeLord", p2Rank: "Diamond", topic: "Math", viewers: 3100, timeLeft: "02:15", stage: "Final Seconds" },
    ];

    return (
        <div className="min-h-screen px-4 py-12 pb-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full mb-4"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Live Arena</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-black text-white mb-4"
                        >
                            Active Battles
                        </motion.h1>
                        <p className="text-slate-400 text-lg max-w-xl">
                            Watch world-class developers solve complex problems in real-time. Learn strategies and techniques from the best.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <div className="text-center">
                            <p className="text-3xl font-black text-white">4,284</p>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Total Viewers</p>
                        </div>
                        <div className="w-px h-12 bg-slate-800 hidden md:block" />
                        <div className="text-center">
                            <p className="text-3xl font-black text-white">28</p>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Live Matches</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeBattles.map((battle, idx) => (
                        <motion.div
                            key={battle.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all relative"
                        >
                            {/* Viewer Count Badge */}
                            <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full border border-slate-800 flex items-center gap-2 group-hover:border-purple-500/30 transition-colors">
                                <Eye className="w-3 h-3 text-purple-400" />
                                <span className="text-[10px] font-black text-white">{battle.viewers >= 1000 ? `${(battle.viewers / 1000).toFixed(1)}k` : battle.viewers}</span>
                            </div>

                            {/* Match Content */}
                            <div className="p-8 pb-4">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="text-center flex-1">
                                        <div className="w-16 h-16 mx-auto bg-slate-800 rounded-2xl mb-3 border-2 border-slate-700 overflow-hidden group-hover:border-purple-500/30 transition-colors">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${battle.p1}`} alt="P1" />
                                        </div>
                                        <p className="text-xs font-black text-white uppercase tracking-tight truncate">{battle.p1}</p>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{battle.p1Rank}</p>
                                    </div>

                                    <div className="flex flex-col items-center px-4">
                                        <div className="text-xs font-black text-slate-700 mb-2">VS</div>
                                        <div className="w-px h-12 bg-slate-800" />
                                    </div>

                                    <div className="text-center flex-1">
                                        <div className="w-16 h-16 mx-auto bg-slate-800 rounded-2xl mb-3 border-2 border-slate-700 overflow-hidden group-hover:border-purple-500/30 transition-colors">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${battle.p2}`} alt="P2" />
                                        </div>
                                        <p className="text-xs font-black text-white uppercase tracking-tight truncate">{battle.p2}</p>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{battle.p2Rank}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Topic</span>
                                        <span className="text-xs font-bold text-purple-400 uppercase tracking-tight">{battle.topic}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Time Remaining</span>
                                        <div className="flex items-center gap-1.5 font-mono text-sm font-black text-white">
                                            <Clock className="w-3 h-3 text-slate-500" /> {battle.timeLeft}
                                        </div>
                                    </div>

                                    {/* Progress Bar (Mock) */}
                                    <div className="pt-2">
                                        <div className="flex items-center justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">
                                            <span>Progress</span>
                                            <span>{battle.stage}</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden flex">
                                            <div className="bg-purple-500/60 h-full border-r border-slate-950" style={{ width: '45%' }} />
                                            <div className="bg-indigo-500/40 h-full" style={{ width: '30%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-5 mt-4 bg-slate-900 border-t border-slate-800 text-white font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                <Play className="w-3 h-3 fill-current" /> Watch Live Match
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-10 py-4 bg-slate-900/40 backdrop-blur-xl border border-slate-800 text-slate-400 font-bold rounded-2xl hover:text-white hover:border-slate-700 transition-all active:scale-95">
                        Discover More Matches
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveBattles;
