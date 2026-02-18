import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Shield, Eye, Palette, Terminal, Globe, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
    const { currentTheme, setCurrentTheme, themes, reduceMotion, setReduceMotion } = useTheme();

    return (
        <div className="min-h-screen px-4 py-12 pb-24 text-left">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full mb-4"
                    >
                        <SettingsIcon className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Preferences</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-black text-white mb-4 uppercase tracking-tighter"
                    >
                        Settings
                    </motion.h1>
                    <p className="text-slate-400 text-lg">Customize your experience, theme, and account preferences.</p>
                </header>

                <div className="space-y-6">
                    {/* Appearance */}
                    <section className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <Palette className="w-5 h-5 text-purple-400" />
                            Appearance
                        </h3>

                        <div className="space-y-8">
                            <div>
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-4">Choose Theme</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                    {Object.entries(themes).map(([key, theme]) => (
                                        <button
                                            key={key}
                                            onClick={() => setCurrentTheme(key)}
                                            className={`p-3 rounded-2xl border-2 transition-all text-center ${currentTheme === key ? 'border-purple-500 bg-purple-500/10' : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'}`}
                                        >
                                            <div
                                                className="w-full aspect-video rounded-lg mb-3"
                                                style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                                            />
                                            <span className={`text-[10px] font-black uppercase tracking-tight ${currentTheme === key ? 'text-purple-400' : 'text-slate-500'}`}>{theme.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                                <div>
                                    <p className="text-sm font-bold text-white uppercase tracking-tight">Reduce Motion</p>
                                    <p className="text-xs text-slate-500 mt-1">Disable complex animations for better performance</p>
                                </div>
                                <button
                                    onClick={() => setReduceMotion(!reduceMotion)}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${reduceMotion ? 'bg-purple-600' : 'bg-slate-800'}`}
                                >
                                    <motion.div
                                        animate={{ x: reduceMotion ? 26 : 2 }}
                                        className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-lg"
                                    />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Editor Settings */}
                    <section className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <Terminal className="w-5 h-5 text-indigo-400" />
                            Code Editor
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: "Auto-complete", desc: "Show intelligent suggestions while typing", active: true },
                                { label: "Vim Mode", desc: "Enable Vim keybindings in the editor", active: false },
                                { label: "Minimap", desc: "Show code overview on the right side", active: true },
                                { label: "Line Numbers", desc: "Display numbers on the left gutter", active: true },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase tracking-tight">{item.label}</p>
                                        <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
                                    </div>
                                    <button className={`w-12 h-6 rounded-full relative transition-colors ${item.active ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                                        <div className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-lg transition-transform ${item.active ? 'translate-x-[26px]' : 'translate-x-[2px]'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Account Security */}
                    <section className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <Shield className="w-5 h-5 text-pink-400" />
                            Privacy & Security
                        </h3>
                        <div className="space-y-4">
                            {[
                                { icon: <Globe className="w-4 h-4" />, label: "Public Profile", desc: "Allow others to see your stats and solutions" },
                                { icon: <Eye className="w-4 h-4" />, label: "Spectator Mode", desc: "Allow people to watch your live matches" },
                                { icon: <Bell className="w-4 h-4" />, label: "Email Notifications", desc: "Receive weekly performance reports" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-900 rounded-lg text-slate-400">{item.icon}</div>
                                        <div>
                                            <p className="text-sm font-bold text-white uppercase tracking-tight">{item.label}</p>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </div>
                                    </div>
                                    <button className="w-12 h-6 rounded-full relative bg-pink-600">
                                        <div className="absolute top-1 left-[26px] w-4 h-4 bg-white rounded-full shadow-lg" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="mt-12 flex justify-end gap-4">
                    <button className="px-8 py-3 bg-slate-800 text-slate-400 font-bold rounded-xl hover:text-white transition-all">Cancel</button>
                    <button
                        onClick={() => alert('Settings saved successfully!')}
                        className="px-8 py-3 bg-purple-600 text-white font-black rounded-xl hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20 uppercase text-xs tracking-widest"
                    >
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
