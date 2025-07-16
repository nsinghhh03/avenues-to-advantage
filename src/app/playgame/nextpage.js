"use client";
import styles from './playgame.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import InstructionsModal from "./choosecharacter/InstructionsModal";

export default function NextPage() {
  const router = useRouter();
  const [showInstructions, setShowInstructions] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);
  const lastClickTime = useRef(0);

  useEffect(() => {
    audioRef.current = new Audio('/a_long_time_ago.mp3');
    audioRef.current.onended = () => setIsMuted(true);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleSpeak = async () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsMuted(true);
      return;
    }
    if (Date.now() - lastClickTime.current < 10000) return;
    lastClickTime.current = Date.now();
    setIsMuted(false);
    // Always create a new Audio instance to avoid race conditions
    const audio = new Audio('/a_long_time_ago.mp3');
    audioRef.current = audio;
    audio.play().catch((e) => {
      // Optionally handle play() errors here
      console.warn('Audio play interrupted:', e);
    });
    audio.onended = () => setIsMuted(true);
  };

  return (
    <div className={styles.page} style={{background: '#e9e6fa'}}>
      <header className={styles.header}>
        <button className={styles.headerBackButton} aria-label="Back" onClick={() => router.back()}>←</button>
        <h1 className={styles.title}>Play Game</h1>
      </header>
      <nav className={styles.navbar}>
        <button className={`${styles.navButton} ${styles.active}`} onClick={() => router.push('/playgame')}> 
          <Image src="/game-controller.png" alt="Controller" width={24} height={24} />
          Play Game
        </button>
        <button className={`${styles.navButton} ${styles.instructions}`} onClick={() => setShowInstructions(true)}> 
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
        <div className={styles.descriptionBox} style={{maxWidth: 700, marginBottom: 32, position: 'relative'}}>
          <button
            className={styles.speakerIcon}
            onClick={handleSpeak}
            style={{background: 'none', border: 'none', padding: 0, marginRight: 10, cursor: 'pointer', position: 'absolute', right: 18, top: 18}}
            aria-label="Play audio"
          >
            <Image
              src={isMuted ? "/mute.png" : "/speaker-filled-audio-tool.png"}
              alt={isMuted ? "Muted" : "Speaker"}
              width={24}
              height={24}
            />
          </button>
          <p style={{fontSize: '1.05rem', textAlign: 'center'}}>
            {/* Add your page's main text here */}
            This is the next page after skincolor. Add your content here!
          </p>
        </div>
        {/* Image container placeholder */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '32px 0 8px 0', minHeight: 200, minWidth: 300, background: '#fff', borderRadius: 12, boxShadow: '0 3px 0 #222', border: '2px solid #222', justifyContent: 'center' }}>
          {/* Replace the src below with your chosen image when ready */}
          <Image src="/file.svg" alt="Placeholder" width={200} height={150} style={{ margin: 24 }} />
        </div>
        <button className={styles.continueButton} style={{ background: '#ffd166', color: '#222', border: '2px solid #222', fontWeight: 600, fontSize: '1.1rem', margin: '8px auto 0 auto', display: 'block'}} onClick={() => router.push('/playgame/anotherpage')}>
          Continue
        </button>
      </main>
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
} 