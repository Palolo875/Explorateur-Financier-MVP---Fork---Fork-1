import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useFinanceStore } from '../stores/financeStore';
import { toast, Toaster } from 'react-hot-toast';
import { LogInIcon } from 'lucide-react';

export function LoginScreen() {
  const navigate = useNavigate();
  const { themeColors } = useTheme();
  const { login } = useFinanceStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    const user = { id: '1', email, name: 'Test User' };
    const token = 'fake-jwt-token';
    login(user, token);
    toast.success('Connexion réussie !');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <GlassCard className="p-8" animate>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-6">Connexion</h1>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 rounded-lg bg-gradient-to-r ${themeColors?.primary || 'from-indigo-500 to-purple-600'} hover:opacity-90 text-white flex items-center justify-center`}
              >
                <LogInIcon className="h-4 w-4 mr-2" />
                Se connecter
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm">
              Pas encore de compte ?{' '}
              <button onClick={() => navigate('/register')} className="text-indigo-400 hover:underline">
                S'inscrire
              </button>
            </p>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  );
}
