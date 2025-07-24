"use client";
import styles from '../playgame.module.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, useEffect, Suspense } from 'react';
import InstructionsModal from "./InstructionsModal";

function SkinColorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const player1Img = searchParams.get('player1Img');
  const player1Color = searchParams.get('player1Color');
  const player2Img = searchParams.get('player2Img');
  const player2Color = searchParams.get('player2Color');
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
    const audio = new Audio('/melanin_fast.mp3');
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
            <button className={styles.headerBackButton} aria-label="Back" onClick={() => router.back()}>←</button>
            <h1 style={{ fontSize: '1.6rem', color: '#222', fontWeight: 'bold', fontFamily: "'Space Grotesk', Arial, sans-serif", margin: 0 }}>Play Game</h1>
          </header>
          <nav className={styles.navbar}>
            <button className={`${styles.navButton} ${styles.active}`} onClick={() => router.push('/playgame')}> 
              <Image src="/game-controller.png" alt="Controller" width={24} height={24} />
              Play Game
            </button>
            <button className={`${styles.navButton} ${styles.instructions} `} onClick={() => setShowInstructions(true)}> 
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
          <div className={styles.descriptionBox} style={{ maxWidth: 830 }}>
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
            <p style={{margin: 0}}>
              <span style={{fontWeight: 'bold'}}>
                Your characters have different skin colors! Our skin gets its color from something in our bodies called <span style={{ color: '#e1b900' }}>melanin</span>.
              </span> If you have more melanin, your skin is darker, and if you have less, your skin is lighter. Melanin gives us lots of beautiful shades. People sometimes use color words like Black and White to describe skin tones. One player has dark skin, so we might say that player is Black. The other player has lighter skin, so we might say that player is White. Sometimes we also say 'people of color' to talk about all the groups of people who aren't white Sometimes we also say 'people of color' to talk about all the groups of people who aren't white."
            </p>
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
          <button className={styles.continueButton} style={{ background: '#ffd166', color: '#222', border: '2px solid #222', fontWeight: 600, fontSize: '1.1rem', margin: '8px auto 0 auto', display: 'block'}} onClick={() => router.push(`/playgame/nextpage?player1Img=${player1Img}&player1Color=${player1Color}&player2Img=${player2Img}&player2Color=${player2Color}`)}>
            Continue
          </button>
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

export default function SkinColorPage() {
  return (
    <Suspense fallback={<div style={{color: '#222', fontSize: 24, fontWeight: 700, textAlign: 'center', marginTop: 100}}>An error occurred. Please Try again.</div>}>
      <SkinColorContent />
    </Suspense>
  );
} 