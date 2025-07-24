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
        <div className="text-center space-y-2 pb-6 border-b">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-xl ${
            isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            PS
          </div>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            PRESADA E SERVIÇOS
          </h1>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>Bairro de Ndiavel - Maputo</p>
            <p>Q 14 Casa N° 286</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              FATURA
            </p>
          </div>
          <div className="text-right">
            <p className="text-red-600 font-bold text-lg">
              {bill.invoiceNumber}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="font-medium">Exmo(a) Sr.(a):</span> {bill.customerName}
          </p>
          {bill.contactNumber && (
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="font-medium">Contato N°:</span> {bill.contactNumber}
            </p>
          )}
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="font-medium">Contador:</span> {bill.meterNumber}
          </p>
        </div>

        <div className={`border rounded-lg overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <table className="w-full">
            <thead>
              <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <th className={`p-3 text-left text-sm font-medium border-r ${isDarkMode ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'}`}>
                  LEITURAS (m³)
                </th>
                <th className={`p-3 text-center text-sm font-medium border-r ${isDarkMode ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'}`}>
                  Consumo (m³)
                </th>
                <th className={`p-3 text-center text-sm font-medium border-r ${isDarkMode ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'}`}>
                  Custo por (m³)
                </th>
                <th className={`p-3 text-center text-sm font-medium border-r ${isDarkMode ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'}`}>
                  Valor a pagar
                </th>
                <th className={`p-3 text-center text-sm font-medium border-r ${isDarkMode ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'}`}>
                  Valor em Dívida
                </th>
                <th className={`p-3 text-center text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Total a pagar
                </th>
              </tr>
              <tr className={`${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'}`}>
                <td className={`p-2 border-r ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <div className="flex justify-between text-xs">
                    <span>Atual: {bill.currentReading}</span>
                    <span>Anterior: {bill.previousReading}</span>
                  </div>
                </td>
                <td className={`p-2 text-center border-r ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  {bill.consumption}
                </td>
                <td className={`p-2 text-center border-r ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  {bill.ratePerCubicMeter} MT
                </td>
                <td className={`p-2 text-center border-r ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  {bill.amountDue.toFixed(2)} MT
                </td>
                <td className={`p-2 text-center border-r ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  {bill.previousDebt.toFixed(2)} MT
                </td>
                <td className={`p-2 text-center font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {bill.totalAmount.toFixed(2)} MT
                </td>
              </tr>
            </thead>
          </table>
        </div>

        <div className="space-y-4">
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Último dia do pagamento: 
              <span className={`ml-2 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {bill.dueDate}
              </span>
            </p>
          </div>
          
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Valor por extenso:
            </p>
            <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {bill.numberToWords(bill.totalAmount)}
            </p>
          </div>
        </div>


        <div className="flex justify-end pt-4 border-t">
          <div className="text-right">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Assinatura do leitor
            </p>
            <p className={`mt-2 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {bill.reader}
            </p>
            <div className={`mt-2 w-32 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-400'}`}></div>
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