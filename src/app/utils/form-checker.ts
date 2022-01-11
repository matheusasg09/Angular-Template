import { AbstractControl } from '@angular/forms';

export default class FormChecker {
  static date(control: AbstractControl): any {
    const checkDateFormat = (_dateString: string) => {
      if (!_dateString) {
        return false;
      }

      let day: number;
      let month: number;
      let year: number;

      try {
        day = Number(_dateString.slice(0, 2));
        month = Number(_dateString.slice(2, 4));
        year = Number(_dateString.slice(4, 8));
      } catch (e) {
        return false;
      }

      if (day <= 0 || day >= 33) {
        return false;
      }

      if (month <= 0 || month > 12) {
        return false;
      }

      if (String(year).length !== 4) {
        return false;
      }

      return true;
    };

    const checkIfDayExists = (_dateString: string) => {
      const day = Number(_dateString.slice(0, 2));
      const month = Number(_dateString.slice(2, 4));
      const year = Number(_dateString.slice(4, 8));

      const date = new Date(year, month - 1, day);

      const dateYear = date.getFullYear();
      const dateMonth = date.getMonth() + 1;
      const dateDay = date.getDate();

      return day === dateDay && month === dateMonth && dateYear === year;
    };

    const validateDate = (_dateString: string) => {
      if (!checkDateFormat(_dateString)) {
        return false;
      }

      if (!checkIfDayExists(_dateString)) {
        return false;
      }

      return true;
    };

    if (control.value instanceof Date) {
      return null;
    }

    const dateString = String(control.value).replace(/\D/g, '');

    if (!dateString) {
      return null;
    }

    if (!validateDate(dateString)) {
      return { invalidDate: true };
    }

    return null;
  }
}
