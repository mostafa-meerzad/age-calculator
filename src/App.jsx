import { useState } from "react";
import { Arrow } from "./Icons";
import { useForm } from "react-hook-form";
import "./styles.css";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const [inputState, setInputState] = useState({
    day: null,
    month: null,
    year: null
  });

  const [outputState, setOutputState] = useState({ day: 0, month: 0, year: 0 });

  const inputs = [
    {
      name: "day",
      placeholder: "dd",
      minVal: 1,
      maxVal: 31,
      errorMessage: "Must be a valid day",
      pattern: /\d{1,2}/,
      patternMsg: "not a valid number"
    },
    {
      name: "month",
      placeholder: "mm",
      minVal: 1,
      maxVal: 12,
      errorMessage: "Must be a valid month",
      pattern: /\d{1,2}/,
      patternMsg: "not a valid number"
    },
    {
      name: "year",
      placeholder: "yyyy",
      minVal: 1000,
      // year doesn't have a max value intentionally so we
      // can check the max value and provide error-message
      errorMessage: "Must be a valid year",
      pattern: /\d{4}/,
      patternMsg: "not a valid number"
    }
  ];

  const handleChange = (field, value) => {
    setInputState({ ...inputState, [field]: value });
  };

  const onSubmit = (data) => {
    // check if the day of incoming data is a valid day
    // get the last day of the given month
    let lastDay = new Date(data.year, data.month, 0).getDate();
    let currentYear = new Date().getFullYear();

    if (data.day > lastDay) {
      setError("day", { message: "must be a valid date" });
      // set errors with no error message, because there is just one error message when invalid day is provided
      // (leap year / non-leap yean)
      setError("month");
      setError("year");
      return;
    }

    if (data.year > currentYear) {
      setError("day", { message: "must be a valid day" });
      setError("month", { message: "must be a valid month" });
      setError("year", { message: "must be in the past" });
      return;
    }

    // calculate the age if everything is OK

    const birthDate = new Date(`${data.year}-${data.month}, ${data.day}`);
    const now = new Date();

    let day = 0,
      month = 0,
      year = 0;

    day =
      now.getDate() - birthDate.getDate() < 0
        ? 0
        : now.getDate() - birthDate.getDate();

    month =
      now.getMonth() - birthDate.getMonth() < 0
        ? 12 + now.getMonth() - birthDate.getMonth()
        : now.getMonth() - birthDate.getMonth();

    year =
      now.getMonth() - birthDate.getMonth() < 0
        ? now.getFullYear() - birthDate.getFullYear() - 1
        : now.getFullYear() - birthDate.getFullYear();

    setOutputState({ day, month, year });
  };

  return (
    <>
      <header className="input">
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          {inputs.map(
            ({ name, placeholder, minVal, maxVal, pattern, patternMsg }) => (
              <div className="input__wrapper" key={name}>
                <label
                  className={
                    errors[name]
                      ? "input__name input__name--error"
                      : "input__name"
                  }
                  htmlFor={name}
                >
                  {name}
                </label>

                <input
                  autoComplete="off"
                  className={
                    errors[name]
                      ? "input__input input__input--error"
                      : "input__input"
                  }
                  type="text"
                  placeholder={placeholder}
                  onChange={(e) => {
                    handleChange(name, e.target.value);
                  }}
                  //   make validation messages dynamic
                  {...register(name, {
                    required: "This field is required",
                    min: { value: minVal, message: `must be a valid ${name}` },
                    max: { value: maxVal, message: `must be a valid ${name}` },
                    pattern: { value: pattern, message: patternMsg }
                  })}
                />

                {errors[name] && (
                  <p className="input__error" role="alert">
                    {errors[name]?.message}
                  </p>
                )}
              </div>
            )
          )}
          <hr className="input__bar" />
          <button type="submit" className="input__submit">
            <Arrow />
          </button>
        </form>
      </header>

      <main className="output">
        <p className="output__wrapper">
          <span className="output__num">
            {outputState.year ? outputState.year : "--"}
          </span>{" "}
          years
        </p>
        <p className="output__wrapper">
          <span className="output__num">
            {outputState.month ? outputState.month : "--"}
          </span>{" "}
          months
        </p>

        <p className="output__wrapper">
          <span className="output__num">
            {outputState.day ? outputState.day : "--"}
          </span>{" "}
          days
        </p>
      </main>
    </>
  );
}

export default App;
