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

  // Spinner state for both players
  const [spinning1, setSpinning1] = useState(false);
  const [spinning2, setSpinning2] = useState(false);
  const [angle1, setAngle1] = useState(0);
  const [angle2, setAngle2] = useState(0);
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [slice1, setSlice1] = useState(null); // store Player 1's slice index

  // Audio playback with toggle mute/play
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
    const audio = new Audio('/page2.mp3');
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

  // Spinner logic - spins for 1s, then sets result
  const spin = (player) => {
    const spinDuration = 1000; // ms
    const numSlices = 8;
    const sliceAngle = 360 / numSlices;
    if (player === 1) {
      // Player 1: random spin
      const randomSlice = Math.floor(Math.random() * numSlices);
      const randomAngle = 360 * 3 + (randomSlice * sliceAngle); // 3 full spins + lands on random slice
      setSpinning1(true);
      setResult1("");
      setAngle1(randomAngle);
      setTimeout(() => {
        setSpinning1(false);
        setResult1(getResultColor(randomAngle));
        setSlice1(randomSlice);
      }, spinDuration);
    } else {
      // Player 2: always land on opposite color
      if (slice1 === null) return; // Player 1 must spin first
      // Player 1's color: even = purple, odd = green
      const player1Color = slice1 % 2 === 0 ? 'purple' : 'green';
      // Find all slices of the opposite color
      const oppositeColorSlices = [];
      for (let i = 0; i < numSlices; i++) {
        if ((player1Color === 'purple' && i % 2 === 1) || (player1Color === 'green' && i % 2 === 0)) {
          oppositeColorSlices.push(i);
        }
      }
      // Pick a random slice of the opposite color
      const randomOppositeSlice = oppositeColorSlices[Math.floor(Math.random() * oppositeColorSlices.length)];
      const randomAngle = 360 * 3 + (randomOppositeSlice * sliceAngle);
      setSpinning2(true);
      setResult2("");
      setAngle2(randomAngle);
      setTimeout(() => {
        setSpinning2(false);
        setResult2(getResultColor(randomAngle));
      }, spinDuration);
    }
  };

  // Helper to determine color at the top (0 deg is top)
  function getResultColor(angle) {
    // Normalize angle to [0, 360)
    const normalized = ((angle % 360) + 360) % 360;
    // Each slice is 45deg, starting at 0deg (top)
    const slice = Math.floor((normalized + 22.5) / 45) % 8; // +22.5 to center the slice
    // Even slices are purple, odd are green
    return slice % 2 === 0 ? "Purple!" : "Green!";
  }

  // NavButton-like style for player labels, with #CCE5E5 background
  const playerBtnStyle = {
    background: '#CCE5E5',
    color: '#222',
    border: '2px solid #222',
    borderRadius: '12px',
    padding: '12px 22px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    boxShadow: '0 4px 12px rgba(34,34,34,0.25), 3px 6px 0 #222',
    display: 'inline-block',
    marginBottom: 10,
    letterSpacing: 1,
  };

  // Arrow style: perfectly centered above spinner
  const arrowStyle = {
    position: 'absolute',
    left: '50%',
    top: '42px', // adjust as needed for your arrow image
    transform: 'translateX(-50%)',
    zIndex: 2,
    pointerEvents: 'none',
  };

  // Upscale spinner size
  const spinnerSize = 160;

  return (
    <div className={styles.page} style={{background: '#e9e6fa'}}>
      {/* Header and nav */}
      <header className={styles.header}>
        <button className={styles.backButton} aria-label="Back" onClick={() => router.push("/playgame")}>←</button>
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
        {/* Spinners */}
        <div style={{display: 'flex', justifyContent: 'center', gap: '3rem', margin: '2rem 0'}}>
          {/* Player 1 spinner */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <span style={playerBtnStyle}>Player 1</span>
            <div style={{ position: 'relative', width: spinnerSize, height: spinnerSize }}>
              <SpinnerWheel angle={angle1} spinning={spinning1} player={1} onSpin={spinning1 ? undefined : spin} size={spinnerSize} />
              <Image src="/arrow.webp" alt="Pointer" width={40} height={40} style={arrowStyle} />
            </div>
            {/* Show result after spin */}
            <div style={{minHeight: 30, marginTop: 8, fontWeight: 700, fontSize: '1.2rem', color: result1 === 'Purple!' ? '#a259d9' : '#3bb273'}}>
              {result1}
            </div>
          </div>
          {/* Player 2 spinner */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            
            <span style={playerBtnStyle}>Player 2</span>
            <div style={{ position: 'relative', width: spinnerSize, height: spinnerSize }}>
              <SpinnerWheel angle={angle2} spinning={spinning2} player={2} onSpin={spinning2 ? undefined : spin} size={spinnerSize} />
              <Image src="/arrow.webp" alt="Pointer" width={40} height={40} style={arrowStyle} />
            </div>
            {/* Show result after spin */}
            <div style={{minHeight: 30, marginTop: 8, fontWeight: 700, fontSize: '1.2rem', color: result2 === 'Purple!' ? '#A24DE2' : '#00975B'}}>
              {result2}
            </div>
          </div>
        </div>
        {/* Continue button */}
        <button className={styles.continueButton} style={{background: '#ffd166', color: '#222', border: '2px solid #222', fontWeight: 600, fontSize: '1.1rem'}} onClick={() => router.push(`/playgame/choosecharacter?player1=${result1}&player2=${result2}`)}>
          Continue
        </button>
      </main>
    </div>
  );
}

// Spinner wheel component - renders the SVG spinner with colored segments
function SpinnerWheel({ angle, spinning, player, onSpin, size = 120 }) {
  // 4 purple, 4 green (alternating) - defines the color pattern for the spinner
  const colors = ['#A24DE2', '#00975B', '#A24DE2', '#00975B', '#A24DE2', '#00975B', '#A24DE2', '#00975B'];
  const numSlices = colors.length;
  const sliceAngle = 360 / numSlices; // Each slice is 45 degrees
  return (
    <svg
      width={size}
      height={size}
      style={{
        transform: `rotate(${angle}deg)`, // Rotate the wheel based on current angle
        transition: spinning ? 'transform 3.5s cubic-bezier(0.15, 0.85, 0.35, 1.1)' : 'none', // Longer, more natural spin
        willChange: 'transform',
        display: 'block',
        cursor: onSpin ? 'pointer' : 'default',
        borderRadius: '50%',
        border: '4px solid #bbb',
        background: '#fff',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      }}
      viewBox={`0 0 ${size} ${size}`}
      onClick={onSpin ? () => onSpin(player) : undefined}
    >
      {/* Draw each colored slice */}
      {colors.map((color, i) => {
        const startAngle = i * sliceAngle;
        const endAngle = (i + 1) * sliceAngle;
        const largeArc = sliceAngle > 180 ? 1 : 0;
        // Calculate coordinates for the slice boundaries
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