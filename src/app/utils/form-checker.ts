import { AbstractControl } from '@angular/forms';

export default class FormChecker {
  static email(control: AbstractControl): any {
    if (!control.value) {
      return null;
    }

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(control.value).toLowerCase());

    if (isValid) {
      return null;
    }

    return { invalidEmail: true };
  }

  static cpf(control: AbstractControl): any {
    if (!control.value) {
      return null;
    }

    const validateCPF = (cpfString: number | string): boolean => {
      if (typeof cpfString === 'number') {
        cpfString = cpfString.toString();
      }

      const strCPF = cpfString.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
      let sum: number;
      let rest: number;
      sum = 0;
      if (strCPF === '00000000000') {
        return false;
      }
      for (let tie = 1; tie <= 9; tie++) {
        sum = sum + parseInt(strCPF.substring(tie - 1, tie), 0) * (11 - tie);
      }
      rest = (sum * 10) % 11;
      if (rest === 10 || rest === 11) {
        rest = 0;
      }
      if (rest !== parseInt(strCPF.substring(9, 10), 0)) {
        return false;
      }
      sum = 0;
      for (let tie = 1; tie <= 10; tie++) {
        sum = sum + parseInt(strCPF.substring(tie - 1, tie), 0) * (12 - tie);
      }
      rest = (sum * 10) % 11;
      if (rest === 10 || rest === 11) {
        rest = 0;
      }
      if (rest !== parseInt(strCPF.substring(10, 11), 0)) {
        return false;
      }
      return true;
    };

    const isValid = validateCPF(control.value);

    if (isValid) {
      return null;
    }

    return {
      invalidCpf: true,
    };
  }

  static cnpj(control: AbstractControl): any {
    if (!control.value) {
      return null;
    }

    const validateCNPJ = (value: number | string): boolean => {
      if (!value) {
        return true;
      }

      const validateType = typeof value !== 'string';

      if (validateType) {
        return false;
      }

      const numbers = value.toString().match(/\d/g)?.map(Number);

      if (numbers?.length !== 14) {
        return false;
      }

      const items = [...new Set(numbers)];
      if (items.length === 1) {
        return false;
      }

      const calc = (x: any) => {
        const slice = numbers.slice(0, x);
        let factor = x - 7;
        let sum = 0;

        for (let i = x; i >= 1; i--) {
          const n = slice[x - i];
          sum += n * factor--;
          if (factor < 2) {
            factor = 9;
          }
        }

        const result = 11 - (sum % 11);

        return result > 9 ? 0 : result;
      };

      const digits = numbers.slice(12);

      const digit0 = calc(12);
      if (digit0 !== digits[0]) {
        return false;
      }

      const digit1 = calc(13);
      return digit1 === digits[1];
    };

    const isValid = validateCNPJ(control.value);

    if (isValid) {
      return null;
    }

    return {
      invalidCnpj: !isValid,
    };
  }

  static fullName(control: AbstractControl): any {
    if (!control.value) {
      return null;
    }

    const hasNumber = (str: string) => /\d/.test(str);
    const hasSpecialCharacters = (str: string) =>
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
    const hasOneLetter = (str: string): boolean => str.length === 1;

    const name = control.value;
    const words = control.value
      .split(' ')
      .filter((word: string) => word.trim().length > 0);
    const wordsAmount = words.length;
    const firstName = words[0];
    const lastName = words[words.length - 1];

    if (hasNumber(name)) {
      return { invalidName: true };
    }

    if (hasSpecialCharacters(name)) {
      return { invalidName: true };
    }

    if (wordsAmount <= 1) {
      return { invalidName: true };
    }

    if (words.every(hasOneLetter)) {
      return { invalidName: true };
    }

    if (hasOneLetter(firstName)) {
      const allowedLetters = 'DdIiÍíìÌÓÒÔOóòôoUÛÚÙúùuÝYy';
      if (!allowedLetters.includes(firstName)) {
        return { invalidName: true };
      }
    }
    if (hasOneLetter(lastName)) {
      const allowedLetters = 'IÌÍíìiOÓÒÔoóòôÚÙÛUuÝYy';
      if (!allowedLetters.includes(lastName)) {
        return { invalidName: true };
      }
    }
    if (words.length >= 3) {
      const wordsWhithoutFirstAndLast = words.slice(1, words.length - 1);
      if (wordsWhithoutFirstAndLast.some(hasOneLetter)) {
        return { invalidName: true };
      }
    }
    return null;
  }
}
