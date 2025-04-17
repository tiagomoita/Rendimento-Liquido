import { AsyncThunkAction } from "@reduxjs/toolkit";

/**
 * Function Composition
 * @param {...any[]} fns
 */
export const compose =
  (...fns: any[]) =>
  (...args: any[]) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

/**
 * Asynchronous Function Composition
 * @param {...any[]} functions
 */
export const asyncCompose =
  (...fns: any[]) =>
  (...args: any[]) =>
    fns.reduceRight((chain, fn) => chain.then(fn), Promise.resolve(args));

/**
 * Gets the all url query parameter
 * @return {*}
 */
export const getQueryParams = () => {
  try {
    const { search = "" } = { ...window.location };

    // Removes the interrogation mark and splits by '&'
    const queryParams = search.substring(1).split("&");

    return queryParams
      .filter(Boolean)
      .map((param) => param.split("="))
      .map(([key, value]) => ({ [key]: decodeURI(value) }))
      .reduce((prev, curr) => ({ ...prev, ...curr }), {});
  } catch (error) {
    return {};
  }
};

export const updateQueryParams = (params: { [key: string]: string }) => {
  try {
    let queryParams = getQueryParams();
    Object.keys(params).forEach((key) => {
      queryParams = { ...queryParams, [key]: params[key] };
    });

    return `?${Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&")}`;
  } catch (error) {
    return window.location.search;
  }
};

export const removeParamFromQueryParams = (paramToRemove: string) => {
  try {
    const queryParams = getQueryParams();

    if (paramToRemove in queryParams) {
      delete queryParams[paramToRemove];
    }

    return `?${Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&")}`;
  } catch (error) {
    return window.location.search;
  }
};

/**
 * Retrieves the provided value in lowercase and trimmed
 * @param {string} value
 */
export const transformString = (value: string) =>
  value.trim().toLocaleLowerCase();

/**
 * Sorts a given array by the provided property key
 * @param {{ [key: string]: any }[]} list
 * @param {string} key
 * @return {*}
 */
export const sortByKey = (list: any[], key: string) =>
  [...list].sort((a, b) => a[key].localeCompare(b[key]));

/**
 * Sorts a given array by the provided property key
 * @param {{ [key: string]: any }[]} list
 * @param {string} key
 * @param {string} alternativeKey
 * @return {*}
 */
export const sortByNumber = (list: any[], key: string) =>
  [...list].sort((a, b) => {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

export const sortByNumberAndName = (
  list: any[],
  key: string,
  alternativeKey?: string
) =>
  [...list].sort((a, b) => {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    // a must be equal to b
    if (a[key] === b[key] && !!alternativeKey) {
      if (a?.category[alternativeKey] < b?.category[alternativeKey]) {
        return -1;
      }
      if (a?.category[alternativeKey] > b?.category[alternativeKey]) {
        return 1;
      }
      return 0;
    }
    return 0;
  });

/**
 * Formats a given value into a currency representation
 * @param {({
 *   value?: string | number;
 *   currency?: string;
 *   decimalPlaces?: number;
 * })} {
 *   value,
 *   currency = "€",
 *   decimalPlaces = 0,
 * }
 * @return {*}  {string}
 */
export const formatCurrency = ({
  value,
  currency = "€",
  decimalPlaces = 0,
}: {
  value?: string | number;
  currency?: string;
  decimalPlaces?: number;
}): string => {
  let formattedAmount: string | number = 0;
  let total = "0";

  try {
    const amount = Number(value);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(amount)) {
      throw new Error();
    }

    if ((!amount && amount !== 0) || !currency) {
      return "n.d.";
    }

    formattedAmount = amount;
  } catch (error) {
    formattedAmount = 0;
  } finally {
    let options = {};

    if (decimalPlaces) {
      options = {
        style: "currency",
        currency: "EUR",
        currencyDisplay: "symbol",
        maximumFractionDigits: decimalPlaces,
      };
    }

    formattedAmount = formattedAmount.toFixed(decimalPlaces);
    total = Number(formattedAmount).toLocaleString("de-DE", options);
    total = total.replace("€", "").trim();
  }

  return [total, currency].join("");
};

/**
 * Splits a given word in two
 * @param {string} wordToSplit
 * @return {*}
 */
export const splitWord = (wordToSplit: string) => {
  const spaceSplit = wordToSplit.split(" ");
  const result = spaceSplit.filter(Boolean).reduce(
    (prev, curr) => {
      const [first, second] = prev;
      const word = [first, curr].join(" ");

      if (word.length <= 21 && !second) {
        return [word, second];
      }

      const rest = [second, curr].join(" ");
      return [first, rest];
    },
    ["", ""]
  );

  const [first = "", second = ""] = result;
  return [first.trim(), second.trim()];
};

/**
 * @param {(string | Date)} date
 * @return {*}  {{ [key: string]: string; day: string; month: string; year: string }}
 */
export const getDeconstructedDate = (
  date: string | Date
): { [key: string]: string; day: string; month: string; year: string } => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();
  return {
    day: `0${day}`.slice(-2),
    month: `0${month + 1}`.slice(-2),
    year: year.toString(),
  };
};

