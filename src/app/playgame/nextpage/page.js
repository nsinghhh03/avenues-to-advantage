"use client";
import styles from '../playgame.module.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect, Suspense } from 'react';
import InstructionsModal from "../choosecharacter/InstructionsModal";

function NextPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const player1Img = searchParams.get('player1Img');
  const player1Color = searchParams.get('player1Color');
  const player2Img = searchParams.get('player2Img');
  const player2Color = searchParams.get('player2Color');
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
        <div className={styles.descriptionBox} style={{maxWidth: 830, position: 'relative', paddingTop: 32, paddingRight: 40}}>
          <button
            className={styles.speakerIcon}
            onClick={handleSpeak}
            style={{background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer', position: 'absolute', right: 18, top: 8}}
            aria-label="Play audio"
          >
            <Image
              src={isMuted ? "/mute.png" : "/speaker-filled-audio-tool.png"}
              alt={isMuted ? "Muted" : "Speaker"}
              width={24}
              height={24}
            />
          </button>
          <p style={{margin: 0, fontWeight: 'bold'}}>
            A long time ago, people in power decided to use these skin color labels to sort people into a made up idea called race. Over time, people started treating these race labels as really important, even though they were made up. It's important to mention that skin color or race can't tell you about what people are like on the inside, like their favorite books or what they know. To learn these things about different people, you need to ask! Now that you have learned about your characters, click <span style={{color: '#D3D730', fontWeight: 700}}>Instructions</span> on the top to review the rules of the game. Then, click <span style={{color: '#ffd166', fontWeight: 700}}>Continue</span> to begin!
          </p>
        </div>
        <button className={styles.continueButton} style={{ background: '#ffd166', color: '#222', border: '2px solid #222', fontWeight: 600, fontSize: '1.1rem', margin: '190px auto 0 auto', display: 'block'}} onClick={() => router.push(`/playgame/maingame?player1Img=${player1Img}&player1Color=${player1Color}&player2Img=${player2Img}&player2Color=${player2Color}`)}>
          Continue
        </button>
      </main>
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}

export default function NextPage() {
  return (
    <Suspense fallback={<div style={{color: '#222', fontSize: 24, fontWeight: 700, textAlign: 'center', marginTop: 100}}>An error occurred. Please Try again.</div>}>
      <NextPageContent />
    </Suspense>
  );
} 