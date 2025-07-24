import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BillForm } from './components/BillForm';
import { BillPreview } from './components/BillPreview';
import { WaterBill } from './types';
import { generateInvoiceNumber, getCurrentMonth, getDueDate, numberToWords } from './utils/billUtils';
import { generatePDF } from './utils/pdfGenerator';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [bill, setBill] = useState<WaterBill | null>(null);
  const [formData, setFormData] = useState({
    meterNumber: '',
    customerName: '',
    contactNumber: '',
    currentReading: '',
    previousReading: '',
    ratePerCubicMeter: '',
    previousDebt: '0',
    reader: ''
  });
  const [error, setError] = useState<string>('');

  const calculateBill = () => {
    setError('');

    if (!formData.meterNumber || !formData.customerName || !formData.currentReading || 
        !formData.previousReading || !formData.ratePerCubicMeter || !formData.reader) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const currentReading = parseFloat(formData.currentReading);
    const previousReading = parseFloat(formData.previousReading);
    const ratePerCubicMeter = parseFloat(formData.ratePerCubicMeter);
    const previousDebt = parseFloat(formData.previousDebt || '0');

    if (currentReading < previousReading) {
      setError('A leitura atual não pode ser menor que a leitura anterior');
      return;
    }

    const consumption = currentReading - previousReading;
    const amountDue = consumption * ratePerCubicMeter;
    const totalAmount = amountDue + previousDebt;

    const newBill: WaterBill = {
      invoiceNumber: generateInvoiceNumber(),
      month: getCurrentMonth(),
      issueDate: new Date().toLocaleDateString('pt-BR'),
      meterNumber: formData.meterNumber,
      customerName: formData.customerName,
      contactNumber: formData.contactNumber || '',
      currentReading,
      previousReading,
      consumption,
      ratePerCubicMeter,
      amountDue,
      previousDebt,
      totalAmount,
      dueDate: getDueDate(),
      reader: formData.reader,
      numberToWords
    };

    setBill(newBill);
  };

  const resetForm = () => {
    setFormData({
      meterNumber: '',
      customerName: '',
      contactNumber: '',
      currentReading: '',
      previousReading: '',
      ratePerCubicMeter: '',
      previousDebt: '0',
      reader: ''
    });
    setBill(null);
    setError('');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-100'} p-4 transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto">
        <div className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} rounded-2xl shadow-xl p-8 mt-8 border transition-colors duration-200`}>
          <Header isDarkMode={isDarkMode} onThemeToggle={() => setIsDarkMode(!isDarkMode)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <BillForm
                formData={formData}
                isDarkMode={isDarkMode}
                onFormChange={setFormData}
              />
            </div>

            <div className="space-y-6">
              {error && (
                <div className={`p-4 rounded-lg text-sm border ${
                  isDarkMode 
                    ? 'bg-red-900/50 text-red-300 border-red-800' 
                    : 'bg-red-100 text-red-700 border-red-200'
                }`}>
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={calculateBill}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                  } transform hover:scale-105 active:scale-100`}
                >
                  Gerar Fatura
                </button>
                <button
                  onClick={resetForm}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 active:bg-gray-800'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400'
                  } transform hover:scale-105 active:scale-100`}
                >
                  Limpar
                </button>
              </div>

              {bill && (
                <BillPreview
                  bill={bill}
                  isDarkMode={isDarkMode}
                  onDownload={() => generatePDF(bill)}
                />
              )}
            </div>
          </div>
        </div>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;