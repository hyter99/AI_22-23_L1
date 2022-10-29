const enum signCases {
  NUMERIC,
  UPPER_CASE,
  LOWER_CASE,
  UNDEFINED
}

const checkSignCase = (ch: string): number => {
  if (!isNaN(parseInt(ch))){
    return signCases.NUMERIC;
  }
  else {
    if (ch === ch.toUpperCase()) {
      return signCases.UPPER_CASE;
    }
    if (ch === ch.toLowerCase()){
      return signCases.LOWER_CASE;
    }
  }

  return signCases.UNDEFINED;
};

export const doesStringContainOneOrMoreUpperCaseLetter = (strToCheck: string): boolean => {
  for (let i = 0; i < strToCheck.length; i++) {
    const signNumber = checkSignCase(strToCheck[i]);
    if (signNumber === signCases.UPPER_CASE) {
      return true;
    }
  }

  return false;
};

export const doesStringContainOneOrMoreNumber = (strToCheck: string): boolean => {
  for (let i = 0; i < strToCheck.length; i++) {
    const signNumber = checkSignCase(strToCheck[i]);
    if (signNumber === signCases.NUMERIC) {
      return true;
    }
  }

  return false;
};