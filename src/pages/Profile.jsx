import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, User, Mail, Camera, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        bio: user?.bio || '',
        avatar: user?.avatar || ''
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setIsEditing(false);
        // Show success message
        alert('Profile updated successfully!');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Home</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Profile Header */}
                    <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl mb-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8 gap-6">
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
                                {/* Avatar */}
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-purple-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                        {formData.username ? formData.username[0].toUpperCase() : 'U'}
                                    </div>
                                    <span className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-slate-900 rounded-full" />
                                    {isEditing && (
                                        <button className="absolute inset-0 flex items-center justify-center bg-slate-900/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="w-8 h-8 text-white" />
                                        </button>
                                    )}
                                </div>

                                {/* User Info */}
                                <div>
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <h1 className="text-4xl font-black text-white">
                                            {formData.username}
                                        </h1>
                                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] font-black uppercase rounded border border-purple-500/30">Gold Tier</span>
                                    </div>
                                    <p className="text-slate-400 font-medium">{formData.email}</p>
                                    <p className="text-slate-500 text-sm mt-2 italic">"{formData.bio || 'No bio yet...'}"</p>
                                </div>
                            </div>

                            {/* Edit Button */}
                            <div className="flex gap-3">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-2xl hover:bg-slate-700 hover:border-slate-600 transition-all active:scale-95"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/50">
                            {[
                                { label: 'Battles Won', val: '42', color: 'text-green-400' },
                                { label: 'Total Battles', val: '128', color: 'text-purple-400' },
                                { label: 'ELO Rating', val: '2240', color: 'text-pink-400', sub: 'Top 5%' },
                                { label: 'Win Rate', val: '72%', color: 'text-indigo-400' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-slate-950/30 p-4 rounded-2xl border border-slate-800/30">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className="flex items-end gap-2">
                                        <span className={`text-2xl font-black ${stat.color}`}>{stat.val}</span>
                                        {stat.sub && <span className="text-[10px] text-slate-600 font-bold mb-1 uppercase">{stat.sub}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-black text-white mb-8">Personal Details</h2>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Username */}
                                <div>
                                    <label htmlFor="username" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 pl-1">
                                        Display Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all disabled:opacity-50"
                                            placeholder="johndoe"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 pl-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all disabled:opacity-50"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label htmlFor="bio" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 pl-1">
                                    About You
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    rows="4"
                                    className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all disabled:opacity-50 resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            {/* Save Button */}
                            {isEditing && (
                                <button
                                    type="submit"
                                    className="w-full py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-black rounded-2xl hover:shadow-[0_20px_40px_rgba(168,85,247,0.3)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center space-x-3 uppercase tracking-widest"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>Update Profile</span>
                                </button>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
