import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useFinance } from '../context/FinanceContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SimulationParams, SimulationResult } from '../types/finance';
import { runFinancialSimulation } from '../utils/financialCalculations';

export function AdvancedSimulation() {
  const navigate = useNavigate();
  const { themeColors } = useTheme();
  const { financialData } = useFinance();

  const [params, setParams] = useState<SimulationParams>({
    name: 'Simulation 1',
    incomeGrowth: 2,
    expenseReduction: 1,
    savingsRate: 50,
    investmentReturn: 5,
    inflationRate: 2,
    years: 10,
  });

  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleRunSimulation = () => {
    if (financialData) {
      const simulationResult = runFinancialSimulation(financialData, params);
      setResult(simulationResult);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-20 p-4">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Simulations Avancées</h1>
        <p className={`${themeColors?.textSecondary || 'text-gray-400'}`}>
          Explorez différents scénarios pour votre avenir financier.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-1 p-6" animate>
          <h2 className="text-xl font-semibold mb-4">Paramètres de la simulation</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Croissance annuelle du revenu (%)</label>
              <input
                type="number"
                name="incomeGrowth"
                value={params.incomeGrowth}
                onChange={handleParamChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Réduction annuelle des dépenses (%)</label>
              <input
                type="number"
                name="expenseReduction"
                value={params.expenseReduction}
                onChange={handleParamChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Taux d'épargne (%)</label>
              <input
                type="number"
                name="savingsRate"
                value={params.savingsRate}
                onChange={handleParamChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Rendement annuel des investissements (%)</label>
              <input
                type="number"
                name="investmentReturn"
                value={params.investmentReturn}
                onChange={handleParamChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Taux d'inflation annuel (%)</label>
              <input
                type="number"
                name="inflationRate"
                value={params.inflationRate}
                onChange={handleParamChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Nombre d'années à simuler</label>
              <input
                type="number"
                name="years"
                value={params.years}
                onChange={handleParamChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white"
              />
            </div>
            <button
              onClick={handleRunSimulation}
              className={`w-full py-2 rounded-lg bg-gradient-to-r ${themeColors?.primary || 'from-indigo-500 to-purple-600'} hover:opacity-90 text-white`}
            >
              Lancer la simulation
            </button>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2 p-6" animate>
          <h2 className="text-xl font-semibold mb-4">Résultats de la simulation</h2>
          {result ? (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.netWorth.map((value, index) => ({ name: result.years[index], 'Valeur Nette': value }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip
                    formatter={(value) => [`${value.toLocaleString('fr-FR')}€`, 'Valeur Nette']}
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Valeur Nette" stroke={themeColors?.chartColors?.[0] || '#8884d8'} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-400">Lancez une simulation pour voir les résultats.</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
