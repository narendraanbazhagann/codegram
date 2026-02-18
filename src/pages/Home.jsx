import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Swords, Zap, Brain, Trophy, Flame, BarChart3, Users, Clock, ArrowRight, Play, Layout as LayoutIcon, Settings, HelpCircle, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
    const { user, isAuthenticated } = useAuth();
    const [greeting, setGreeting] = useState('Welcome back');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) setGreeting('Good morning');
        else if (hour >= 12 && hour < 18) setGreeting('Good afternoon');
        else if (hour >= 18 && hour < 24) setGreeting('Good evening');
        else setGreeting('Burning the midnight oil');
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="relative min-h-[calc(100vh-65px)] overflow-x-hidden">
            {/* Stats Card - Top Right (Desktop) */}
            {isAuthenticated && (
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="hidden lg:block fixed top-24 right-8 z-40"
                >
                    <div className="w-64 bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-2xl relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none" />
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Your Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400 flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-500" /> Rank</span>
                                <span className="text-sm font-bold text-white">#142</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400 flex items-center gap-2"><Zap className="w-4 h-4 text-purple-400" /> Rating</span>
                                <span className="text-sm font-bold text-white">1,250</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400 flex items-center gap-2"><Flame className="w-4 h-4 text-orange-500" /> Streak</span>
                                <span className="text-sm font-bold text-white">5 wins</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-pink-400" /> Win Rate</span>
                                <span className="text-sm font-bold text-white">68%</span>
                            </div>
                        </div>
                        <Link to="/stats" className="block w-full mt-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors text-center">
                            View Full Stats
                        </Link>
                    </div>
                </motion.div>
            )}

            {/* Hero Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center"
            >
                {/* Active Players Counter */}
                <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 mb-8">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-bold text-green-500 uppercase tracking-tighter">324 players online</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
                        <Play className="w-3 h-3 text-purple-400" />
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-tighter">12 battles in progress</span>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center space-x-2 bg-slate-900/40 border border-slate-800/50 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.1)] group hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-shadow duration-300"
                >
                    <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
                    <span className="text-xs text-purple-300 font-bold uppercase tracking-[0.05em]">v1.0 Public Beta is Live</span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-2xl"
                >
                    {isAuthenticated ? (
                        <>
                            <span className="text-white opacity-90">{greeting}, </span>
                            <span style={{
                                background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                {user?.username}
                            </span>! <br />
                            <span className="text-3xl md:text-5xl text-slate-400 font-bold mt-2 inline-block">Ready for your next battle?</span>
                        </>
                    ) : (
                        <>
                            Prove your skills in <br />
                            <span style={{
                                background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Real-time Coding Battles
                            </span>
                        </>
                    )}
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    {isAuthenticated
                        ? "Jump into a battle, practice your skills, or check the leaderboard to see where you stand."
                        : "Compete against developers worldwide in 1v1 algorithmic duels. Rank up, earn badges, and sharpen your skills under pressure."
                    }
                </motion.p>

                {/* Hero Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        to="/lobby"
                        onClick={() => setIsSearching(true)}
                        onMouseEnter={(e) => window.triggerSplat?.(e.clientX, e.clientY, 2)}
                        className="group relative w-full sm:w-auto px-10 py-5 bg-white text-slate-950 rounded-[1.25rem] font-black text-lg hover:bg-purple-50 focus:ring-4 focus:ring-purple-500/20 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.2)] active:scale-95 flex items-center justify-center gap-3 overflow-hidden hover:-translate-y-2"
                    >
                        {isSearching ? (
                            <>
                                <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                                <span>FINDING OPPONENT...</span>
                            </>
                        ) : (
                            <>
                                <Swords className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                <span>ENTER BATTLE ARENA</span>
                            </>
                        )}
                    </Link>
                    <Link
                        to="/practice"
                        onMouseEnter={(e) => window.triggerSplat?.(e.clientX, e.clientY, 1.5)}
                        className="group w-full sm:w-auto px-10 py-5 bg-slate-900/60 backdrop-blur-sm text-white border border-slate-800 rounded-[1.25rem] font-black text-lg hover:bg-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-3 active:scale-95 hover:-translate-y-2"
                    >
                        <Sparkles className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
                        <span>PRACTICE SOLO</span>
                    </Link>
                    {!isAuthenticated && (
                        <Link
                            to="/leaderboard"
                            onMouseEnter={(e) => window.triggerSplat?.(e.clientX, e.clientY, 1)}
                            className="w-full sm:w-auto px-8 py-4 bg-transparent text-slate-400 hover:text-white transition-all font-bold flex items-center justify-center gap-2 group hover:scale-105"
                        >
                            <Trophy className="w-5 h-5 group-hover:text-yellow-500 transition-colors" />
                            <span>LEADERBOARD</span>
                        </Link>
                    )}
                </motion.div>

                {/* Daily Challenge Banner */}
                {isAuthenticated && (
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 group"
                    >
                        <div className="max-w-3xl mx-auto bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-6 relative overflow-hidden transition-all hover:border-yellow-500/40">
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Target className="w-24 h-24 text-yellow-500 rotate-12" />
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-left">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-yellow-500/20 rounded-xl">
                                        <Trophy className="w-6 h-6 text-yellow-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-yellow-500 font-bold uppercase tracking-wider text-xs mb-1">Daily Challenge</h4>
                                        <h3 className="text-xl font-bold text-white mb-1">"Two Sum Problem"</h3>
                                        <div className="flex items-center gap-4 text-xs text-yellow-500/60">
                                            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Solve for 2x points!</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 8h remaining</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="px-6 py-2 bg-yellow-500 text-slate-900 font-extrabold rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 whitespace-nowrap">
                                    Accept Challenge <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Feature Grid / Cards Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            icon: <Zap className="w-8 h-8 text-purple-400" />,
                            title: "Real-Time Battles",
                            desc: "Instant matching with live coding. Experience the thrill of head-to-head competition.",
                            accent: "from-purple-500/20"
                        },
                        {
                            icon: <Trophy className="w-8 h-8 text-pink-400" />,
                            title: "Ranked Matches",
                            desc: "ELO rating leaderboards. Climb the ranks and become a legendary compiler.",
                            accent: "from-pink-500/20"
                        },
                        {
                            icon: <Users className="w-8 h-8 text-indigo-400" />,
                            title: "Peer Learning",
                            desc: "Learn from peer solutions. See how others solved the same problem differently.",
                            accent: "from-indigo-500/20"
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="group p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 hover:border-slate-700/50 transition-all hover:-translate-y-2 relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-slate-950/60 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            {/* Live Battles Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900/50">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
                    <div className="text-left">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <Play className="w-5 h-5 text-purple-400 fill-purple-400/20" />
                            </div>
                            Live Battles Now
                        </h2>
                        <p className="text-slate-400 mt-2">Watch the highest stakes matches in real-time</p>
                    </div>
                    <button className="flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300 transition-colors group">
                        View all active battles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { p1: "@alice", p2: "@bob", topic: "Arrays", time: "2:34", rank: "Gold" },
                        { p1: "@charlie", p2: "@dave", topic: "DP", time: "15:00", rank: "Silver" },
                        { p1: "@coder1", p2: "@expert", topic: "Graphs", time: "8:45", rank: "Platinum" }
                    ].map((match, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 rounded-2xl relative group overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/50" />
                            <div className="flex items-center justify-between mb-6">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-slate-800 border ${match.rank === 'Platinum' ? 'text-indigo-400 border-indigo-500/30' : 'text-purple-400 border-purple-500/30'}`}>
                                    {match.rank} Division
                                </span>
                                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {match.time}
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-8 mb-6 relative">
                                <div className="text-center">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.p1}`} className="w-12 h-12 rounded-full bg-slate-800 mb-2 border-2 border-slate-700" alt={match.p1} />
                                    <p className="text-sm font-bold text-white">{match.p1}</p>
                                </div>
                                <div className="text-xl font-black text-slate-700">VS</div>
                                <div className="text-center">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.p2}`} className="w-12 h-12 rounded-full bg-slate-800 mb-2 border-2 border-slate-700" alt={match.p2} />
                                    <p className="text-sm font-bold text-white">{match.p2}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                <span className="text-xs text-slate-500 uppercase font-bold tracking-tight">Topic: <span className="text-slate-300">{match.topic}</span></span>
                                <button className="text-xs font-bold text-purple-400 hover:text-white transition-colors bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20">Watch Live</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Quick Topic Launcher */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-slate-900/20 backdrop-blur-sm border border-slate-800/50 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
                    <h2 className="text-3xl font-bold text-white mb-2">Jump into a Battle</h2>
                    <p className="text-slate-400 mb-10">Select a topic to find an instant opponent</p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {['Arrays', 'Strings', 'Trees', 'Graphs', 'DP', 'Sorting', 'Recursion', 'Math', 'Greedy'].map((topic) => (
                            <button
                                key={topic}
                                className="px-6 py-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-300 font-bold hover:bg-purple-600 hover:text-white hover:border-purple-400 transition-all hover:scale-110 flex items-center gap-2 group"
                            >
                                <span>{topic}</span>
                                <span className="text-[10px] bg-slate-800 group-hover:bg-purple-700 px-1.5 py-0.5 rounded text-slate-500 group-hover:text-purple-200">12</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Leaderboard & Activity Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900/50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Leaderboard Preview */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                                Top Players
                            </h2>
                            <Link to="/leaderboard" className="text-xs font-bold text-slate-500 hover:text-purple-400 transition-colors uppercase tracking-widest">View All</Link>
                        </div>
                        <div className="space-y-3">
                            {[
                                { user: "@codemaster", pts: "2,847", rank: 1, color: "text-yellow-500" },
                                { user: "@algoking", pts: "2,631", rank: 2, color: "text-slate-300" },
                                { user: "@devqueen", pts: "2,518", rank: 3, color: "text-amber-600" }
                            ].map((player, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl group hover:border-purple-500/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${player.color} bg-slate-800`}>
                                            {player.rank}
                                        </div>
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.user}`} className="w-10 h-10 rounded-full bg-slate-800" alt={player.user} />
                                        <span className="font-bold text-white group-hover:text-purple-300 transition-colors">{player.user}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-white">{player.pts}</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Points</p>
                                    </div>
                                </div>
                            ))}
                            {isAuthenticated && (
                                <div className="mt-6 flex items-center justify-between p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white bg-purple-600">
                                            42
                                        </div>
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} className="w-10 h-10 rounded-full bg-slate-800" alt="Me" />
                                        <span className="font-bold text-white">YOU</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-white">1,250</p>
                                        <p className="text-[10px] text-purple-400 uppercase tracking-tighter flex items-center gap-1 justify-end">
                                            <span className="text-green-400">▲ +23</span> PR
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Activity Feed */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Zap className="w-6 h-6 text-purple-400" />
                                Recent Battles
                            </h2>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Feed</span>
                        </div>
                        <div className="space-y-4 relative">
                            <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-800" />
                            {[
                                { type: 'win', opp: '@john', topic: 'Arrays', time: '2m ago' },
                                { type: 'loss', opp: '@sarah', topic: 'DP', time: '15m ago' },
                                { type: 'win', opp: '@mike', topic: 'Strings', time: '1h ago' }
                            ].map((act, idx) => (
                                <div key={idx} className="relative pl-12">
                                    <div className={`absolute left-4 top-1 w-4 h-4 rounded-full border-4 border-slate-950 z-10 ${act.type === 'win' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <div className="bg-slate-900/30 border border-slate-800/50 p-4 rounded-xl hover:bg-slate-900/50 transition-all group">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-slate-300">
                                                <span className={act.type === 'win' ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                                                    {act.type === 'win' ? 'Victory' : 'Defeat'}
                                                </span> vs <span className="text-white font-bold group-hover:text-purple-400 transition-colors uppercase cursor-pointer">{act.opp}</span>
                                            </p>
                                            <span className="text-[10px] text-slate-500 font-bold uppercase">{act.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">Topic: {act.topic} Challenge</p>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest py-3 border border-dashed border-slate-800 rounded-xl hover:border-purple-500/50">
                                View Full Match History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
