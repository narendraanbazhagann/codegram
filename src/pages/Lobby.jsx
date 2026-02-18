import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Cpu, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { socket, connectSocket } from '../services/socket';
import { useAuth } from '../contexts/AuthContext';

const Lobby = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSearching, setIsSearching] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('Arrays');
    const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');

    useEffect(() => {
        if (user) connectSocket(user._id);

        socket.on('match-found', (data) => {
            setIsSearching(false);
            navigate(`/battle/${data.battleId}`, { state: { opponent: data.opponent } });
        });

        return () => {
            socket.off('match-found');
        };
    }, [user, navigate]);

    const handleDetailedMatchmaking = () => {
        setIsSearching(true);
        socket.emit('join-queue', {
            topic: selectedTopic,
            difficulty: selectedDifficulty,
            user: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar
            }
        });
    };

    const cancelMatchmaking = () => {
        setIsSearching(false);
        socket.emit('leave-queue', {
            topic: selectedTopic,
            difficulty: selectedDifficulty,
            userId: user._id
        });
    };

    return (
        <div className="min-h-[calc(100vh-65px)] flex items-center justify-center p-4 relative">

            {/* Matchmaking Overlay */}
            <AnimatePresence>
                {isSearching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center"
                    >
                        <div className="w-24 h-24 relative mb-8">
                            <span className="absolute inset-0 border-4 border-slate-800 rounded-full"></span>
                            <span className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Finding Opponent...</h2>
                        <p className="text-slate-400">Estimated wait: 12s</p>
                        <button
                            onClick={cancelMatchmaking}
                            className="mt-8 px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                            Cancel Match
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Quick Play */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-purple-950 rounded-lg flex items-center justify-center mb-6 border border-purple-900/50">
                            <Globe className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Ranked Match</h2>
                        <p className="text-slate-400 mb-8">
                            Compete globally to increase your ELO rating. We'll match you with someone of similar skill.
                        </p>

                        <button
                            onClick={handleDetailedMatchmaking}
                            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Search className="w-5 h-5" />
                            <span>Find Match</span>
                        </button>
                    </div>
                </div>

                {/* Right: Custom Lobby Settings */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-purple-400" />
                        Match Settings
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-slate-400 mb-2 block">Topic</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Arrays', 'Strings', 'DP', 'Trees', 'Graphs', 'Math'].map((topic) => (
                                    <button
                                        key={topic}
                                        onClick={() => setSelectedTopic(topic)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${selectedTopic === topic
                                            ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                                            }`}
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-400 mb-2 block">Difficulty</label>
                            <div className="flex gap-2">
                                {['Easy', 'Medium', 'Hard'].map((diff) => (
                                    <button
                                        key={diff}
                                        onClick={() => setSelectedDifficulty(diff)}
                                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${selectedDifficulty === diff
                                            ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                                            }`}
                                    >
                                        {diff}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-slate-400 text-sm">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Est. Wait: &lt; 30s</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span>1,204 Online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lobby;
