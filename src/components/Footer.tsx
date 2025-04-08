import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
}

export function Footer({ isDarkMode }: FooterProps) {
  return (
    <>
      <p className={`text-center text-sm mt-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        Sistema de Faturação de Água - Gestão eficiente do consumo
      </p>
      
      <p className={`text-center text-sm mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        Desenvolvido por <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          Cêncreas Livinguiston Cossa
        </span>
      </p>
    </>
  );
}