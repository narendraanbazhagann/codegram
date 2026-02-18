import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Code2, Trophy, Users, Github, User, LogOut, Bell,
    MessageSquare, Settings, Layout as LayoutIcon,
    Swords, Sparkles, Brain, Menu, X, ChevronRight,
    HelpCircle, BarChart3, Target, Flame
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from './Toasts';

const Layout = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { currentTheme, setCurrentTheme, themes, reduceMotion, setReduceMotion } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    useEffect(() => {
        const handleConnect = () => setIsSocketConnected(true);
        const handleDisconnect = () => setIsSocketConnected(false);

        import('../services/socket').then(({ socket }) => {
            setIsSocketConnected(socket.connected);
            socket.on('connect', handleConnect);
            socket.on('disconnect', handleDisconnect);
        });

        return () => {
            import('../services/socket').then(({ socket }) => {
                socket.off('connect', handleConnect);
                socket.off('disconnect', handleDisconnect);
            });
        };
    }, []);

    const addToast = (type, message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, message }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // Experience: Sequential load animations and demo toasts (DISABLED per user request)
    /* useEffect(() => {
        if (isAuthenticated) {
            const sequence = [
                { delay: 1500, type: 'info', msg: `Welcome back, @${user.username}!` },
                { delay: 3500, type: 'battle', msg: 'Daily Challenge is ready. Earn 50 bonus pts!' },
                { delay: 6000, type: 'friend', msg: '@sarah sent you a challenge invite.' }
            ];

            sequence.forEach(item => {
                setTimeout(() => addToast(item.type, item.msg), item.delay);
            });
        }
    }, [isAuthenticated, user?.username]); */

    const handleLogout = () => {
        logout();
        navigate('/');
        setShowUserMenu(false);
    };

    const sidebarItems = [
        { icon: <LayoutIcon className="w-5 h-5" />, label: 'Dashboard', path: '/' },
        { icon: <Swords className="w-5 h-5" />, label: 'Battle Arena', path: '/lobby' },
        { icon: <Sparkles className="w-5 h-5" />, label: 'Practice', path: '/practice' },
        { icon: <Trophy className="w-5 h-5" />, label: 'Leaderboard', path: '/leaderboard' },
        { icon: <Users className="w-5 h-5" />, label: 'Community', path: '/community' },
        { icon: <BarChart3 className="w-5 h-5" />, label: 'Statistics', path: '/stats' },
        { icon: <Target className="w-5 h-5" />, label: 'Achievements', path: '/achievements' },
    ];

    const notifications = [
        { id: 1, type: 'match', text: 'Match found! Opponent ready.', time: '2m ago' },
        { id: 2, type: 'friend', text: '@john just went online.', time: '15m ago' },
        { id: 3, type: 'achievement', text: 'Unlocked "First Victory"!', time: '1h ago' }
    ];

    return (
        <div className={`min-h-screen bg-transparent text-slate-200 font-sans ${reduceMotion ? '' : 'selection:bg-purple-500/30'}`}>
            {/* Sidebar Navigation */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.aside
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            className="fixed top-0 left-0 h-full w-80 bg-slate-900/95 backdrop-blur-2xl border-r border-slate-800 z-[70] shadow-2xl flex flex-col"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-slate-800/50">
                                <Link to="/" className="flex items-center space-x-2">
                                    <div className="p-2 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-lg shadow-lg shadow-purple-500/20">
                                        <Code2 className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xl font-black text-white tracking-tighter">Codegram</span>
                                </Link>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-xl">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                                {sidebarItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`flex items-center justify-between p-3.5 rounded-2xl transition-all group ${location.pathname === item.path
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 transition-all ${location.pathname === item.path ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                                    </Link>
                                ))}

                                <div className="mt-8 px-4">
                                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Themes</h5>
                                    <div className="grid grid-cols-5 gap-2">
                                        {Object.entries(themes).map(([key, theme]) => (
                                            <button
                                                key={key}
                                                onClick={() => setCurrentTheme(key)}
                                                title={theme.name}
                                                className={`w-full aspect-square rounded-full border-2 transition-all p-0.5 ${currentTheme === key ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                            >
                                                <div
                                                    className="w-full h-full rounded-full"
                                                    style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-800/50 space-y-4">
                                <div className="flex items-center justify-between px-2 mb-4">
                                    <span className="text-xs font-bold text-slate-400">Reduce Motion</span>
                                    <button
                                        onClick={() => setReduceMotion(!reduceMotion)}
                                        className={`w-10 h-5 rounded-full relative transition-colors ${reduceMotion ? 'bg-purple-600' : 'bg-slate-700'}`}
                                    >
                                        <motion.div
                                            animate={{ x: reduceMotion ? 22 : 2 }}
                                            className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-sm"
                                        />
                                    </button>
                                </div>
                                <Link to="/settings" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                                    <Settings className="w-5 h-5" />
                                    <span className="font-bold">Settings</span>
                                </Link>
                                <Link to="/help" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                                    <HelpCircle className="w-5 h-5" />
                                    <span className="font-bold">Help & Tutorial</span>
                                </Link>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Navbar */}
            <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-800/50 rounded-lg lg:hidden"
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            <Link to="/" className="flex items-center space-x-2 group">
                                <div className="p-2 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-lg group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
                                    <Code2 className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent hidden sm:block">
                                    Codegram
                                </span>
                                {isSocketConnected && (
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" title="Real-time connected" />
                                )}
                            </Link>

                            <div className="hidden lg:flex items-center space-x-1 ml-4 py-1.5 px-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                                {sidebarItems.slice(0, 5).map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${location.pathname === item.path
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 sm:space-x-6">
                            {isAuthenticated && (
                                <>
                                    <Link to="/lobby" className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20 group">
                                        <Swords className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                        <span>⚡ QUICK MATCH</span>
                                    </Link>

                                    <div className="flex items-center gap-1 sm:gap-2 border-l border-slate-800 pl-4 sm:pl-6">
                                        <button className="p-2 text-slate-400 hover:text-white transition-colors relative group">
                                            <Users className="w-5 h-5" />
                                            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-slate-950" />
                                            <div className="absolute top-full mt-2 right-0 bg-slate-900 border border-slate-800 rounded-lg p-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap text-[10px] font-bold z-50">
                                                8 Friends Online
                                            </div>
                                        </button>

                                        {/* Notifications Disabled */}
                                    </div>
                                </>
                            )}

                            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-3 text-sm font-medium text-slate-300 hover:text-white transition-all bg-slate-900/50 border border-slate-800/50 pr-4 pl-1.5 py-1.5 rounded-xl hover:border-slate-700 active:scale-95"
                                    >
                                        <div className="relative">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-purple-500/20">
                                                {user?.username?.[0]?.toUpperCase() || 'U'}
                                            </div>
                                            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950" />
                                        </div>
                                        <div className="text-left hidden sm:block">
                                            <p className="text-xs font-black text-white leading-none">@{user?.username}</p>
                                            <p className="text-[10px] text-purple-400 font-bold mt-1 leading-none uppercase tracking-tighter">Gold Tier</p>
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {showUserMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xll py-3 z-50 overflow-hidden px-2"
                                            >
                                                <div className="px-3 py-2 mb-2">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Account</p>
                                                </div>
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 hover:bg-purple-500/10 hover:text-purple-300 rounded-xl transition-all group"
                                                >
                                                    <User className="w-4 h-4" />
                                                    <span className="font-bold">My Profile</span>
                                                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                </Link>
                                                <Link
                                                    to="/stats"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 hover:bg-pink-500/10 hover:text-pink-300 rounded-xl transition-all group"
                                                >
                                                    <BarChart3 className="w-4 h-4" />
                                                    <span className="font-bold">My Statistics</span>
                                                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all group"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    <span className="font-bold">Settings</span>
                                                </Link>
                                                <div className="h-px bg-slate-800/50 my-2 mx-1" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span className="font-bold">Logout</span>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link to="/login" className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
                                        Sign In
                                    </Link>
                                    <Link to="/signup" className="hidden sm:block bg-white text-slate-950 px-5 py-2 rounded-xl text-sm font-black hover:bg-purple-50 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5">
                                        GET STARTED
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative">
                <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
                <div className="relative z-10 w-full max-w-[1400px] mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Global Footer */}
            <footer className="border-t border-slate-900 bg-slate-950/30 backdrop-blur-md py-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <div className="p-2 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-lg">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Codegram</span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            The ultimate 1v1 coding arena. Prove your algorithmic superiority and climb the global ranks.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><Link to="/lobby" className="hover:text-purple-400 transition-colors">Battle Arena</Link></li>
                            <li><Link to="/leaderboard" className="hover:text-purple-400 transition-colors">Leaderboards</Link></li>
                            <li><Link to="/practice" className="hover:text-purple-400 transition-colors">Practice Problems</Link></li>
                            <li><Link to="/community" className="hover:text-purple-400 transition-colors">Community Feed</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><Link to="/help" className="hover:text-purple-400 transition-colors">Help Center</Link></li>
                            <li><Link to="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/30 transition-all"><Github className="w-5 h-5" /></a>
                            <a href="#" className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/30 transition-all"><MessageSquare className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 pt-12 border-t border-slate-900/50 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                    © 2024 Codegram • Built with passion for the developer community.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
