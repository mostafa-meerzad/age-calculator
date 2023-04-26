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


  const [inputState, setInputState] = useState({ day: null, month: null, year: null });

  const [outputState, setOutputState] = useState({ day: 0, month: 0, year: 0 })


  const inputs = [
    {
      name: "day",
      placeholder: "dd",
      minVal: 1,
      maxVal: 31,
      errorMessage: "Must be a valid day"
    },
    {
      name: "month",
      placeholder: "mm",
      minVal: 1,
      maxVal: 12,
      errorMessage: "Must be a valid month"
    },
    {
      name: "year",
      placeholder: "yyyy",
      minVal: 1000,
      // year doesn't have a max value intentionally so we
      // can check the max value and provide error-message
      errorMessage: "Must be a valid year"
    }
  ];

  const handleChange = (field, value) => {
    setInputState((prevState) => ({ ...prevState, [field]: value }));
  };

  const onSubmit = (data) => {
    // check if the day of incoming data is a valid day
    // get the last day of the given month
    let lastDay = new Date(data.year, data.month, 0).getDate();
    let currentYear = new Date().getFullYear();

    if (data.day > lastDay) {
      setError("day", { message: "must be a valid date" });
      //   set errors with no error message in order to provide proper message
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

    const birthDate = new Date(`${data.year}-${data.month}, ${data.day}`)
    const now = new Date()
    const ageInMs = now - birthDate
    console.log("this is the age ", ageInMs)

    // let years = 
    console.log("last step in the submittion");
    
  };

  return (
    <header className="input">
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        {inputs.map(({ name, placeholder, minVal, maxVal }) => (
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
                max: { value: maxVal, message: `must be a valid ${name}` }
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
            {
              // errors[name] && <p>something went wrong</p>
            }
          </div>
        ))}
        <button type="submit">
          <Arrow />
        </button>
      </form>

      {inputState.day}
      {inputState.month}
      {inputState.year}
    </header>
  );
}

export default App;
