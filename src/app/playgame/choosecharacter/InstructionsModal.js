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
          <div style={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '1rem',
            margin: '0 0 1rem 0',
            letterSpacing: '-0.5px',
            width: '100%',
            color : 'black'
          }}>
            The goal of the game is to be the first player to reach the finish line!
          </div>
          <ol style={{
            textAlign: 'left',
            margin: '0 auto',
            maxWidth: 340,
            fontWeight: 400,
            fontSize: '0.85rem',
            lineHeight: 1.5,
            paddingLeft: 20
          }}>
            <li style={{ marginBottom: 12 }}>
              <span style={{ fontWeight: 600 }}>On your turn, roll the dice.</span>
              <br />
              The number you roll tells you how many spaces to move forward on the board.
            </li>
            <li style={{ marginBottom: 12 }}>
              <span style={{ fontWeight: 600 }}>
                When you land on a space, pick a card that matches the color of the space you landed on.
              </span>
              <br />
              If you are playing as a <b>Black character</b>, pick from the deck with a <span style={{ color: 'purple' }}>PURPLE</span> background.<br />
              If you are playing as a <b>White character</b>, pick from the deck with a <span style={{ color: 'green' }}>GREEN</span> background.
            </li>
            <li style={{ marginBottom: 12 }}>
              <span style={{ fontWeight: 600 }}>Each card tells you what happens next!</span>
              <br />
              The cards include life events about things like money, health, school, jobs, and community.<br />
              Sometimes the cards will help you move ahead. Other times they might make you move back or lose a turn.
            </li>
            <li>
              <span style={{ fontWeight: 600 }}>Follow what the card says to do. Then it’s the next player’s turn!</span>
            </li>
          </ol>
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