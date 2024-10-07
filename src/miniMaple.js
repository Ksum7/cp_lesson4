class MiniMaple {
    static d(expr, variable) {
      expr = expr.replace(/\s+/g, '');
  
      if (!/^[0-9a-zA-Z\+\-\*\^]+$/.test(expr)) {
        throw new Error('Invalid expression: Only digits, letters, +, -, *, and ^ are allowed.');
      }
  
      if (/[\+\-\*\/]{2,}/.test(expr) || /[\^]{2,}/.test(expr)) {
        throw new Error('Invalid syntax: consecutive operators.');
      }
  
      const terms = expr.split(/(?=[+-])/);
      let result = terms
        .map(term => MiniMaple._diffTerm(term, variable))
        .filter(Boolean)
        .join(' + ')
        .replace(/\+\s*-/, '- ');
      return result || '0';
    }
  
    static _diffTerm(term, variable) {
      if (!term.includes(variable)) {
        return null;
      }
  
      const regex = new RegExp(`(?:(?:([+-]?\\d+)[\\*]?)|([+-]?\\d*))?${variable}(?:\\^(\\d+))?`);
      const match = term.match(regex);
  
      if (!match || match[0] != term) {
        throw new Error(`Invalid term: '${term}' is not a valid polynomial term.`);
      }
  
      let [, coeff1, coeff2, exponent] = match;

      let coeff = coeff1 ? coeff1 : coeff2
  
      coeff = coeff === '' || coeff === '+' ? 1 : coeff === '-' ? -1 : parseInt(coeff);
  
      exponent = exponent ? parseInt(exponent) : 1;
  
      const newCoeff = coeff * exponent;
      const newExponent = exponent - 1;
  
      if (newExponent === 0) {
        return `${newCoeff}`;
      } else if (newExponent === 1) {
        return `${newCoeff}*${variable}`;
      } else {
        return `${newCoeff}*${variable}^${newExponent}`;
      }
    }
  }
  
  export { MiniMaple };
  