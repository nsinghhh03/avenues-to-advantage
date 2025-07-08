"use client";
import styles from '../playgame.module.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

export default function ChooseCharacterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const player1 = searchParams.get('player1');
  const player2 = searchParams.get('player2');

  // Audio state and logic (same as spinner page)
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(0);
  const lastClickTime = useRef(0);

  const handleSpeak = async () => {
    // If audio is currently playing, pause and mute
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsMuted(true);
      return;
    }
    // Otherwise, play audio as before
    if (Date.now() - lastClickTime.current < 10000) return;
    lastClickTime.current = Date.now();
    setIsMuted(false);
    const audio = new Audio('/page3.mp3');
    audioRef.current = audio;
    audio.play();
    // When audio ends, set isMuted back to true
    audio.onended = () => setIsMuted(true);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const greenCharacters = [
    { src: '/green_player_1.png', alt: 'Green Girl 1' },
    { src: '/green_player_2.png', alt: 'Green Boy 1' },
    { src: '/green_player_3.png', alt: 'Green Girl 2' },
    { src: '/green_player_4.png', alt: 'Green Boy 2' },
  ];
  const purpleCharacters = [
    { src: '/purple_player_1.png', alt: 'Purple Girl 1' },
    { src: '/purple_player_2.png', alt: 'Purple Girl 2' },
    { src: '/purple_player_3.png', alt: 'Purple Boy 1' },
    { src: '/purple_player_4.png', alt: 'Purple Girl 3' },
  ];

  // Wait for hydration and for query params to be available
  if (!player1 || !player2) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page} style={{background: '#e9e6fa'}}>
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
        {/* Instructions */}
        <div className={styles.descriptionBox} style={{maxWidth: 700, marginBottom: 32}}>
          <button
            className={styles.speakerIcon}
            onClick={handleSpeak}
            style={{background: 'none', border: 'none', padding: 0, marginRight: 10, cursor: 'pointer'}}
            aria-label="Play instructions"
          >
            <Image
              src={isMuted ? "/mute.png" : "/speaker-filled-audio-tool.png"}
              alt={isMuted ? "Muted" : "Speaker"}
              width={24}
              height={24}
            />
          </button>
          <p style={{fontSize: '1.05rem'}}>
            If you landed on <span style={{color: '#A24DE2', fontWeight: 600}}>PURPLE</span>, then pick one of the characters from the <span style={{color: '#A24DE2', fontWeight: 600}}>PURPLE</span> pile below. If you landed on <span style={{color: '#00975B', fontWeight: 600}}>GREEN</span>, then pick one of the characters from the <span style={{color: '#00975B', fontWeight: 600}}>GREEN</span> pile below. Then, click <span style={{color: '#ffd166', fontWeight: 600}}>CONTINUE</span> to learn more about your characters.
          </p>
        </div>
        {/* Character cards */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
          {/* Green row */}
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            {/* Show Player 1/2 label if they landed on green */}
            {player1 === 'Green!' && <span style={{fontWeight: 700, color: '#00975B', marginRight: 8}}>Player 1</span>}
            {player2 === 'Green!' && <span style={{fontWeight: 700, color: '#00975B', marginRight: 8}}>Player 2</span>}
            {greenCharacters.map((char, idx) => (
              <Image key={idx} src={char.src} alt={char.alt} width={111} height={111} />
            ))}
          </div>
          {/* Purple row */}
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            {/* Show Player 1/2 label if they landed on purple */}
            {player1 === 'Purple!' && <span style={{fontWeight: 700, color: '#A24DE2', marginRight: 8}}>Player 1</span>}
            {player2 === 'Purple!' && <span style={{fontWeight: 700, color: '#A24DE2', marginRight: 8}}>Player 2</span>}
            {purpleCharacters.map((char, idx) => (
              <Image key={idx} src={char.src} alt={char.alt} width={111} height={111} />
            ))}
          </div>
        </div>
        {/* Continue button */}
        <button className={styles.continueButton} style={{background: '#ffd166', color: '#222', border: '2px solid #222', fontWeight: 600, fontSize: '1.1rem', marginTop: 32}}>
          Continue
        </button>
      </main>
    </div>
  );
} 
