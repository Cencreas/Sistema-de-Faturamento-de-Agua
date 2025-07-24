import React, { useState } from 'react';
import { Droplets, Calculator, User, Hash, Clock, AlertCircle, HelpCircle } from 'lucide-react';

interface FormData {
  meterNumber: string;
  customerName: string;
  currentReading: string;
  previousReading: string;
  ratePerCubicMeter: string;
  previousDebt: string;
  reader: string;
}

interface BillFormProps {
  formData: FormData;
  isDarkMode: boolean;
  onFormChange: (data: FormData) => void;
}

interface TooltipProps {
  content: string;
  isDarkMode: boolean;
}

function Tooltip({ content, isDarkMode }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className={`p-1 rounded-full hover:bg-opacity-20 ${
          isDarkMode ? 'hover:bg-gray-300' : 'hover:bg-gray-500'
        }`}
        type="button"
      >
        <HelpCircle className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      </button>
      {isVisible && (
        <div className={`absolute z-10 w-64 p-2 text-sm rounded-lg shadow-lg left-6 -top-1 ${
          isDarkMode 
            ? 'bg-gray-800 text-gray-200 border border-gray-700' 
            : 'bg-white text-gray-700 border border-gray-200'
        }`}>
          {content}
          <div className={`absolute w-2 h-2 transform rotate-45 left-[-4px] top-[10px] ${
            isDarkMode 
              ? 'bg-gray-800 border-l border-b border-gray-700' 
              : 'bg-white border-l border-b border-gray-200'
          }`} />
        </div>
      )}
    </div>
  );
}

export function BillForm({ formData, isDarkMode, onFormChange }: BillFormProps) {
  const inputClass = `w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
    isDarkMode 
      ? 'border-gray-700 bg-gray-800 text-white' 
      : 'border-gray-300 bg-white text-gray-900'
  }`;

  const labelClass = `block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Número do Contador
            <Tooltip 
              isDarkMode={isDarkMode} 
              content="Insira o número de identificação único do contador de água do cliente. Este número pode ser encontrado no próprio contador ou em faturas anteriores."
            />
          </div>
        </label>
        <input
          type="text"
          value={formData.meterNumber}
          onChange={(e) => onFormChange({...formData, meterNumber: e.target.value})}
          className={inputClass}
          placeholder="Ex: 123456"
        />
      </div>

      <div>
        <label className={labelClass}>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Exmo(a) Sr.(a)
            <Tooltip 
              isDarkMode={isDarkMode} 
              content="Digite o nome completo do cliente responsável pela conta de água."
            />
          </div>
        </label>
        <input
          type="text"
          value={formData.customerName}
          onChange={(e) => onFormChange({...formData, customerName: e.target.value})}
          className={inputClass}
          placeholder="Nome completo"
        />
      </div>

      <div>
        <label className={labelClass}>
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Contato N°
            <Tooltip 
              isDarkMode={isDarkMode} 
              content="Digite o número de contato do cliente (telefone ou celular)."
            />
          </div>
        </label>
        <input
          type="text"
          value={formData.contactNumber || ''}
          onChange={(e) => onFormChange({...formData, contactNumber: e.target.value})}
          className={inputClass}
          placeholder="Ex: +258 84 123 4567"
        />
      </div>

      <div>
        <label className={labelClass}>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            Leitura Atual (m³)
            <Tooltip 
              isDarkMode={isDarkMode} 
              content="Registre a leitura atual do contador em metros cúbicos (m³). Este valor deve ser maior que a leitura anterior."
            />
          </div>
        </label>
        <input
          type="number"
          value={formData.currentReading}
          onChange={(e) => onFormChange({...formData, currentReading: e.target.value})}
          className={inputClass}
          placeholder="Ex: 150"
        />
      </div>

      <div>
        <label className={labelClass}>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Leitura Anterior (m³)
            <Tooltip 
              isDarkMode={isDarkMode} 
              content="Insira a leitura anterior do contador em metros cúbicos (m³). Este valor deve ser menor que a leitura atual."
            />
          </div>
        </label>
        <input
          type="number"
          value={formData.previousReading}
          onChange={(e) => onFormChange({...formData, previousReading: e.target.value})}
          className={inputClass}
          placeholder="Ex: 120"
        />
      </div>

      <div>
        <label className={labelClass}>
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Preço por m³ (MT)
            <Tooltip 
              isDarkMode={isDarkMode} 
              content="Digite o valor cobrado por metro cúbico de água em Meticais (MT). Este valor será usado para calcular o custo total do consumo."
            />
          </div>
        </label>
        <input
          type="number"
          value={formData.ratePerCubicMeter}
          onChange={(e) => onFormChange({...formData, ratePerCubicMeter: e.target.value})}
          className={inputClass}
          placeholder="Insira o preço por m³"
        />
      </div>

      <div>
        <label className={labelClass}>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Valor em Dívida (MT)
            <Tooltip 
              isDarkMode={isDarkMode} 
              content="Se houver alguma dívida pendente de faturas anteriores, insira o valor em Meticais (MT). Deixe 0 se não houver dívidas."
            />
          </div>
        </label>
        <input
          type="number"
          value={formData.previousDebt}
          onChange={(e) => onFormChange({...formData, previousDebt: e.target.value})}
          className={inputClass}
          placeholder="Ex: 0"
        />
      </div>

      <div>
        <label className={labelClass}>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Nome do Funcionário
            <Tooltip 
              isDarkMode={isDarkMode} 
              content="Digite o nome do funcionário responsável pela leitura do contador e emissão desta fatura."
            />
          </div>
        </label>
        <input
          type="text"
          value={formData.reader}
          onChange={(e) => onFormChange({...formData, reader: e.target.value})}
          className={inputClass}
          placeholder="Nome do responsável"
        />
      </div>
    </div>
  );
}