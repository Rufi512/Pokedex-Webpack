import React, { useState, useEffect, useRef } from "react";

export const ProgressCircle = (props) => {
  const [circle, setCircle] = useState(100);
  const [offset, SetOffset] = useState(190);
  const progress = useRef(null);

  useEffect(() => {
    const load = () => {
      const radius = progress.current.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      const value = circumference - props.points / 100 * circumference;
      setCircle(circumference);
      SetOffset(value);
     
    };
    load();
  }, [props]);

  
  return (
       
     <svg className="progress-ring" style={{marginBottom:'15px'}} width="74" height="74">
     
      <circle
        className="progress-ring__circle"
        fill="transpartent"
        stroke="#232323"
        strokeWidth="5"
        r="24"
        cy="28"
        cx="27"
        strokeDasharray="151, 151"
        strokeDashoffset="0" 
      />

      <circle
        ref={progress}
        className="progress-ring__circle"
        fill="transpartent"
        stroke={props.color}
        strokeDasharray="151, 151"
        strokeDashoffset={`${offset >= 0 ? offset : 0 }`}
        strokeWidth="5"
        r="24"
        cy="28"
        cx="27"
      />

      <text x="49%" y="54%" textAnchor="middle" fill="#000"  dy=".3em">
        {props.points}
      </text>
    </svg>
    
  );
};
