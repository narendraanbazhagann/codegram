import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, HelpCircle, FileText, ShieldAlert } from 'lucide-react';

const Informational = () => {
    const location = useLocation();
    const path = location.pathname.substring(1);

    const configs = {
        community: {
            title: "Community Hub",
            icon: <MessageSquare className="w-12 h-12 text-purple-400" />,
            desc: "Connect with thousands of developers, share solutions, and join discussion groups.",
            placeholderText: "Our community features are currently in private beta for Master-tier players. Join the waitlist to be notified when we expand access."
        },
        help: {
            title: "Help Center",
            icon: <HelpCircle className="w-12 h-12 text-indigo-400" />,
            desc: "Everything you need to know about using Codegram, from battle rules to editor shortcuts.",
            placeholderText: "We're currently updating our documentation to reflect the 1.0 Public Beta changes. If you need immediate assistance, please join our Discord server."
        },
        terms: {
            title: "Terms of Service",
            icon: <FileText className="w-12 h-12 text-slate-400" />,
            desc: "The legal guidelines for using our platform.",
            placeholderText: "Last updated: Feb 18, 2026. By using Codegram, you agree to follow our competitive integrity policy. Cheating, using AI assistants during ranked matches, or harassment will lead to immediate account suspension."
        },
        privacy: {
            title: "Privacy Policy",
            icon: <ShieldAlert className="w-12 h-12 text-pink-400" />,
            desc: "How we handle your data and protect your privacy.",
            placeholderText: "Your code is your own. We only collect performance data and profile information to improve matchmaking and maintain the global leaderboard. We never sell your personal information."
        }
    };

    const config = configs[path] || configs.help;

    return (
        <div className="min-h-screen px-4 py-12 pb-24 text-left">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Back to Arena</span>
                </Link>

                <header className="mb-16">
                    <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center border border-slate-800 mb-8 shadow-2xl">
                        {config.icon}
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-6xl font-black text-white mb-6 uppercase tracking-tighter"
                    >
                        {config.title}
                    </motion.h1>
                    <p className="text-slate-400 text-xl leading-relaxed">{config.desc}</p>
                </header>

                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                    <p className="text-slate-300 text-lg leading-relaxed font-medium">
                        {config.placeholderText}
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row gap-4">
                        <button className="px-8 py-4 bg-white text-slate-950 font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/5 uppercase text-xs tracking-widest">
                            {path === 'community' ? 'Join Waitlist' : 'Contact Support'}
                        </button>
                        <button className="px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all uppercase text-xs tracking-widest">
                            Join Discord
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Informational;
