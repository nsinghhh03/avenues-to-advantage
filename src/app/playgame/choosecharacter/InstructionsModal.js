import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "../playgame.module.css";

export default function InstructionsModal({ onClose }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);
  const image1 = "/dice.png";
  const image2 = "/gameboard.png";
  const image3 = "/kids-rolling.png";
  const image4 = "/kids-moving-marker.png";
  const image5 = "/cards-display.png";
  const imageArray = [image1, image2, image3, image4, image5];
  const [currentImage, setCurrentImage] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageArray.length);
    }, 2200); 
    return () => clearInterval(interval);
  }, [imageArray.length]);

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
          <p style={{color:'black'}}>
            The goal of the game is to be the first player to reach the finish line!
            On your turn, roll the dice. The number you roll tells you how many spaces to move forward on the board.
            When you land on a space, pick a card that matches the color of the space you landed on.
            If you are playing as a <b>Black character</b>, pick from the deck with a <span style={{ color: 'purple' }}>PURPLE</span> background.
            If you are playing as a <b>White character</b>, pick from the deck with a <span style={{ color: 'green' }}>GREEN</span> background.
            Each card tells you what happens next! The cards include life events about things like money, health, school, jobs, and community.
            Sometimes the cards will help you move ahead. Other times they might make you move back or lose a turn.
            Follow what the card says to do. Then it’s the next player’s turn!
          </p>
        </div>
      <div className={styles.imageContainer}>
        <Image
          src={imageArray[currentImage]}
          alt={`Gallery item ${currentImage + 1}`}
          width={320}
          height={220}
          style={{ objectFit: "contain", maxWidth: "320px", maxHeight: "220px" }}
        />
      </div>
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