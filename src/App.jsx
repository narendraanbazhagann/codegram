import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import BattleArena from './pages/BattleArena';
import Results from './pages/Results';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Practice from './pages/Practice';
import LiveBattles from './pages/LiveBattles';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Achievements from './pages/Achievements';
import Informational from './pages/Informational';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppContent() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Auth Routes - No Layout */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Main App Routes - With Layout */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Home />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="lobby" element={<Lobby />} />
                        <Route path="leaderboard" element={<Leaderboard />} />
                        <Route path="practice" element={<Practice />} />
                        <Route path="live-battles" element={<LiveBattles />} />
                        <Route path="stats" element={<Statistics />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="achievements" element={<Achievements />} />
                        <Route path="community" element={<Informational />} />
                        <Route path="help" element={<Informational />} />
                        <Route path="terms" element={<Informational />} />
                        <Route path="privacy" element={<Informational />} />
                        <Route path="battle/:id" element={<BattleArena />} />
                        <Route path="results/:id" element={<Results />} />
                    </Route>

                    {/* Default Route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

import { ThemeProvider } from './contexts/ThemeContext';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <AppContent />
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
