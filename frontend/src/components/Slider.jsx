import { useState, useEffect } from "react";
import "./slider.css";
import PropTypes from "prop-types";

function Slider({ MIN, MAX, initialValue, onChange }) {
  const [value, setValue] = useState(initialValue ?? MIN);

  useEffect(() => {
    setValue(initialValue ?? MIN);
  }, [initialValue, MIN]);

  const gradientPercentage = ((value - MIN) / (MAX - MIN)) * 100;

  const sliderStyle = {
    background: `linear-gradient(to right, #5C6BC0 ${gradientPercentage}%, #9FA8DA ${gradientPercentage}%)`,
  };

  const handleOnChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <>
      <input
        type="range"
        value={value}
        onChange={handleOnChange}
        className="slider"
        style={sliderStyle}
        min={MIN}
        max={MAX}
        step={MIN === 0 && MAX === 1 ? 0.01 : 1} // Adjust the step for 0-1 range
      />
      <div className="value">{value}</div>
    </>
  );
}

Slider.propTypes = {
  MIN: PropTypes.number.isRequired,
  MAX: PropTypes.number.isRequired,
  initialValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
