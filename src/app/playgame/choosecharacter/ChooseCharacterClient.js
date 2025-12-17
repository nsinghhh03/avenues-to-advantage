"use client";
import styles from '../playgame.module.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import InstructionsModal from "./InstructionsModal";  


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

    const audio = new Audio('/thirdpage.mp3');
    audioRef.current = audio;
    audio.play().catch((e) => console.warn('Audio play interrupted:', e));
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

  const [selectedCharacter, setSelectedCharacter] = useState({ player1: null, player2: null });
  const [showInstructions, setShowInstructions] = useState(false);

 

  if ((!player1 || !player2)) {
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
            Spin The Wheel(s) Before Proceeding!
            <button className={styles.backButton} onClick={() => router.back()}>Go Back</button>
          </div>
        </main>
      </div>
    );
  }

  const cleanColor = (player) => {
    if (!player) return '';
    const val = player.toLowerCase().replace('!', '').trim();
    if (val === 'green') return 'Green';
    if (val === 'purple') return 'Purple';
    return '';
  };

  const getCharacters = (color) => {
    if (color === 'Green') return greenCharacters;
    if (color === 'Purple') return purpleCharacters;
    return [];
  };

  const handleContinue = () => {
    const player1Color = cleanColor(player1);
    const player2Color = cleanColor(player2);

    const p1Img = selectedCharacter.player1 !== null 
      ? getCharacters(player1Color)[selectedCharacter.player1].src.replace(/^\//, "")
      : "green_player_1.png";
    const p2Img = selectedCharacter.player2 !== null 
      ? getCharacters(player2Color)[selectedCharacter.player2].src.replace(/^\//, "")
      : "purple_player_1.png";

    router.push(`/playgame/skincolor?player1Img=${p1Img}&player1Color=${player1Color.toLowerCase()}&player2Img=${p2Img}&player2Color=${player2Color.toLowerCase()}`);
  };

  const players = [
    { id: 1, color: cleanColor(player1) },
    { id: 2, color: cleanColor(player2) }
  ];

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

      <main className={styles.main} style={{ filter: showInstructions ? "blur(1.4px) brightness(0.7)" : "none" }}>
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

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
          {players.map(player => {
            const charArr = getCharacters(player.color);
            const selected = selectedCharacter[`player${player.id}`];

            return (
              <div key={player.id} style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 12 }}>
                  <span style={{fontWeight: 700, color: player.color === 'Green' ? '#00975B' : '#A24DE2', fontSize: '1.5rem'}}>
                    Player {player.id}
                  </span>
                </div>
                {charArr.map((char, idx) => (
                  <div
                    key={idx}
                    className={`${styles.character} ${selected !== null && selected !== idx ? styles.visuallyDimmed : ""} ${selected === idx ? styles.selected : ""}`}
                    onClick={() => setSelectedCharacter(prev => ({...prev, [`player${player.id}`]: idx}))}
                  >
                    <Image src={char.src} alt={char.alt} width={111} height={111} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <button
          className={styles.continueButton}
          style={{background: '#ffd166', color: '#222', border: '2px solid #222', fontWeight: 600, fontSize: '1.1rem', marginTop: 32}}
          onClick={handleContinue}
        >
          Continue
        </button>
      </main>

      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}
