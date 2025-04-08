import React from 'react';
import { Receipt } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function Header({ isDarkMode, onThemeToggle }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Receipt className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Sistema de Faturação de Água
        </h1>
      </div>
      <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
    </div>
  );
}