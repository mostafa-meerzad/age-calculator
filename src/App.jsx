import { useState } from "react";
import { Arrow } from "./Icons";
import { useForm } from "react-hook-form";

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
    // setInputState((prevState) => ({ ...prevState, [field]: value }));
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
              <div className="input__field" key={name}>
                <label className="input__filed-name" htmlFor={name}>
                  {name}
                </label>

                <input
                  className="input__filed-input"
                  style={errors[name] && { color: "red" }}
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
                  <p
                    className="input__field-error"
                    style={errors[name] && { color: "red" }}
                    role="alert"
                  >
                    {errors[name]?.message}
                  </p>
                )}
              </div>
            )
          )}
          <button type="submit">
            <Arrow />
          </button>
        </form>
      </header>

      <main className="output">
        <p className="output__field">
          <span className="output__field-num">
            {outputState.day ? outputState.day : "--"}
          </span>{" "}
          days
        </p>
        <p className="output__field">
          <span className="output__field-num">
            {outputState.month ? outputState.month : "--"}
          </span>{" "}
          months
        </p>
        <p className="output__field">
          <span className="output__field-num">
            {outputState.year ? outputState.year : "--"}
          </span>{" "}
          years
        </p>
      </main>
    </>
  );
}

export default App;
