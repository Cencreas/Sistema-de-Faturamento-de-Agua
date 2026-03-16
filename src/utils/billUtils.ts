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

export const numberToWords = (num: number): string => {
  if (num === 0) return 'zero meticais';

  const unidades = [
    '', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
    'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
  ];

  const dezenas = [
    '', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'
  ];

  const centenas = [
    '', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'
  ];

  const convertirGrupo = (n: number): string => {
    if (n === 0) return '';
    
    let resultado = '';
    
    // Centenas
    const c = Math.floor(n / 100);
    if (c > 0) {
      if (c === 1 && n === 100) {
        resultado += 'cem';
      } else {
        resultado += centenas[c];
      }
    }
    
    // Dezenas e unidades
    const resto = n % 100;
    if (resto > 0) {
      if (resultado) resultado += ' e ';
      
      if (resto < 20) {
        resultado += unidades[resto];
      } else {
        const d = Math.floor(resto / 10);
        const u = resto % 10;
        resultado += dezenas[d];
        if (u > 0) {
          resultado += ' e ' + unidades[u];
        }
      }
    }
    
    return resultado;
  };

  // Separar parte inteira e decimal
  const parteInteira = Math.floor(num);
  const parteDecimal = Math.round((num - parteInteira) * 100);

  let resultado = '';

  if (parteInteira === 0) {
    resultado = 'zero';
  } else {
    // Milhões
    const milhoes = Math.floor(parteInteira / 1000000);
    if (milhoes > 0) {
      if (milhoes === 1) {
        resultado += 'um milhão';
      } else {
        resultado += convertirGrupo(milhoes) + ' milhões';
      }
    }

    // Milhares
    const milhares = Math.floor((parteInteira % 1000000) / 1000);
    if (milhares > 0) {
      if (resultado) resultado += ' ';
      if (milhares === 1) {
        resultado += 'mil';
      } else {
        resultado += convertirGrupo(milhares) + ' mil';
      }
    }

    // Centenas, dezenas e unidades
    const resto = parteInteira % 1000;
    if (resto > 0) {
      if (resultado) {
        // Se já temos milhões ou milhares, usar "e" antes das centenas
        if (resto < 100) {
          resultado += ' e ';
        } else {
          resultado += ' ';
        }
      }
      resultado += convertirGrupo(resto);
    }
  }

  // Adicionar parte decimal se existir
  if (parteDecimal > 0) {
    resultado += ' e ' + convertirGrupo(parteDecimal) + ' centavos';
  }

  // Capitalizar primeira letra
  resultado = resultado.charAt(0).toUpperCase() + resultado.slice(1);

  return resultado + ' meticais';
};