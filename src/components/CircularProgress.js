import React from 'react';
import PropTypes from 'prop-types';


const CircularProgress = ({ number, percent }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
  
    return (
        <svg className="circular-progress w-12 h-12" viewBox="0 0 100 100">
          <circle
            className="progress-ring__circle"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#e0e0e0"
            strokeWidth="6"
          />
          <circle
            className="progress-ring__circle progress-ring__circle--complete"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#6495ED"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={-offset}
            strokeLinecap="round"
          />
          {/* Apply styles directly to the text element */}
          <text
            className="progress-text"
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle"
            fill="#6082B6"
            fontSize="30"
            fontWeight="bold"
            style={{ fontFamily: 'sans-serif' }} // Add style here
          >
            {number}
          </text>
        </svg>
      );
    };
    
    CircularProgress.propTypes = {
      percent: PropTypes.number.isRequired,
      number: PropTypes.number.isRequired,
    };
    
  
  export default CircularProgress;