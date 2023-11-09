import PropTypes from "prop-types";

const Output = ({ daysRef, monthsRef, yearsRef }) => {
  return (
    <>
      <p className="output__wrapper">
        <span className="output__num" ref={yearsRef}>
          --
        </span>
        years
      </p>
      <p className="output__wrapper">
        <span className="output__num" ref={monthsRef}>
          --
        </span>
        months
      </p>

      <p className="output__wrapper">
        <span className="output__num" ref={daysRef}>
          --
        </span>
        days
      </p>
    </>
  );
};

Output.propTypes = {
  daysRef: PropTypes.object,
  monthsRef: PropTypes.object,
  yearsRef: PropTypes.object,
};
export default Output;