/**
 * @param {(string | Date)} date
 * @return {*}
 */
export const formatDate = (date: string | Date) => {
  try {
    const { day, month, year } = getDeconstructedDate(date);
    return [day, month, year].join("-");
  } catch (error) {
    return "";
  }
};

/**
 * Sums the numeric values passed as arguments
 * @param {...number[]} values
 */
export const applySum = (...values: number[]) => {
  try {
    return values
      .filter(Boolean)
      .map(Number)
      .reduce((prev: number, curr: number) => prev + curr, 0);
  } catch (error) {
    return 0;
  }
};

/**
 * Joins a group of classes into a single class string, excluding empty values
 * @param {...any[]} classes
 */
export const joinClasses = (...classes: any[]) =>
  classes.filter(Boolean).join(" ");

/**
 * Compares two values based on the provided key
 * @param {string} key
 * @param {boolean} [asc=false]
 * @param {*} [options]
 */
export const compareKeys =
  (key: string, asc = false, options: any = {}) =>
  (a: any, b: any) => {
    const { numeric = false } = { ...options };

    if (numeric) {
      return asc
        ? Number(a[key]) - Number(b[key])
        : Number(b[key]) - Number(a[key]);
    }

    return asc
      ? String(a[key]).localeCompare(String(b[key]), undefined, { ...options })
      : String(b[key]).localeCompare(String(a[key]), undefined, { ...options });
  };

export const withThunkWrapper = async (
  _asyncThunkAction: AsyncThunkAction<any, any, any>,
  _onSuccess: (..._args: any[]) => void = () => {},
  _onError: (..._args: any[]) => void = () => {}
) => {
  try {
    const response = await _asyncThunkAction;
    const { meta = {}, payload = {} } = { ...response };
    const { rejectedWithValue = false } = { ...meta };
    if (rejectedWithValue) throw response;
    _onSuccess(payload);
  } catch (error) {
    _onError(error);
  }
};

export const formatToEuroCurrency = (number: number | undefined): string => {
  if (number === undefined) {
    return "0,00 €";
  }
  const euroValue = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number);

  return euroValue;
};

export const roundValue = (number: number): number => {
  const value = number ?? 0;
  return Math.round(value * 100) / 100;
};

export const formatNumber2DecimalPlaces = (number: number) => {
  return number.toFixed(2);
};

export const mapValueToMostRepresentativeCheckBok = (value: string) => {
  switch (value) {
    case "NA":
      return null;
    case "IRS":
      return false;
    case "REC":
      return true;
    default:
      return null;
  }
};

export const mapMostRepresentativeCheckBokToValues = (
  value: boolean | null
) => {
  switch (value) {
    case null:
      return "NA";
    case false:
      return "IRS";
    case true:
      return "REC";
    default:
      return "NA";
  }
};
