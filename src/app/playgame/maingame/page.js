"use client";
import styles from '../playgame.module.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import InstructionsModal from "../choosecharacter/InstructionsModal";

export default function MainGamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showInstructions, setShowInstructions] = useState(false);
  
  // Get player images from URL parameters
  const player1Img = searchParams.get('player1') || "/green_player_1.png";
  const player2Img = searchParams.get('player2') || "/purple_player_1.png";

  // Placeholder: card image filenames
  const player1Cards = [
    { src: "/school_card_placeholder.png", alt: "School Card" },
    { src: "/career_card_placeholder.png", alt: "Career Card" },
    { src: "/health_card_placeholder.png", alt: "Health Card" },
    { src: "/wealth_card_placeholder.png", alt: "Wealth Card" },
    { src: "/community_celebration_card_placeholder.png", alt: "Community Celebration Card" },
  ];
  const player2Cards = [
    { src: "/school_card_placeholder2.png", alt: "School Card" },
    { src: "/career_card_placeholder2.png", alt: "Career Card" },
    { src: "/health_card_placeholder2.png", alt: "Health Card" },
    { src: "/wealth_card_placeholder2.png", alt: "Wealth Card" },
    { src: "/community_celebration_card_placeholder2.png", alt: "Community Celebration Card" },
  ];
  // Placeholder: revealed card
  const revealedCard = { label: "SCHOOL", text: "Your school doesn't have enough money, so you have to share textbooks with friends.\nSkip your next turn.", color: "#ffe066" };

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
      <main className={styles.main} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 64, marginTop: 24, marginBottom: 32}}>
          {/* Player 1 */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 180}}>
            <div style={{background: '#CCE5E5', borderRadius: 12, padding: '8px 16px', fontWeight: 700, border: '2px solid #222', boxShadow: '0 2px 0 #222', marginBottom: 8}}>Player 1</div>
            <div style={{border: '3px solid #7ed957', borderRadius: 12, padding: 4, marginBottom: 12}}>
              <Image src={player1Img} alt="Player 1" width={90} height={90} />
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 8}}>
              {player1Cards.map((card, i) => (
                <Image key={i} src={card.src} alt={card.alt} width={70} height={48} style={{borderRadius: 8, boxShadow: '0 2px 0 #222', border: '2px solid #222', background: '#fff'}} />
              ))}
            </div>
          </div>
          {/* Center revealed card */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 220}}>
            <div style={{background: revealedCard.color, borderRadius: 12, boxShadow: '0 3px 0 #222', border: '2px solid #222', width: 180, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, marginBottom: 8, padding: 12}}>
              <div style={{fontWeight: 700, fontSize: 20, marginBottom: 8}}>{revealedCard.label}</div>
              <div style={{fontWeight: 400, fontSize: 15, whiteSpace: 'pre-line'}}>{revealedCard.text}</div>
            </div>
            {/* Down arrow */}
            <div style={{fontSize: 32, margin: '8px 0'}}>&#8595;</div>
            <button style={{background: '#CCE5E5', color: '#222', border: '2px solid #222', borderRadius: 18, fontWeight: 700, fontSize: 18, padding: '8px 28px', boxShadow: '0 2px 0 #222', cursor: 'pointer', marginTop: 4}}>Learn More</button>
          </div>
          {/* Player 2 */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 180}}>
            <div style={{background: '#CCE5E5', borderRadius: 12, padding: '8px 16px', fontWeight: 700, border: '2px solid #222', boxShadow: '0 2px 0 #222', marginBottom: 8}}>Player 2</div>
            <div style={{border: '3px solid #b39ddb', borderRadius: 12, padding: 4, marginBottom: 12}}>
              <Image src={player2Img} alt="Player 2" width={90} height={90} />
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 8}}>
              {player2Cards.map((card, i) => (
                <Image key={i} src={card.src} alt={card.alt} width={70} height={48} style={{borderRadius: 8, boxShadow: '0 2px 0 #222', border: '2px solid #222', background: '#fff'}} />
              ))}
            </div>
          </div>
        </div>
        {/* Bottom yellow button */}
        <button style={{background: '#ffd166', color: '#222', border: '2px solid #222', borderRadius: 12, fontWeight: 700, fontSize: 22, padding: '12px 32px', boxShadow: '3px 6px 0 #222', marginTop: 32, marginBottom: 16, cursor: 'pointer'}}>
          Click here when you reach the Equality Arch!
        </button>
      </main>
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
} 