import { useState } from "react";
import "./slider.css";
import PropTypes from "prop-types";

function Slider({ MIN, MAX, initialValue, onChange }) {
  var [value, setValue] = useState(initialValue);
  if (MIN == 0 && MAX == 1) {
    MIN = 0;
    MAX = 100;
    value = value * 100;
  }

  const gradientPercentage = ((value - MIN) / (MAX - MIN)) * 100;

  const sliderStyle = {
    background: `linear-gradient(to right, #5C6BC0 ${gradientPercentage}%,
     #9FA8DA ${gradientPercentage}%
     )`,
  };

  const handleOnChange = (e) => {
    if (MIN === 0 && MAX === 100) {
      setValue(e.target.value / 100);
      onChange(e.target.value / 100);
    } else {
      setValue(e.target.value);
      onChange(e.target.value);
    }
  };
  const displayValue =
    MIN === 0 && MAX === 100
      ? ((value - MIN) / (MAX - MIN)).toFixed(2)
      : Math.round(Number(value));
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
      />
      <div className="value">{displayValue}</div>
    </>
  );
}

Slider.propTypes = {
  MIN: PropTypes.number,
  MAX: PropTypes.number,
  initialValue: PropTypes.number,
  onChange: PropTypes.func,
};

export default Slider;
