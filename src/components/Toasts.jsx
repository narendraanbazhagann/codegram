import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Swords, Trophy, Users, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ id, type, message, duration = 5000, onRemove }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(id);
        }, duration);
        return () => clearTimeout(timer);
    }, [id, duration, onRemove]);

    const icons = {
        battle: <Swords className="w-5 h-5 text-purple-400" />,
        achievement: <Trophy className="w-5 h-5 text-yellow-500" />,
        friend: <Users className="w-5 h-5 text-blue-400" />,
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        info: <Info className="w-5 h-5 text-indigo-400" />,
        warning: <AlertTriangle className="w-5 h-5 text-amber-500" />
    };

    const colors = {
        battle: 'border-purple-500/50 bg-purple-500/10',
        achievement: 'border-yellow-500/50 bg-yellow-500/10',
        friend: 'border-blue-500/50 bg-blue-500/10',
        success: 'border-green-500/50 bg-green-500/10',
        info: 'border-indigo-500/50 bg-indigo-500/10',
        warning: 'border-amber-500/50 bg-amber-500/10'
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-center gap-4 p-4 min-w-[320px] max-w-md rounded-2xl border backdrop-blur-xl shadow-2xl ${colors[type] || colors.info}`}
        >
            <div className={`p-2 rounded-xl bg-slate-950/50`}>
                {icons[type] || <Bell className="w-5 h-5 text-white" />}
            </div>
            <div className="flex-1">
                <p className="text-sm font-bold text-white leading-tight">{message}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Just Now</p>
            </div>
            <button
                onClick={() => onRemove(id)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors text-slate-500 hover:text-white"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

// Global hook/state management would be better, but for this demo 
// we'll expose a global function if needed or just use it in Layout.
export const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
            <div className="flex flex-col gap-3 pointer-events-auto">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <Toast key={toast.id} {...toast} onRemove={removeToast} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
