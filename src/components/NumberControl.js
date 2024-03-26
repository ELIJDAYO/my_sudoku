import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from './CircularProgress'; // Assuming CircularProgress.js is in the same directory

const NumberControl = ({ number, onClick, completionPercentage }) => {
  return (
    <div
      key={number}
      className="number-control relative hover:bg-gray-200 cursor-pointer"
      onClick={onClick}
    >
      <CircularProgress number={number} percent={completionPercentage} />
    </div>
  );
};

NumberControl.propTypes = {
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  completionPercentage: PropTypes.number.isRequired,
};

export default NumberControl;