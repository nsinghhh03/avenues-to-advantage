"use client";
import styles from '../playgame.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import ChooseCharacterClient from '../choosecharacter/ChooseCharacterClient';

export default function SkinColorPage() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(0);
  const lastClickTime = useRef(0);

  // Audio playback with toggle mute/play
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
    // Use a placeholder audio for now
    const audio = new Audio('/something.mp3');
    audioRef.current = audio;
    audio.play().catch(() => {});
    audio.onended = () => setIsMuted(true);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className={styles.page} style={{ background: '#e9e6fa' }}>
      {/* Header and nav */}
      <header className={styles.header}>
        <button className={styles.backButton} aria-label="Back" onClick={() => router.back()}>←</button>
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
        {/* Description box */}
        <div style={{
          background: '#fff',
          border: '3px solid #222',
          borderRadius: 20,
          maxWidth: 650,
          margin: '32px auto 24px auto',
          padding: '16px 16px 12px 16px',
          paddingRight: 56, // <-- add this line
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          position: 'relative',
          fontSize: '0.98rem',
          lineHeight: 1.45,
          fontWeight: 600,
          textAlign: 'center',
          fontFamily: 'inherit',
        }}>
          <button
            className={styles.speakerIcon}
            onClick={handleSpeak}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              position: 'absolute',
              right: 18,
              top: 18,
              cursor: 'pointer'
            }}
            aria-label="Play audio"
          >
            <Image
              src={isMuted ? "/mute.png" : "/speaker-filled-audio-tool.png"}
              alt={isMuted ? "Muted" : "Speaker"}
              width={24}
              height={24}
            />
          </button>
          <span>
            Your characters have different skin colors! Our skin gets its color from something in our bodies called <span style={{ color: '#e1b900', fontWeight: 700 }}>melanin</span>. If you have more melanin, your skin is darker, and if you have less, your skin is lighter. Melanin gives us lots of beautiful shades. People sometimes use color words like Black and White to describe skin tones. Your character has dark skin, so we might say that your character is Black. My character has lighter skin, so we might say my character is White. Sometimes we also say ‘people of color’ to talk about all the groups of people who aren’t white.”
          </span>
        </div>
        {/* Illustration */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '32px 0 8px 0' }}>
          <Image src="/kids.png" alt="Two children and a sun" width={360} height={270} style={{ marginBottom: 12 }} />
        </div>
        {/* Continue button */}
        <button className={styles.continueButton} style={{ background: '#ffd166', color: '#222', border: '2px solid #222', fontWeight: 600, fontSize: '1.1rem', margin: '8px auto 0 auto', display: 'block'}} onClick={() => router.push('/playgame')}>Continue</button>
      </main>
    </div>
  );
} 