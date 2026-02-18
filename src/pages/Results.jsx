import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, ArrowRight, Share2, RotateCcw, BarChart3, Star, Zap, Frown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Results = () => {
    const { state } = useLocation();
    const { user } = useAuth();
    const isWinner = state?.winner === user?._id; // Removed socket?.id as socket is not defined in the provided context

    return (
        <div className="min-h-screen flex items-center justify-center p-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full bg-slate-900/40 backdrop-blur-2xl border border-slate-800 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden text-center"
            >
                {/* Background effects */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${isWinner ? 'from-purple-500/10' : 'from-red-500/10'} to-transparent pointer-events-none`} />
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10"
                >
                    <div className={`w-24 h-24 ${isWinner ? 'bg-yellow-500/20 border-yellow-500/30' : 'bg-slate-800/20 border-slate-700/30'} rounded-[2rem] flex items-center justify-center mx-auto mb-8 border shadow-2xl shadow-yellow-500/10`}>
                        {isWinner ? <Trophy className="w-12 h-12 text-yellow-500" /> : <Frown className="w-12 h-12 text-slate-500" />}
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter">
                        {isWinner ? 'Victory!' : 'Defeat'}
                    </h1>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full mb-12">
                        <Star className="w-4 h-4 text-green-500 fill-current" />
                        <span className="text-xs font-black text-green-500 uppercase tracking-widest">+42 Rating Points Earned</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { label: "Time Taken", val: "4m 12s", sub: "Faster than 85%", color: "text-purple-400" },
                            { label: "Memory used", val: "32.4 MB", sub: "Top 12%", color: "text-indigo-400" },
                            { label: "Code Quality", val: "A+", sub: "Excellent", color: "text-green-400" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-slate-950/50 border border-slate-800 p-6 rounded-3xl">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                                <p className={`text-2xl font-black ${stat.color} mb-1`}>{stat.val}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{stat.sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/lobby"
                            className="px-10 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-white/5 uppercase text-sm tracking-widest"
                        >
                            <Zap className="w-5 h-5" /> Find Next Battle
                        </Link>
                        <button className="px-10 py-5 bg-slate-800 text-white font-black rounded-2xl hover:bg-slate-700 transition-all flex items-center justify-center gap-3 active:scale-95 uppercase text-sm tracking-widest">
                            <Share2 className="w-5 h-5" /> Share Result
                        </button>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8">
                        <Link to="/" className="text-xs font-bold text-slate-500 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest">
                            <RotateCcw className="w-4 h-4" /> Review Code
                        </Link>
                        <Link to="/stats" className="text-xs font-bold text-slate-500 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest">
                            <BarChart3 className="w-4 h-4" /> View Full Stats
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Results;
