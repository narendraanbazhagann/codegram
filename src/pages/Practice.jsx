import { motion } from 'framer-motion';
import { Sparkles, Terminal, Code2, CheckCircle2, ChevronRight, Search, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

const Practice = () => {
    const categories = [
        { name: "Top Interview 150", count: 150, progress: 12 },
        { name: "LeetCode 75", count: 75, progress: 45 },
        { name: "Dynamic Programming", count: 32, progress: 5 },
        { name: "System Design", count: 20, progress: 0 },
    ];

    const problems = [
        { id: 1, title: "Two Sum", topic: "Arrays", difficulty: "Easy", solved: true, acceptance: "49.6%" },
        { id: 2, title: "Add Two Numbers", topic: "Linked Lists", difficulty: "Medium", solved: false, acceptance: "41.2%" },
        { id: 3, title: "Longest Substring", topic: "Strings", difficulty: "Medium", solved: true, acceptance: "34.5%" },
        { id: 4, title: "Median of Two Arrays", topic: "Divide & Conquer", difficulty: "Hard", solved: false, acceptance: "37.8%" },
        { id: 5, title: "Reverse Integer", topic: "Math", difficulty: "Medium", solved: false, acceptance: "28.1%" },
        { id: 6, title: "Palindrome Number", topic: "Math", difficulty: "Easy", solved: false, acceptance: "54.3%" },
        { id: 7, title: "Vaild Parentheses", topic: "Stacks", difficulty: "Easy", solved: true, acceptance: "40.9%" },
    ];

    const getDifficultyColor = (diff) => {
        switch (diff.toLowerCase()) {
            case 'easy': return 'text-green-400 bg-green-400/10 border-green-500/20';
            case 'medium': return 'text-yellow-500 bg-yellow-400/10 border-yellow-500/20';
            case 'hard': return 'text-red-500 bg-red-400/10 border-red-500/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-500/20';
        }
    };

    return (
        <div className="min-h-screen px-4 py-12 pb-24">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4"
                            >
                                <Sparkles className="w-3 h-3 text-purple-400" />
                                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Solo Training</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl font-black text-white mb-4"
                            >
                                Practice Arena
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-400 text-lg max-w-xl"
                            >
                                Master your skills without the pressure of a timer. Solve hundreds of curated algorithmic challenges.
                            </motion.p>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl flex items-center gap-4 min-w-[200px]">
                                <div className="p-3 bg-green-500/20 rounded-xl">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Solved</p>
                                    <p className="text-2xl font-black text-white">142<span className="text-sm text-slate-500 font-medium whitespace-nowrap"> / 1,200</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Categories */}
                    <aside className="lg:col-span-1 space-y-4">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest pl-2 mb-4">Study Plans</h3>
                        {categories.map((cat, idx) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={cat.name}
                                className="group p-5 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl hover:border-purple-500/30 transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <h4 className="text-white font-bold mb-3 group-hover:text-purple-300 transition-colors uppercase tracking-tight">{cat.name}</h4>
                                    <div className="flex items-center justify-between text-[10px] font-black text-slate-500 tracking-widest mb-2">
                                        <span>PROGRESS</span>
                                        <span>{Math.round((cat.progress / cat.count) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-purple-500 h-full" style={{ width: `${(cat.progress / cat.count) * 100}%` }} />
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Terminal className="w-12 h-12 text-purple-400 rotate-12" />
                                </div>
                            </motion.div>
                        ))}
                    </aside>

                    {/* Problem List */}
                    <main className="lg:col-span-3">
                        <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                            {/* Toolbar */}
                            <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/50">
                                <div className="relative w-full md:w-96">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Search by title..."
                                        className="w-full pl-10 pr-4 py-2 bg-slate-950/50 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                                    />
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none px-4 py-2 bg-slate-950/50 border border-slate-800 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Difficulty</button>
                                    <button className="flex-1 md:flex-none px-4 py-2 bg-slate-950/50 border border-slate-800 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Topic</button>
                                </div>
                            </div>

                            {/* List */}
                            <div className="divide-y divide-slate-800/50">
                                {problems.map((prob, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={prob.id}
                                        className="p-6 flex items-center justify-between hover:bg-slate-800/20 transition-colors group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${prob.solved ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-slate-950 border-slate-800 text-slate-700'}`}>
                                                {prob.solved ? <CheckCircle2 className="w-5 h-5" /> : <Terminal className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold group-hover:text-purple-400 transition-colors uppercase tracking-tight">{prob.id}. {prob.title}</h4>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${getDifficultyColor(prob.difficulty)}`}>
                                                        {prob.difficulty}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{prob.topic}</span>
                                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Acc: {prob.acceptance}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Link
                                                to={`/battle/${prob.id}`} // Using same editor page
                                                className="px-4 py-2 bg-slate-900 border border-slate-800 text-white text-xs font-black uppercase rounded-lg hover:bg-purple-600 hover:border-purple-400 transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2"
                                            >
                                                Solve <ChevronRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Practice;
