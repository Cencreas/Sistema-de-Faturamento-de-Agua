import { jsPDF } from 'jspdf';
import { WaterBill } from '../types';

const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).replace(/\./g, '.').replace(/,/g, ',') + ' MT';
};

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
  
  y += 35;

  // Título da fatura centralizado
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('FATURA DE ÁGUA', pageWidth / 2, y, { align: 'center' });
  y += 20;

  // Linha separadora
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  // Dados do Cliente
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Cliente: ${bill.customerName}`, margin, y);
  y += 7;
  
  if (bill.contactNumber) {
    doc.text(`Contato: ${bill.contactNumber}`, margin, y);
    y += 7;
  }
  
  doc.text(`Contador: ${bill.meterNumber}`, margin, y);
  y += 7;
  
  doc.text(`Mês: ${bill.month}`, margin, y);
  y += 7;
  
  doc.text(`Data: ${bill.issueDate}`, margin, y);
  y += 7;

  // Número da fatura no canto direito
  doc.setTextColor(255, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(`N° ${bill.invoiceNumber}`, pageWidth - margin - 40, y - 28);
  doc.setTextColor(0, 0, 0);
  
  y += 15;

  // TABELA DE CONSUMO
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CONSUMO', margin, y);
  y += 10;

  // Configuração da tabela de consumo
  const consumoTableWidth = pageWidth - 2 * margin;
  const consumoColWidths = [
    consumoTableWidth * 0.33, // Leitura Atual
    consumoTableWidth * 0.33, // Leitura Anterior
    consumoTableWidth * 0.34  // Consumo
  ];

  const consumoHeaders = ['Leitura Atual', 'Leitura Anterior', 'Consumo'];
  const consumoData = [
    bill.currentReading.toString(),
    bill.previousReading.toString(),
    `${bill.consumption} m³`
  ];

  // Cabeçalho da tabela de consumo
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  
  let currentX = margin;
  const headerHeight = 10;
  
  for (let i = 0; i < consumoHeaders.length; i++) {
    doc.rect(currentX, y, consumoColWidths[i], headerHeight);
    
    const textWidth = doc.getTextWidth(consumoHeaders[i]);
    const textX = currentX + (consumoColWidths[i] - textWidth) / 2;
    doc.text(consumoHeaders[i], textX, y + 7);
    
    currentX += consumoColWidths[i];
  }
  
  y += headerHeight;
  
  // Dados da tabela de consumo
  doc.setFont('helvetica', 'normal');
  currentX = margin;
  const dataHeight = 10;
  
  for (let i = 0; i < consumoData.length; i++) {
    doc.rect(currentX, y, consumoColWidths[i], dataHeight);
    
    const textWidth = doc.getTextWidth(consumoData[i]);
    const textX = currentX + (consumoColWidths[i] - textWidth) / 2;
    doc.text(consumoData[i], textX, y + 7);
    
    currentX += consumoColWidths[i];
  }
  
  y += dataHeight + 20;

  // TABELA DE PAGAMENTO
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PAGAMENTO', margin, y);
  y += 10;

  // Configuração da tabela de pagamento
  const pagamentoTableWidth = pageWidth - 2 * margin;
  const pagamentoColWidths = [
    pagamentoTableWidth * 0.25, // Custo m³
    pagamentoTableWidth * 0.25, // Valor Consumo
    pagamentoTableWidth * 0.25, // Dívida
    pagamentoTableWidth * 0.25  // Total
  ];

  const pagamentoHeaders = ['Custo m³', 'Valor Consumo', 'Dívida', 'Total'];
  const pagamentoData = [
    formatCurrency(bill.ratePerCubicMeter),
    formatCurrency(bill.amountDue),
    formatCurrency(bill.previousDebt),
    formatCurrency(bill.totalAmount)
  ];

  // Cabeçalho da tabela de pagamento
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  
  currentX = margin;
  
  for (let i = 0; i < pagamentoHeaders.length; i++) {
    doc.rect(currentX, y, pagamentoColWidths[i], headerHeight);
    
    const textWidth = doc.getTextWidth(pagamentoHeaders[i]);
    const textX = currentX + (pagamentoColWidths[i] - textWidth) / 2;
    doc.text(pagamentoHeaders[i], textX, y + 7);
    
    currentX += pagamentoColWidths[i];
  }
  
  y += headerHeight;
  
  // Dados da tabela de pagamento
  currentX = margin;
  
  for (let i = 0; i < pagamentoData.length; i++) {
    doc.rect(currentX, y, pagamentoColWidths[i], dataHeight);
    
    // Total em negrito
    if (i === 3) {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    
    const textWidth = doc.getTextWidth(pagamentoData[i]);
    const textX = currentX + (pagamentoColWidths[i] - textWidth) / 2;
    doc.text(pagamentoData[i], textX, y + 7);
    
    currentX += pagamentoColWidths[i];
  }
  
  y += dataHeight + 20;

  // Valor por Extenso
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Valor por Extenso:', margin, y);
  y += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const valorPorExtenso = bill.numberToWords(bill.totalAmount);
  const linhasTexto = doc.splitTextToSize(valorPorExtenso, pageWidth - 2 * margin);
  doc.text(linhasTexto, margin, y);
  y += linhasTexto.length * 6 + 15;

  // Último dia de pagamento
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Último dia de pagamento: ${bill.dueDate}`, margin, y);
  y += 20;

  // Assinatura do leitor
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Assinatura do leitor:', margin, y);
  y += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(bill.reader, margin, y);
  y += 8;
  
  // Linha para assinatura
  doc.line(margin, y, margin + 80, y);

  // Rodapé
  const footerY = doc.internal.pageSize.height - 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('PRESADA E SERVIÇOS - Sistema de Faturação de Água', pageWidth / 2, footerY, { align: 'center' });

  doc.save(`fatura-agua-${bill.invoiceNumber}.pdf`);
};