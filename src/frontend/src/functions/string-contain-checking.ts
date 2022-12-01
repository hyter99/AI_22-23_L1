const enum SignCasesEnum {
  NUMERIC,
  UPPER_CASE,
  LOWER_CASE,
  UNDEFINED
}

const CheckSignCase = (ch: string): number => {
  if (!isNaN(parseInt(ch))){
    return SignCasesEnum.NUMERIC;
  }
  else {
    if (ch === ch.toUpperCase()) {
      return SignCasesEnum.UPPER_CASE;
    }
    if (ch === ch.toLowerCase()){
      return SignCasesEnum.LOWER_CASE;
    }
  }

  return SignCasesEnum.UNDEFINED;
};

export const DoesStringContainOneOrMoreUpperCaseLetter = (strToCheck: string): boolean => {
  for (let i = 0; i < strToCheck.length; i++) {
    const signNumber = CheckSignCase(strToCheck[i]);
    if (signNumber === SignCasesEnum.UPPER_CASE) {
      return true;
    }
  }

  return false;
};

export const DoesStringContainOneOrMoreNumber = (strToCheck: string): boolean => {
  for (let i = 0; i < strToCheck.length; i++) {
    const signNumber = CheckSignCase(strToCheck[i]);
    if (signNumber === SignCasesEnum.NUMERIC) {
      return true;
    }
  }

  return false;
};