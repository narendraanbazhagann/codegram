import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Zap, Target, Clock, Shield, Award, PieChart } from 'lucide-react';

const Statistics = () => {
    const stats = [
        { label: "Total Points", val: "14,250", icon: <Award className="w-6 h-6 text-purple-400" />, trend: "+12%" },
        { label: "Battles Played", val: "312", icon: <Shield className="w-6 h-6 text-indigo-400" />, trend: "+5%" },
        { label: "Global Rank", val: "#1,420", icon: <Target className="w-6 h-6 text-pink-400" />, trend: "-24" },
        { label: "Exp Earned", val: "85K", icon: <TrendingUp className="w-6 h-6 text-green-400" />, trend: "+18%" },
    ];

    const topicsPerformance = [
        { topic: "Arrays", percentage: 85, color: "bg-purple-500" },
        { topic: "Strings", percentage: 72, color: "bg-indigo-500" },
        { topic: "Graphs", percentage: 45, color: "bg-pink-500" },
        { topic: "Dynamic Programming", percentage: 38, color: "bg-amber-500" },
        { topic: "Math", percentage: 92, color: "bg-cyan-500" },
    ];

    return (
        <div className="min-h-screen px-4 py-12 pb-24">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4"
                    >
                        <BarChart3 className="w-3 h-3 text-indigo-400" />
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Analytics Dashboard</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-black text-white mb-4 uppercase tracking-tighter"
                    >
                        Your Performance
                    </motion.h1>
                    <p className="text-slate-400 text-lg">Detailed breakdown of your coding journey and skill progression.</p>
                </header>

                {/* Top Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                                    {s.icon}
                                </div>
                                <span className={`text-xs font-black ${s.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'} bg-slate-950 px-2 py-1 rounded-lg border border-slate-800`}>
                                    {s.trend}
                                </span>
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                            <p className="text-3xl font-black text-white">{s.val}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Mastery Chart */}
                    <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <PieChart className="w-5 h-5 text-purple-400" />
                                Topic Mastery
                            </h3>
                            <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Detail View</button>
                        </div>
                        <div className="space-y-6">
                            {topicsPerformance.map((t, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-bold text-slate-300 uppercase tracking-tight">{t.topic}</span>
                                        <span className="text-xs font-mono font-black text-white">{t.percentage}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${t.percentage}%` }}
                                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                            className={`h-full ${t.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline / Activity */}
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <Clock className="w-5 h-5 text-indigo-400" />
                            Activity Heatmap
                        </h3>
                        <div className="grid grid-cols-7 gap-2">
                            {[...Array(49)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`aspect-square rounded-sm ${i % 3 === 0 ? 'bg-purple-500/40' : i % 5 === 0 ? 'bg-purple-500/80' : 'bg-slate-800'}`}
                                    title={`Activity level: ${Math.floor(Math.random() * 5)}`}
                                />
                            ))}
                        </div>
                        <div className="mt-8 flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            <span>Less Activity</span>
                            <span>More Activity</span>
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-800/50">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-slate-400">Longest Streak</span>
                                <span className="text-xs font-black text-white">14 Days</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-400">Daily Average</span>
                                <span className="text-xs font-black text-white">2.4h</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Training Focus Card */}
                <div className="mt-8 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-transparent border border-purple-500/20 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6 text-left">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
                            <Zap className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-1 uppercase tracking-tight">Focus Suggestion</h4>
                            <p className="text-slate-400 text-sm">Your "Graphs" performance is below average. Try 3 focus battles to catch up.</p>
                        </div>
                    </div>
                    <button className="px-8 py-3 bg-purple-600 text-white font-black rounded-xl hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20 uppercase text-xs tracking-widest whitespace-nowrap">
                        Start Focus Training
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
