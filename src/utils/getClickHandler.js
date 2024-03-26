// Define the getClickHandler function
const getClickHandler = (singleClickCallback, ) => {
    let clickCount = 0;
  
    return () => {
      clickCount++;
  
      // Execute single or double click callback based on click count
      if (clickCount === 1) {
        setTimeout(() => {
          if (clickCount === 1) {
            // Single click
            singleClickCallback();
          } 
          clickCount = 0; // Reset click count
        }, 250); // Adjust the delay to define double click interval
      }
    };
  };
  
  // Export the getClickHandler function
  export { getClickHandler };