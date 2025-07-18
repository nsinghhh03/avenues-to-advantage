import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "../playgame.module.css";

export default function InstructionsModal({ onClose }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/instructionspopup.mp3");
    audioRef.current.onended = () => setIsMuted(true);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!audioRef.current) return;
    if (!audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsMuted(true);
      return;
    }
    setIsMuted(false);
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} style={{ position: 'relative' }}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.textAndAudio}>
          <p style={{textAlign: 'center', fontWeight: 600, fontSize: '1.02rem', marginBottom: 16}}>
            The goal of the game is to be the first player to reach the finish line! Each player rolls the dice when it’s their turn. The number you roll tells you how many spaces to move on the board. When you land on a space, pick a card that matches the color of the space you landed on. Because you are playing a Black/White character, you will pick one of the purple/green cards. Each card tells you what happens next! The cards talk about different parts of life, like money, health, school, jobs, and community. Follow what the card says to do.
          </p>
        </div>
        <Image
          src="/cardss.png"
          alt="Cards"
          width={400}
          height={370}
          style={{
            display: 'block',
            margin: '0.25rem auto 0 auto', 
            borderRadius: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            maxWidth: '90%',
            height: 'auto',
          }}
        />
        <button className={styles.speakerIconBottomRight} onClick={handleSpeak}>
          <Image
            src={isMuted ? "/mute.png" : "/speaker-filled-audio-tool.png"}
            alt={isMuted ? "Muted" : "Speaker"}
            width={32}
            height={32}
          />
        </button>
      </div>
    </div>
  );
} 