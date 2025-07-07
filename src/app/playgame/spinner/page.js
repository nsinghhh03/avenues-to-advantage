"use client";
import styles from '../playgame.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';

export default function SpinnerPage() {
  // Navigation and audio state
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(0);
  const lastClickTime = useRef(0);

  // Spinner state - track spinning animation and rotation angles for both players
  const [spinning1, setSpinning1] = useState(false);
  const [spinning2, setSpinning2] = useState(false);
  const [angle1, setAngle1] = useState(0);
  const [angle2, setAngle2] = useState(0);

  // Audio playback with rate limiting (prevents spam clicking)
  const handleSpeak = async () => {
    if (Date.now() - lastClickTime.current < 10000) {
      return;
    }
    lastClickTime.current = Date.now();
    setIsMuted(false);
    const audio = new Audio('/firstpage.mp3');
    audioRef.current = audio;
    audio.play();
  };

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Spinner logic - handles spinning animation for both players
  const spin = (player) => {
    const randomAngle = 360 * 3 + Math.floor(Math.random() * 360); // 3 full spins + random
    if (player === 1) {
      setSpinning1(true);
      setAngle1(randomAngle);
      setTimeout(() => setSpinning1(false), 2000);
    } else {
      setSpinning2(true);
      setAngle2(randomAngle);
      setTimeout(() => setSpinning2(false), 2000);
    }   
  };

  return (
    // Main page container with purple background
    <div className={styles.page} style={{background: '#e9e6fa'}}>
      {/* Header with back button and title */}
      <header className={styles.header}>
        <button className={styles.backButton} aria-label="Back" onClick={() => router.push("/playgame")}>←</button>
        <h1 className={styles.title}>Play Game</h1>
      </header>
      {/* Navigation bar with game options */}
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
        {/* Instructions box with audio button and game rules */}
        <div className={styles.descriptionBox} style={{maxWidth: 700}}>
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
          <p style={{fontSize: '1.05rem'}}>
            First, let's pick which characters we are going to play in the game. Decide who will be Player 1 and Player 2. Then, click the spinners below to decide which character you'll play. If the spinner lands on a purple space, you get to pick a <span style={{color: '#a259d9', fontWeight: 600}}>PURPLE</span> character. If the spinner lands on a green space, you get to pick one of the <span style={{color: '#3bb273', fontWeight: 600}}>GREEN</span> characters.
          </p>
        </div>
        {/* Spinner container with both player wheels */}
        <div style={{display: 'flex', justifyContent: 'center', gap: '3rem', margin: '2rem 0'}}>
          {/* Player 1 spinner */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{fontWeight: 600, marginBottom: 10}}>Player 1</div>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              <SpinnerWheel angle={angle1} spinning={spinning1} player={1} onSpin={spin} />
              {/* Arrow pointer positioned above the spinner */}
              <Image
                src="/arrow.webp"
                alt="Pointer"
                width={32}
                height={32}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '-16px',
                  transform: 'translateX(-50%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
          {/* Player 2 spinner */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{fontWeight: 600, marginBottom: 10}}>Player 2</div>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              <SpinnerWheel angle={angle2} spinning={spinning2} player={2} onSpin={spin} />
              {/* Arrow pointer positioned above the spinner */}
              <Image
                src="/arrow.webp"
                alt="Pointer"
                width={32}
                height={32}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '-16px',
                  transform: 'translateX(-50%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
        </div>
        {/* Continue button to proceed to the game */}
        <button className={styles.continueButton} style={{background: '#ffd166', color: '#222', border: '2px solid #222', fontWeight: 600, fontSize: '1.1rem'}} onClick={() => router.push('/game')}>
          Continue
        </button>
      </main>
    </div>
  );
}

// Spinner wheel component - renders the SVG spinner with colored segments
function SpinnerWheel({ angle, spinning, player, onSpin }) {
  // 4 purple, 4 green (alternating) - defines the color pattern for the spinner
  const colors = ['#a259d9', '#3bb273', '#a259d9', '#3bb273', '#a259d9', '#3bb273', '#a259d9', '#3bb273'];
  const size = 120;
  const numSlices = colors.length;
  const sliceAngle = 360 / numSlices; // Calculate angle for each slice (360° / 8 = 45°)
  return (
    <svg
      width={size}
      height={size}
      style={{
        transform: `rotate(${angle}deg)`, // Rotate the wheel based on current angle
        transition: spinning ? 'transform 2s cubic-bezier(0.23, 1, 0.32, 1)' : 'none', // Smooth animation when spinning
        willChange: 'transform',
        display: 'block',
        cursor: 'pointer',
        borderRadius: '50%',
        border: '4px solid #bbb',
        background: '#fff',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      }}
      viewBox={`0 0 ${size} ${size}`}
      onClick={() => onSpin(player)} // Call spin function with the correct player number
    >
      {/* Generate each colored slice of the spinner wheel */}
      {colors.map((color, i) => {
        const startAngle = i * sliceAngle; // Start angle for this slice
        const endAngle = (i + 1) * sliceAngle; // End angle for this slice
        const largeArc = sliceAngle > 180 ? 1 : 0; // SVG arc flag
        // Calculate coordinates for the slice boundaries using trigonometry
        const x1 = size / 2 + (size / 2) * Math.cos((Math.PI * startAngle) / 180);
        const y1 = size / 2 + (size / 2) * Math.sin((Math.PI * startAngle) / 180);
        const x2 = size / 2 + (size / 2) * Math.cos((Math.PI * endAngle) / 180);
        const y2 = size / 2 + (size / 2) * Math.sin((Math.PI * endAngle) / 180);
        return (
          <path
            key={i}
            d={`M${size / 2},${size / 2} L${x1},${y1} A${size / 2},${size / 2} 0 ${largeArc} 1 ${x2},${y2} Z`}
            fill={color}
            stroke="#fff"
            strokeWidth={2}
          />
        );
      })}
    </svg>
  );
} 