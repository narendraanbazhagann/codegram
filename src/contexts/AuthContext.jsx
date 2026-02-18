import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('codegram_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const API_URL = 'http://localhost:5002/api/auth';

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                localStorage.setItem('codegram_user', JSON.stringify(data));
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: 'Server connection failed' };
        }
    };

    const signup = async (username, email, password) => {
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                localStorage.setItem('codegram_user', JSON.stringify(data));
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: 'Server connection failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('codegram_user');
    };

    const updateProfile = async (updatedData) => {
        // Local update for now, can be connected to API later
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('codegram_user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
