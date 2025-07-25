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
  
  // Mês de consumo e Data
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Mês de consumo: ${bill.month}`, pageWidth - margin - 60, y + 12);
  doc.text(`Data: ${bill.issueDate}`, pageWidth - margin - 60, y + 18);
  
  // Número da fatura em vermelho
  doc.setTextColor(255, 0, 0);
  doc.text(bill.invoiceNumber, pageWidth - margin - 30, y + 25);
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
  
  const tableWidth = pageWidth - 2 * margin;
  const colWidths = [
    tableWidth * 0.18, // LEITURAS
    tableWidth * 0.12, // Consumo
    tableWidth * 0.15, // Custo por m³
    tableWidth * 0.18, // Valor a pagar
    tableWidth * 0.18, // Valor em Dívida
    tableWidth * 0.19  // Total a pagar
  ];
  
  // Cabeçalho da tabela
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  
  let currentX = margin;
  for (let i = 0; i < tableHeaders.length; i++) {
    doc.rect(currentX, y, colWidths[i], 12);
    
    // Centralizar texto na célula
    const textWidth = doc.getTextWidth(tableHeaders[i]);
    const textX = currentX + (colWidths[i] - textWidth) / 2;
    doc.text(tableHeaders[i], textX, y + 8);
    
    currentX += colWidths[i];
  }
  
  y += 12;
  
  // Linha de dados
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  
  const tableData = [
    `Atual: ${bill.currentReading}\nAnterior: ${bill.previousReading}`,
    bill.consumption.toString(),
    `${bill.ratePerCubicMeter} MT`,
    `${bill.amountDue.toFixed(2)} MT`,
    `${bill.previousDebt.toFixed(2)} MT`,
    `${bill.totalAmount.toFixed(2)} MT`
  ];
  
  currentX = margin;
  const rowHeight = 16;
  
  for (let i = 0; i < tableData.length; i++) {
    doc.rect(currentX, y, colWidths[i], rowHeight);
    
    if (i === 0) {
      // Coluna de leituras com duas linhas
      doc.text(`Atual: ${bill.currentReading}`, currentX + 2, y + 6);
      doc.text(`Anterior: ${bill.previousReading}`, currentX + 2, y + 12);
    } else {
      // Outras colunas centralizadas
      const textWidth = doc.getTextWidth(tableData[i]);
      const textX = currentX + (colWidths[i] - textWidth) / 2;
      doc.text(tableData[i], textX, y + 10);
    }
    
    currentX += colWidths[i];
  }
  
  y += rowHeight + 15;

  // Último dia de pagamento
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Último dia do pagamento: ${bill.dueDate}`, margin, y);
  y += 15;

  // Valor por Extenso
  doc.setFont('helvetica', 'bold');
  doc.text('Valor por Extenso:', margin, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(bill.numberToWords(bill.totalAmount), margin, y);
  y += 20;

  // Assinatura do funcionário
  doc.setFont('helvetica', 'bold');
  doc.text('Assinatura do funcionário:', pageWidth - margin - 70, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(bill.reader, pageWidth - margin - 60, y);
  y += 5;
  doc.line(pageWidth - margin - 70, y, pageWidth - margin - 10, y);

  // Rodapé
  const footerY = doc.internal.pageSize.height - 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('PRESADA E SERVIÇOS - Sistema de Faturação de Água', pageWidth / 2, footerY, { align: 'center' });

  doc.save(`fatura-agua-${bill.invoiceNumber}.pdf`);
};