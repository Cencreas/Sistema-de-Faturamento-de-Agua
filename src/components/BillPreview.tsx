import React from 'react';
import { Download } from 'lucide-react';
import { WaterBill } from '../types';

interface BillPreviewProps {
  bill: WaterBill;
  isDarkMode: boolean;
  onDownload: () => void;
}

export function BillPreview({ bill, isDarkMode, onDownload }: BillPreviewProps) {
  return (
    <div className={`border rounded-xl p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Fatura de Água
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Nº {bill.invoiceNumber}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {bill.month}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Emissão: {bill.issueDate}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="font-medium">Cliente:</span> {bill.customerName}
          </p>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="font-medium">Contador:</span> {bill.meterNumber}
          </p>
        </div>

        <div className={`grid grid-cols-2 gap-4 p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Leitura Atual
            </p>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {bill.currentReading} m³
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Leitura Anterior
            </p>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {bill.previousReading} m³
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Consumo
            </p>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {bill.consumption} m³
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Preço por m³
            </p>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {bill.ratePerCubicMeter} MT
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Valor do Consumo:</p>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {bill.amountDue.toFixed(2)} MT
            </p>
          </div>
          <div className="flex justify-between">
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Valor em Dívida:</p>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {bill.previousDebt.toFixed(2)} MT
            </p>
          </div>
          <div className="flex justify-between pt-2 border-t border-dashed">
            <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total a Pagar:</p>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              {bill.totalAmount.toFixed(2)} MT
            </p>
          </div>
        </div>

        <div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Valor por Extenso:
          </p>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {bill.numberToWords(bill.totalAmount)}
          </p>
        </div>

        <div className="flex justify-between items-end pt-4 border-t">
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Data Limite de Pagamento
            </p>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {bill.dueDate}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Funcionário
            </p>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {bill.reader}
            </p>
          </div>
        </div>

        <button
          onClick={onDownload}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            isDarkMode
              ? 'bg-green-600 text-white hover:bg-green-500 active:bg-green-700'
              : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'
          } transform hover:scale-105 active:scale-100`}
        >
          <Download className="w-5 h-5" />
          Baixar PDF
        </button>
      </div>
    </div>
  );
}