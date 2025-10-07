"use client";
import styles from '../playgame.module.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import InstructionsModal from "./InstructionsModal";  
import welcomeStyles from '../../welcome.module.css'; 

export default function ChooseCharacterClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const player1 = searchParams.get('player1');
  const player2 = searchParams.get('player2');

  // audio logic
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(0);
  const lastClickTime = useRef(0);

  useEffect(() => {
    audioRef.current = new Audio('/thirdpage.mp3');
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
    const audio = new Audio('/thirdpage.mp3');
    audioRef.current = audio;
    audio.play().catch((e) => {
      // handle play() errors here
      console.warn('Audio play interrupted:', e);
    });
    audio.onended = () => setIsMuted(true);
  };

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

  const [selectedGreen, setSelectedGreen] = useState(null);
  const [selectedPurple, setSelectedPurple] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  if (!player1 || !player2) {
   
    return (
      <div className={styles.chooseCharacterFallbackPage}>
        <main className={styles.chooseCharacterFallbackMain}>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#000'
            
          }}>
            Spin The Wheel Before Proceeding!
            <button className={styles.backButton} onClick={() => router.back()}>Go Back</button>
          </div>
        </main>
      </div>
    );
  }

  // Robust cleanColor function
  const cleanColor = (player) => {
    if (!player) return '';
    const val = player.toLowerCase().replace('!', '').trim();
    if (val === 'green') return 'Green';
    if (val === 'purple') return 'Purple';
    return '';
  };

  const handleContinue = () => {
    // Determine which player is green/purple and which character was selected
    const player1Color = cleanColor(player1).toLowerCase();
    const player2Color = cleanColor(player2).toLowerCase();

    let player1Img = "";
    let player2Img = "";

    if (player1Color === "green") {
      player1Img = selectedGreen !== null ? greenCharacters[selectedGreen].src.replace("/", "") : "";
    } else if (player1Color === "purple") {
      player1Img = selectedPurple !== null ? purpleCharacters[selectedPurple].src.replace("/", "") : "";
    }

    if (player2Color === "green") {
      player2Img = selectedGreen !== null ? greenCharacters[selectedGreen].src.replace("/", "") : "";
    } else if (player2Color === "purple") {
      player2Img = selectedPurple !== null ? purpleCharacters[selectedPurple].src.replace("/", "") : "";
    }

    // Add default values to prevent empty strings
    const p1Img = player1Img || "green_player_1.png";
    const p2Img = player2Img || "purple_player_1.png";
    const p1Color = player1Color || "green";
    const p2Color = player2Color || "purple";

    router.push(`/playgame/skincolor?player1Img=${p1Img}&player1Color=${p1Color}&player2Img=${p2Img}&player2Color=${p2Color}`);
  };

  return (
    <div className={styles.page} style={{background: '#e9e6fa'}}>
      {/* Header and nav ... (unchanged) ... */}
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
      <main className={styles.main} style={{ filter: showInstructions ? "blur(1.4px) brightness(0.7)" : "none" }}>
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
          <p style={{fontSize: '1.05rem', color: 'black'}}>
            If you landed on <span style={{color: '#A24DE2', fontWeight: 600}}>PURPLE</span>, then pick one of the characters from the <span style={{color: '#A24DE2', fontWeight: 600}}>PURPLE</span> pile below. If you landed on <span style={{color: '#00975B', fontWeight: 600}}>GREEN</span>, then pick one of the characters from the <span style={{color: '#00975B', fontWeight: 600}}>GREEN</span> pile below. Then, click <span style={{color: '#ffd166', fontWeight: 600}}>CONTINUE</span> to learn more about your characters.
          </p>
        </div>
        {/* Character cards */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
          {/* Green row */}
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            {/* Show Player 1/2 label if they landed on green */}
            {(cleanColor(player1) === 'Green' || cleanColor(player2) === 'Green') && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 12 }}>
                {cleanColor(player1) === 'Green' && <span style={{fontWeight: 700, color: '#00975B', fontSize: '1.5rem'}}>Player 1</span>}
                {cleanColor(player2) === 'Green' && <span style={{fontWeight: 700, color: '#00975B', fontSize: '1.5rem'}}>Player 2</span>}
              </div>
            )}
            {greenCharacters.map((char, idx) => (
              <div
                key={idx}
                className={`${styles.character} ${selectedGreen !== null && selectedGreen !== idx ? styles.visuallyDimmed : ""} ${selectedGreen === idx ? styles.selected : ""}`}
                onClick={() => setSelectedGreen(idx)}
              >
                <Image src={char.src} alt={char.alt} width={111} height={111} />
              </div>
            ))}
          </div>
          {/* Purple row */}
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            {/* Show Player 1/2 label if they landed on purple */}
            {(cleanColor(player1) === 'Purple' || cleanColor(player2) === 'Purple') && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 12 }}>
                {cleanColor(player1) === 'Purple' && <span style={{fontWeight: 700, color: '#A24DE2', fontSize: '1.5rem'}}>Player 1</span>}
                {cleanColor(player2) === 'Purple' && <span style={{fontWeight: 700, color: '#A24DE2', fontSize: '1.5rem'}}>Player 2</span>}
              </div>
            )}
            {purpleCharacters.map((char, idx) => (
              <div
                key={idx}
                className={`${styles.character} ${selectedPurple !== null && selectedPurple !== idx ? styles.visuallyDimmed : ""} ${selectedPurple === idx ? styles.selected : ""}`}
                onClick={() => setSelectedPurple(idx)}
              >
                <Image src={char.src} alt={char.alt} width={111} height={111} />
              </div>
            ))}
          </div>
        </div>
        {/* Continue button */}
        <button
          className={styles.continueButton}
          style={{background: '#ffd166', color: '#222', border: '2px solid #222', fontWeight: 600, fontSize: '1.1rem', marginTop: 32}}
          onClick={handleContinue}
        >
          Continue
        </button>
      </main>
      {/* Instructions Modal */}
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
} 