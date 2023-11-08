const Output = ({outputState}) => {
  return (
    <>
     <p className="output__wrapper">
          <span className="output__num">
            {outputState.year ? outputState.year.toFixed(0) : "--"}
          </span>
          years
        </p>
        <p className="output__wrapper">
          <span className="output__num">
            {outputState.month ? outputState.month.toFixed(0) : "--"}
          </span>
          months
        </p>

        <p className="output__wrapper">
          <span className="output__num">
            {outputState.day ? outputState.day.toFixed(0) : "--"}
          </span>
          days
        </p></>
  )
}
export default Output