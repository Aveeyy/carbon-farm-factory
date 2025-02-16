import React, { useEffect } from 'react';
import '../components/ui/styles.css';

const SpinningGlobe: React.FC = () => {
    useEffect(() => {
      // Optional logic for dynamic behavior
      console.log("Spinning globe is rendered");
    }, []);
  
    return <div id="earth" />;
  };
  
  export default SpinningGlobe;
