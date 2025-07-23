import { jsPDF } from 'jspdf';
import { WaterBill } from '../types';

export const generatePDF = (bill: WaterBill) => {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  // Cabeçalho
  doc.setFontSize(20);
  doc.text('Fatura de Água', margin, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Nº ${bill.invoiceNumber}`, margin, y);
  doc.text(`${bill.month}`, doc.internal.pageSize.width - margin - doc.getTextWidth(`${bill.month}`), y);
  y += 7;

  doc.text(`Emissão: ${bill.issueDate}`, doc.internal.pageSize.width - margin - doc.getTextWidth(`Emissão: ${bill.issueDate}`), y);
  y += 15;

  // Dados do Cliente
  doc.text(`Cliente: ${bill.customerName}`, margin, y);
  y += 7;
  doc.text(`Contador: ${bill.meterNumber}`, margin, y);
  y += 15;

  // Leituras
  doc.text(`Leitura Atual: ${bill.currentReading} m³`, margin, y);
  y += 7;
  doc.text(`Leitura Anterior: ${bill.previousReading} m³`, margin, y);
  y += 7;
  doc.text(`Consumo: ${bill.consumption} m³`, margin, y);
  y += 7;
  doc.text(`Preço por m³: ${bill.ratePerCubicMeter} MT`, margin, y);
  y += 15;

  // Valores
  doc.text(`Valor do Consumo: ${bill.amountDue.toFixed(2)} MT`, margin, y);
  y += 7;
  doc.text(`Valor em Dívida: ${bill.previousDebt.toFixed(2)} MT`, margin, y);
  y += 10;

  // Total
  doc.setFontSize(14);
  doc.text(`Total a Pagar: ${bill.totalAmount.toFixed(2)} MT`, margin, y);
  y += 15;

  // Valor por Extenso
  doc.setFontSize(12);
  doc.text('Valor por Extenso:', margin, y);
  y += 7;
  doc.text(bill.numberToWords(bill.totalAmount), margin, y);
  y += 15;

  // Data Limite e Leitor
  doc.text(`Data Limite de Pagamento: ${bill.dueDate}`, margin, y);
  y += 7;
  doc.text(`Funcionário: ${bill.reader}`, margin, y);

  // Rodapé
  y = doc.internal.pageSize.height - 20;
  doc.setFontSize(10);
  doc.text('Sistema de Faturação de Água - Gestão eficiente do consumo', doc.internal.pageSize.width / 2, y, { align: 'center' });

  doc.save(`fatura-agua-${bill.invoiceNumber}.pdf`);
};