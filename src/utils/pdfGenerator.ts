import { jsPDF } from 'jspdf';
import { WaterBill } from '../types';

export const generatePDF = (bill: WaterBill) => {
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  let y = margin;

  // Logo e cabeçalho da empresa
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  
  // Logo circular simulado com texto "PS"
  doc.circle(margin + 10, y + 5, 8);
  doc.text('PS', margin + 7, y + 8);
  
  // Nome da empresa
  doc.text('PRESADA E SERVIÇOS', margin + 25, y + 5);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Bairro de Ndiavel - Maputo', margin + 25, y + 12);
  doc.text('Q 14 Casa N° 286', margin + 25, y + 18);
  
  // FATURA no canto direito
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('FATURA', pageWidth - margin - 30, y + 5);
  
  // Número da fatura em vermelho
  doc.setTextColor(255, 0, 0);
  doc.text(bill.invoiceNumber, pageWidth - margin - 30, y + 15);
  doc.setTextColor(0, 0, 0);
  
  y += 35;

  // Linha separadora
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;


  // Dados do Cliente
  doc.setFontSize(12);
  doc.text(`Exmo(a) Sr.(a): ${bill.customerName}`, margin, y);
  y += 7;
  
  if (bill.contactNumber) {
    doc.text(`Contato N°: ${bill.contactNumber}`, margin, y);
    y += 7;
  }
  
  doc.text(`Contador: ${bill.meterNumber}`, margin, y);
  y += 15;

  // Tabela principal
  const tableHeaders = [
    'LEITURAS (m³)',
    'Consumo (m³)',
    'Custo por (m³)',
    'Valor a pagar',
    'Valor em Dívida',
    'Total a pagar'
  ];
  
  const colWidth = (pageWidth - 2 * margin) / 6;
  
  // Cabeçalho da tabela
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  
  for (let i = 0; i < tableHeaders.length; i++) {
    const x = margin + i * colWidth;
    doc.rect(x, y, colWidth, 10);
    doc.text(tableHeaders[i], x + 2, y + 7);
  }
  
  y += 10;
  
  // Sub-cabeçalho para leituras
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.rect(margin, y, colWidth, 8);
  doc.text(`Atual: ${bill.currentReading}`, margin + 2, y + 5);
  doc.text(`Anterior: ${bill.previousReading}`, margin + 2, y + 7);
  
  // Dados da tabela
  const tableData = [
    '',
    bill.consumption.toString(),
    `${bill.ratePerCubicMeter} MT`,
    `${bill.amountDue.toFixed(2)} MT`,
    `${bill.previousDebt.toFixed(2)} MT`,
    `${bill.totalAmount.toFixed(2)} MT`
  ];
  
  for (let i = 1; i < tableData.length; i++) {
    const x = margin + i * colWidth;
    doc.rect(x, y, colWidth, 8);
    doc.text(tableData[i], x + 2, y + 6);
  }
  
  y += 20;

  // Último dia de pagamento
  doc.setFontSize(12);
  doc.text(`Último dia do pagamento: ${bill.dueDate}`, margin, y);
  y += 15;


  // Valor por Extenso
  doc.text('Valor por Extenso:', margin, y);
  y += 7;
  doc.text(bill.numberToWords(bill.totalAmount), margin, y);
  y += 15;

  // Assinatura do leitor
  doc.text('Assinatura do leitor:', pageWidth - margin - 60, y);
  y += 7;
  doc.text(bill.reader, pageWidth - margin - 60, y);
  y += 5;
  doc.line(pageWidth - margin - 60, y, pageWidth - margin, y);

  // Rodapé
  const footerY = doc.internal.pageSize.height - 20;
  doc.setFontSize(10);
  doc.text('PRESADA E SERVIÇOS - Sistema de Faturação de Água', pageWidth / 2, footerY, { align: 'center' });

  doc.save(`fatura-agua-${bill.invoiceNumber}.pdf`);
};