'use client';
import { useState } from "react";
import styles from "./page.module.css";



function Dice({ onRoll }){
    const [diceValue, setDiceValue] = useState(1);
    const [rolling, setRolling] = useState(false);

    const diceFaces = {
        1: <Face1 />,
        2: <Face2 />,
        3: <Face3 />,
        4: <Face4 />,    
        5: <Face5 />,
        6: <Face6 />
    }
    const roll = () => {
        onRoll?.();
        setRolling(true);
        const newRoll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(newRoll);
        setTimeout(() => {  
            setRolling(false);
        }, 1000);
    }
    return(
    <div className = {styles.diceFace} 
        onClick = {roll}
    >
        {rolling ? <Face1 /> : diceFaces[diceValue]} 
    </div>
    );  
}

function Face1() {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" className={styles.diceSvg}>
        <circle cx="50" cy="50" r="8" fill="#222" />
      </svg>
    );
  }
  
  function Face2() {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" className={styles.diceSvg}>
        <circle cx="25" cy="25" r="8" fill="#222" />
        <circle cx="75" cy="75" r="8" fill="#222" />
      </svg>
    );
  }
  
  function Face3() {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" className={styles.diceSvg}>
        <circle cx="25" cy="25" r="8" fill="#222" />
        <circle cx="50" cy="50" r="8" fill="#222" />
        <circle cx="75" cy="75" r="8" fill="#222" />
      </svg>
    );
  }
  
  function Face4() {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" className={styles.diceSvg}>
        <circle cx="25" cy="25" r="8" fill="#222" />
        <circle cx="75" cy="25" r="8" fill="#222" />
        <circle cx="25" cy="75" r="8" fill="#222" />
        <circle cx="75" cy="75" r="8" fill="#222" />
      </svg>
    );
  }
  
  function Face5() {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" className={styles.diceSvg}>
        <circle cx="25" cy="25" r="8" fill="#222" />
        <circle cx="75" cy="25" r="8" fill="#222" />
        <circle cx="50" cy="50" r="8" fill="#222" />
        <circle cx="25" cy="75" r="8" fill="#222" />
        <circle cx="75" cy="75" r="8" fill="#222" />
      </svg>
    );
  }
  
  function Face6() {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" className={styles.diceSvg}>
        <circle cx="25" cy="25" r="8" fill="#222" />
        <circle cx="75" cy="25" r="8" fill="#222" />
        <circle cx="25" cy="50" r="8" fill="#222" />
        <circle cx="75" cy="50" r="8" fill="#222" />
        <circle cx="25" cy="75" r="8" fill="#222" />
        <circle cx="75" cy="75" r="8" fill="#222" />
      </svg>
    );
  }
export default Dice;
