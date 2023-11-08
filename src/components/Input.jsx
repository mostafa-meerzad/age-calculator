import { useForm } from "react-hook-form";
import { Arrow } from "../Icons";
import { inputs } from "../data";
import { useState } from "react";
import { calculateAge } from "../utils/calculateAge";

const Input = ({ setOutputState}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [inputState, setInputState] = useState({
    day: null,
    month: null,
    year: null,
  });

  const handleChange = (field, value) => {
    setInputState({ ...inputState, [field]: value });
  };

  const onSubmit = (data) => {
    // get the last day of the birthMonth to check if the provided day is a valid day
    const birthMonthLastDay = new Date(data.year, data.month, 0).getDate();
    const currentYear = new Date().getFullYear();

    if (data.year > currentYear) {
        setError("day", { message: "must be a valid day" });
        setError("month", { message: "must be a valid month" });
        setError("year", { message: "must be in the past" });
        return;
      }
      
    if (data.day > birthMonthLastDay) {
      setError("day", { message: "must be a valid date" });
      //set errors with no error message, because there is just one error message when invalid day is provided
      setError("month");
      setError("year");
      return;
    }


    // calculate the age if everything is OK

    const {years, months, days} = calculateAge(data.year, data.month, data.day);

    setOutputState({day: days, month: months, year: years})
   
  };

  return (
    <>
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
                id={name}
                //   make validation messages dynamic
                {...register(name, {
                  required: "This field is required",
                  min: { value: minVal, message: `must be a valid ${name}` },
                  max: { value: maxVal, message: `must be a valid ${name}` },
                  pattern: { value: pattern, message: patternMsg },
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
        <button type="submit" className="input__submit" aria-label="submit">
          <Arrow />
        </button>
      </form>
    </>
  );
};
export default Input;
