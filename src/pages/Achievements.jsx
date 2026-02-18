import { motion } from 'framer-motion';
import { Target, Award, Lock, Star, Zap, Trophy, Shield, Cpu } from 'lucide-react';

const Achievements = () => {
    const achievements = [
        { id: 1, title: "First Blood", desc: "Win your first 1v1 battle", icon: <Zap className="w-8 h-8 text-yellow-500" />, unlocked: true, date: "Oct 12, 2023" },
        { id: 2, title: "Daily Warrior", desc: "Complete 7 daily challenges in a row", icon: <Target className="w-8 h-8 text-red-500" />, unlocked: true, date: "Nov 05, 2023" },
        { id: 3, title: "Algorithm Expert", desc: "Solve 50 hard problems", icon: <Award className="w-8 h-8 text-purple-500" />, unlocked: false, progress: 65 },
        { id: 4, title: "Social Butterfly", desc: "Invite 5 friends to the platform", icon: <Star className="w-8 h-8 text-indigo-500" />, unlocked: true, date: "Jan 20, 2024" },
        { id: 5, title: "Untouchable", desc: "Win 10 battles without any failed submissions", icon: <Shield className="w-8 h-8 text-blue-500" />, unlocked: false, progress: 80 },
        { id: 6, title: "Grand Master", desc: "Reach Platinum rank in competitive mode", icon: <Trophy className="w-8 h-8 text-amber-500" />, unlocked: false, progress: 20 },
        { id: 7, title: "System Architect", desc: "Score 100% on a System Design challenge", icon: <Cpu className="w-8 h-8 text-cyan-500" />, unlocked: false, progress: 0 },
    ];

    return (
        <div className="min-h-screen px-4 py-12 pb-24">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4"
                    >
                        <Award className="w-3 h-3 text-amber-500" />
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Hall of Fame</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-black text-white mb-4 uppercase tracking-tighter"
                    >
                        Achievements
                    </motion.h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">Track your milestones and unlock exclusive rewards as you master the arena.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((ach, i) => (
                        <motion.div
                            key={ach.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`p-8 rounded-[2rem] border transition-all relative overflow-hidden group ${ach.unlocked ? 'bg-slate-900/40 border-slate-800 hover:border-purple-500/30' : 'bg-slate-950/40 border-slate-900 grayscale opacity-60'}`}
                        >
                            <div className="relative z-10">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${ach.unlocked ? 'bg-slate-950 border border-slate-800 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'bg-slate-900 border border-slate-800'}`}>
                                    {ach.unlocked ? ach.icon : <Lock className="w-8 h-8 text-slate-700" />}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{ach.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">{ach.desc}</p>

                                {ach.unlocked ? (
                                    <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 inline-block">
                                        Unlocked on {ach.date}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                            <span>Progress</span>
                                            <span>{ach.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                            <div className="bg-slate-700 h-full" style={{ width: `${ach.progress}%` }} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Decorative background glow */}
                            {ach.unlocked && (
                                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Achievements;
