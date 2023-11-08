
const inputs = [
    {
      name: "day",
      placeholder: "dd",
      minVal: 1,
      maxVal: 31,
      errorMessage: "Must be a valid day",
      pattern: /\d{1,2}/,
      patternMsg: "not a valid number",
    },
    {
      name: "month",
      placeholder: "mm",
      minVal: 1,
      maxVal: 12,
      errorMessage: "Must be a valid month",
      pattern: /\d{1,2}/,
      patternMsg: "not a valid number",
    },
    {
      name: "year",
      placeholder: "yyyy",
      minVal: 1000,
      // maxVal: new Date().getFullYear(), // this is the potential maxVal but if you provide it then you can't specify the proper error message
      errorMessage: "Must be a valid year",
      pattern: /\d{4}/,
      patternMsg: "not a valid number",
    },
  ];

  export {inputs}