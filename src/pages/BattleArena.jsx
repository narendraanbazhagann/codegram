import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Play, RotateCcw, ArrowLeft, Trophy } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import ProblemCard from '../components/ProblemCard';
import { socket } from '../services/socket';
import { useAuth } from '../contexts/AuthContext';

const BattleArena = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { user } = useAuth();

    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('// Write your solution here\n');
    const [timeLeft, setTimeLeft] = useState(600);
    const [isRunning, setIsRunning] = useState(false);
    const [opponent, setOpponent] = useState(state?.opponent || null);
    const [opponentProgress, setOpponentProgress] = useState(0);
    const [myProgress, setMyProgress] = useState(0);

    useEffect(() => {
        // Fetch problem
        fetch(`http://localhost:5002/api/problems`)
            .then(res => res.json())
            .then(data => {
                // For demo, pick first problem or match by ID if we had real IDs
                const p = data[0];
                setProblem(p);
                setCode(p.templateCode);
            });

        // Socket logic
        socket.emit('join-battle', id);

        socket.on('opponent-progress', (data) => {
            setOpponentProgress(data.progress);
        });

        socket.on('battle-ended', (data) => {
            navigate(`/results/${id}`, { state: { winner: data.winner } });
        });

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => {
            clearInterval(timer);
            socket.off('opponent-progress');
            socket.off('battle-ended');
        };
    }, [id, navigate]);

    // Emit code changes (debounced or on every change for demo)
    useEffect(() => {
        socket.emit('code-update', { battleId: id, code });
    }, [code, id]);

    const handleRunCode = () => {
        setIsRunning(true);
        // Mocking test case passing for synchronization demo
        setTimeout(() => {
            setIsRunning(false);
            const newProgress = Math.min(myProgress + 33, 100);
            setMyProgress(newProgress);

            socket.emit('test-passed', {
                battleId: id,
                passedCount: newProgress === 100 ? 3 : (newProgress > 33 ? 2 : 1),
                totalCount: 3
            });

            if (newProgress === 100) {
                socket.emit('submit-solution', { battleId: id, success: true });
            }
        }, 1500);
    };

    return (
        <div className="h-[calc(100vh-65px)] flex flex-col bg-transparent">
            {/* Header */}
            <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/lobby')} className="text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-white font-bold">{problem?.title || 'Loading...'}</h1>
                        <span className="text-xs text-slate-400">Battle ID: #{id}</span>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className={`text-2xl font-mono font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-purple-400'}`}>
                        {formatTime(timeLeft)}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                                <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} className="w-8 h-8 rounded-full bg-slate-800" />
                                <span className="text-sm font-bold text-white">You</span>
                            </div>
                            <div className="w-24 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${myProgress}%` }} />
                            </div>
                        </div>
                        <span className="text-slate-600 font-black text-xs">VS</span>
                        <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-400">{opponent?.username || 'Opponent'}</span>
                                <img src={opponent?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=Opponent`} className="w-8 h-8 rounded-full bg-slate-800" />
                            </div>
                            <div className="w-24 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-pink-500 transition-all duration-500" style={{ width: `${opponentProgress}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors" title="Reset Code">
                        <RotateCcw className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRunning ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Play className="w-4 h-4 fill-current" />
                        )}
                        <span>Run</span>
                    </button>
                </div>
            </header>

            {/* Main Split Layout */}
            <div className="flex-1 flex overflow-hidden">
                <div className="w-1/3 p-4 border-r border-slate-800 bg-slate-900/30 overflow-y-auto">
                    {problem ? <ProblemCard problem={problem} /> : <div className="animate-pulse bg-slate-800 h-64 rounded-xl" />}
                </div>
                <div className="flex-1 p-4 bg-slate-950/20 backdrop-blur-sm">
                    <CodeEditor code={code} setCode={setCode} language="javascript" />
                </div>
            </div>
        </div>
    );
};

export default BattleArena;
