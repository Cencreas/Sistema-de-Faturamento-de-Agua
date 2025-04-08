export const generateInvoiceNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${year}${month}${random}`;
};

export const getCurrentMonth = () => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const date = new Date();
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const getDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 10);
  return date.toLocaleDateString('pt-BR');
};

export const numberToWords = (num: number) => {
  if (num === 0) return 'zero meticais';

  const wholePart = Math.floor(num);
  const decimalPart = Math.round((num - wholePart) * 100);

  let result = '';
  
  if (wholePart > 0) {
    result += `${wholePart} `;
  }

  if (decimalPart > 0) {
    result += `e ${decimalPart}/100`;
  }

  return result + ' meticais';
};