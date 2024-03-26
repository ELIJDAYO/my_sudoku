import React, { useState } from 'react';
import '../styles/tailwind.css'; // Import Tailwind CSS
import PropTypes from 'prop-types';

const Cell = ({
  value,
  onClick,
  isPeer,
  isSelected,
  sameValue,
  prefilled,
  notes,
  conflict,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to determine background color based on cell state
  const getBackgroundColor = () => {
    if (conflict) return 'bg-red-200';
    if (isSelected) return 'bg-blue-200';
    if (isPeer) return 'bg-yellow-200';
    return isHovered ? 'bg-gray-200' : 'bg-white';
  };

  // Function to determine font color based on cell state
  const getFontColor = () => {
    if (prefilled) {
      return 'font-semibold';
    }
    else if (sameValue) return 'text-red-600';
    else{
      return 'text-green-400 font-semibold';
    };
  };

  // Get background color and font color based on cell state
  const backgroundColor = getBackgroundColor();
  const fontColor = getFontColor();

  return (
    <button
      className={`cell h-10 w-10 flex items-center justify-center border ${backgroundColor} ${fontColor}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {value}
    </button>
  );
};

Cell.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  isPeer: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  sameValue: PropTypes.bool.isRequired,
  prefilled: PropTypes.bool.isRequired,
  notes: PropTypes.instanceOf(Set),
  conflict: PropTypes.bool.isRequired,
};

Cell.defaultProps = {
  notes: null,
  value: null,
};

export default Cell;