import Image from "next/image";
import { useRef, useState } from "react";
import styles from "../playgame.module.css";

export default function EqualityInfo({ text }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#fff',
      border: '2px solid #222',
      borderRadius: '8px',
      padding: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      zIndex: 1000,
      minWidth: '250px',
      marginBottom: '8px'
    }}>
      <p style={{ 
        textAlign: 'center', 
        fontWeight: 600, 
        fontSize: '0.9rem', 
        margin: 0,
        color: '#222'
      }}>
        {text}
      </p>
      
    </div>
  );
}