"use client";
import styles from '../playgame.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import InstructionsModal from "./InstructionsModal";

export default function SkinColorPage() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(0);
  const lastClickTime = useRef(0);
  const [showInstructions, setShowInstructions] = useState(false);

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
    const audio = new Audio('/melanin.mp3');
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
    <div className={styles.outer}>
      <div
        className={styles.page}
        style={{ background: '#e9e6fa' }}
      >
        <main
          className={styles.main}
          style={{ filter: showInstructions ? "blur(1.4px) brightness(0.7)" : "none", transition: "filter 0.3s" }}
        >
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
          {/* Description box */}
          <div
            className="skincolor-descbox"
            style={{
              background: 'linear-gradient(180deg, #fcfcff 80%, #f3f3fa 100%)',
              border: '1.2px solid #d2d2e0',
              borderRadius: 36,
              maxWidth: 780,
              margin: '40px auto 32px auto',
              padding: '38px 48px 34px 48px',
              boxShadow: '-4px -4px 16px 0 rgba(34,34,34,0.13), 0 4px 12px rgba(34,34,34,0.25), 3px 6px 0 #222',
              position: 'relative',
              fontSize: '1.18rem',
              lineHeight: 1.62,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              color: '#181818',
              letterSpacing: '0.01em',
              transition: 'box-shadow 0.2s, border 0.2s',
            }}
          >
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
          {/* Add hover effect for the description box */}
          <style jsx>{`
            .skincolor-descbox:hover {
              box-shadow: 0 8px 24px rgba(34,34,34,0.28), 4px 8px 0 #222;
              border-color: #b6b6c8;
            }
          `}</style>
          {/* Illustration */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '32px 0 8px 0' }}>
            <Image src="/kids.png" alt="Two children and a sun" width={500} height={375} style={{ marginBottom: 12 }} />
          </div>
          {/* Continue button */}
          <button className={styles.continueButton} style={{ background: '#ffd166', color: '#222', border: '2px solid #222', fontWeight: 600, fontSize: '1.1rem', margin: '8px auto 0 auto', display: 'block'}} onClick={() => router.push('/playgame')}>Continue</button>
        </main>
      </div>
      {/* Instructions Modal rendered outside blurred area */}
      {showInstructions && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <InstructionsModal onClose={() => setShowInstructions(false)} />
        </div>
      )}
    </div>
  );
} 