import { useForm } from "react-hook-form";
import { inputs } from "../data";
import { calculateAge } from "../utils/calculateAge";
import gsap from "gsap";
import PropTypes from "prop-types";
import { Arrow } from "./Arrow";
import { useRef } from "react";

const Input = ({ daysRef, monthsRef, yearsRef }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const arrowRef = useRef();

  const onSubmit = (data) => {
    // get the last day of the birthMonth to check if the provided birthDay is a valid day
    const birthMonthLastDay = new Date(data.year, data.month, 0).getDate();
    const currentYear = new Date().getFullYear();

    if (data.year > currentYear) {
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

    // reset age numbers so we can animate the new values
    gsap.to(daysRef.current, { innerText: "" });
    gsap.to(monthsRef.current, { innerText: "" });
    gsap.to(yearsRef.current, { innerText: "" });

    // calculate the age if everything is OK
    const { years, months, days } = calculateAge(
      data.year,
      data.month,
      data.day
    );

    // animate the age values
    gsap.to(daysRef.current, { innerText: days, roundProps: "innerText" });
    gsap.to(monthsRef.current, { innerText: months, roundProps: "innerText" });
    gsap.to(yearsRef.current, { innerText: years, roundProps: "innerText" });

    // reset the form-input fields
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputs.map(
        ({
          inputName,
          placeholder,
          minVal,
          maxVal,
          pattern,
          patternMsg,
          errorMessage,
        }) => (
          <div className="input__wrapper" key={inputName}>
            <label
              className={
                errors[inputName]
                  ? "input__name input__name--error"
                  : "input__name"
              }
              htmlFor={inputName}
            >
              {inputName}
            </label>

            <input
              autoComplete="off"
              className={
                errors[inputName]
                  ? "input__input input__input--error"
                  : "input__input"
              }
              type="number"
              placeholder={placeholder}
              id={inputName}
              //   make validation messages dynamic
              {...register(inputName, {
                required: "This field is required",
                min: { value: minVal, message: errorMessage },
                max: { value: maxVal, message: errorMessage },
                pattern: { value: pattern, message: patternMsg },
              })}
            />

            {errors[inputName] && (
              <p className="input__error" role="alert">
                {errors[inputName]?.message}
              </p>
            )}
          </div>
        )
      )}
      <hr className="input__bar" />
      <button
        type="submit"
        className="input__submit"
        aria-label="submit"
        onClick={() =>
          gsap.fromTo(
            arrowRef.current,
            { strokeDasharray: 100, strokeDashoffset: -50 },
            { strokeDashoffset: 0,duration:1 }
          )
        }
      >
        <Arrow arrowRef={arrowRef} />
      </button>
    </form>
  );
};

Input.propTypes = {
  daysRef: PropTypes.object,
  monthsRef: PropTypes.object,
  yearsRef: PropTypes.object,
};
export default Input;
