"use client";
import styles from './playgame.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import InstructionsModal from "./choosecharacter/InstructionsModal"; // adjust path as needed

 export default function PlayGame() {
  const [showInstructions, setShowInstructions] = useState(false);
  
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(0);
  const lastClickTime = useRef(0);
  const [animateInstructions, setAnimateInstructions] = useState(true);
  const [animationPlayed, setAnimationPlayed] = useState(false);
 


 const handleSpeak = () => {
  
  if (audioRef.current && !audioRef.current.paused) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0; 
    setIsMuted(true);
    return;
  }

 
  if (Date.now() - lastClickTime.current < 10000) {
    return;
  }
  lastClickTime.current = Date.now();

  const audio = new Audio('/firstpage.mp3');
  audioRef.current = audio;
  setIsMuted(false);

  audio.play();
};
useEffect(() => {
    return () => {
      if (audioRef.current ) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);


  

  
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.headerBackButton} aria-label="Back" onClick={() => router.push("/")}>←</button>
        <h1 className={styles.title}>Play Game</h1>
      </header>
      <nav className={styles.navbar}>
        
        <button id = "playGameID"  className={`${styles.navButton} ${styles.active}`} onClick={() => {router.push('/playgame')}}
          style = {{opacity : !animateInstructions ? 1 : 0.5}} > 
          <Image src="/game-controller.png" alt="Controller" width={24} height={24} />
          Play Game
        </button>
        <button id  = "instructionsID" 
          className={`${styles.navButton} ${styles.instructions} ${
    animateInstructions ? styles['instructions-animation'] : ''
  }`} onClick={() => {
  setShowInstructions(true);
    if(!animationPlayed){
      setAnimateInstructions(false);
    }

  }}
  onAnimationEnd={() => {
    setAnimateInstructions(false);
    setAnimationPlayed(true);
  }}

  
        >
          <Image src="/question-sign.png" alt="Instructions" width={24} height={24} />
          Instructions
        </button>
        <button id = "cameraID" className={`${styles.navButton} ${styles.orange}`}
        style = {{opacity : !animateInstructions ? 1 : 0.5}}> 
          <Image src="/dslr-camera.png" alt="View Videos" width={24} height={24} />
          View Videos
        </button>
        <button id = "cardsID" className={`${styles.navButton} ${styles.blue}`}
        style = {{opacity : !animateInstructions ? 1 : 0.5}}> 
          <Image src="/cards.png" alt="View Cards" width={24} height={24} />
          View Cards
        </button>
      </nav>
      <main className={styles.main}>
        <div className={styles.descriptionBox}>
          <button
            className={styles.speakerIcon}
            onClick={handleSpeak}
            style={{background: 'none', border: 'none', padding: 0, marginRight: 10, cursor: 'pointer'}}
          >
            <Image
              src={isMuted ? "/mute.png" : "/speaker-filled-audio-tool.png"}
              alt={isMuted ? "Muted" : "Speaker"}
              width={24}
              height={24}
            />
          </button>
          
          <p   style={{ color: 'black' }}> 
        
            Today we are going to play a board game together! This game will teach us about how external opportunities or barriers influence different people.
          </p>
        </div>
        <div className={styles.boardImageWrapper}>
          <Image
            src="/gamepic.webp"
            alt="Board game illustration"
            width={500}
            height={350}
            className={styles.boardImage}
            priority
          />
        </div> 
        <button className={styles.continueButton} onClick={() => router.push("/playgame/spinner")}>Continue</button>
      </main>
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}
 