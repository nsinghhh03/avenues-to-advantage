"use client";
import styles from './playgame.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
let lastClickTime = 0;
export default function PlayGame() {
  if (Date.now() - lastClickTime < 10000){
    return ;
  }
  lastClickTime = Date.now();
  const router = useRouter();

  const handleSpeak = async () => {
    const text = "Today we are going to play a board game together! This game will teach us about how external opportunities or barriers influence different people.";
    const res = await fetch('/api/tts', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' }
    });
    const audioBlob = await res.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backButton} aria-label="Back" onClick={() => router.push("/")}>←</button>
        <h1 className={styles.title}>Play Game</h1>
      </header>
      <nav className={styles.navbar}>
        <button className={`${styles.navButton} ${styles.active}`}> 
          <Image src="/game-controller.png" alt="Controller" width={24} height={24} />
          Play Game
        </button>
        <button className={`${styles.navButton} ${styles.instructions}`}> 
          <Image src="/question-sign.png" alt="Instructions" width={24} height={24} />
          Instructions
        </button>
        <button className={`${styles.navButton} ${styles.orange}`}> 
          <Image src="/dslr-camera.png" alt="View Videos" width={24} height={24} />
          View Videos
        </button>
        <button className={`${styles.navButton} ${styles.blue}`}> 
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
            <Image src="/speaker-filled-audio-tool.png" alt="Speaker" width={24} height={24} />
          </button>
          <p>
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
        <button className={styles.continueButton}>Continue</button>
      </main>
    </div>
  );
} 