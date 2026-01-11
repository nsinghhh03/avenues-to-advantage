"use client";
import styles from '../playgame.module.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import InstructionsModal from "../choosecharacter/InstructionsModal";
import EqualityInfo from "../maingame/EqualityInfo";

import Dice from "../../dice";  

function MainGameContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showInstructions, setShowInstructions] = useState(false);
  const [revealedCard, setRevealedCard] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [revealedCards, setRevealedCards] = useState(new Set());

  // Read params
  const player1Img = searchParams.get('player1Img') ? searchParams.get('player1Img').startsWith('/') ? searchParams.get('player1Img') : `/${searchParams.get('player1Img')}` : "/green_player_1.png";
  const player2Img = searchParams.get('player2Img') ? searchParams.get('player2Img').startsWith('/') ? searchParams.get('player2Img') : `/${searchParams.get('player2Img')}` : "/purple_player_1.png";
  const player1Color = searchParams.get('player1Color') || "green";
  const player2Color = searchParams.get('player2Color') || "purple";

  // Equality cards - these cards are visually half green and half purple
  // Both players should get the same equal cards
  const equalCards = [
    { front: "/equal-career.png", back: "/equal-career-f1.png" },
    { front: "/equal-comm.png", back: "/equal-comm-f1.png" },
    { front: "/equal-health.png", back: "/equal-health-f1.png" },
    { front: "/equal-school.png", back: "/equal-school-f1.png" },
    { front: "/equal-wealth.png", back: "/equal-wealth-f1.png" },
  ];

  const [shuffledCards, setShuffledCards] = useState(equalCards);
  
  useEffect(() => {
    setShuffledCards([...equalCards].sort(() => Math.random() - 0.5));
  }, []);

  // Both players get the same equal cards (half green, half purple) - shuffled
  const player1Cards = shuffledCards;
  const player2Cards = shuffledCards;

  // Handle card reveal
  const handleCardClick = (card) => {
    if (!revealedCards.has(card.front)) {
      setRevealedCards(prev => new Set([...prev, card.front]));
      setRevealedCard(card.back);
    }
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
      {/* Equality Arch Banner */}
      <div style={{
        background: '#ffd166',
        border: '2px solid #222',
        borderRadius: '12px',
        padding: '12px 24px',
        margin: '16px auto',
        maxWidth: '600px',
        textAlign: 'center',
       
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '1.4rem',
          fontWeight: 700,
          color: '#222'
        }}>
           EQUALITY ARCH SECTION
        </h2>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '0.95rem',
          color: '#222',
          fontWeight: 500
        }}>
          Both players now have similar cards - the rules have changed!
        </p>
      </div>
      <main className={styles.main} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 64, marginTop: 24, marginBottom: 32}}>
          {/* Player 1 */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 180}}>
            <div style={{background: '#CCE5E5', borderRadius: 12, padding: '8px 16px', fontWeight: 700, border: '2px solid #222', boxShadow: '0 2px 0 #222', marginBottom: 8, color: 'black'}}>Player 1</div>
            <div style={{border: player1Color === 'green' ? '3px solid #7ed957' : '3px solid #b39ddb', borderRadius: 12, padding: 4, marginBottom: 12}}>
              <Image src={player1Img} alt="Player 1" width={90} height={90} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', marginTop: 8}}>
              {/* Top row - 3 cards */}
              <div style={{display: 'flex', gap: 16}}>
                {player1Cards.slice(0, 3).map((card, i) => {
                  const isRevealed = revealedCards.has(card.front);
                  return (
                    <Image
                      key={i}
                      src={card.front}
                      alt={`Card ${i+1}`}
                      width={83}
                      height={107}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '14px',
                        boxShadow: '0 4px 12px rgba(34,34,34,0.18)',
                        border: '2px solid #222',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                        opacity: isRevealed ? 0.5 : 1,
                        pointerEvents: isRevealed ? 'none' : 'auto',
                      }}
                      onMouseOver={e => !isRevealed && (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      onClick={() => handleCardClick(card)}
                    />
                  );
                })}
              </div>
              {/* Bottom row - 2 cards */}
              <div style={{display: 'flex', gap: 16}}>
                {player1Cards.slice(3, 5).map((card, i) => {
                  const isRevealed = revealedCards.has(card.front);
                  return (
                    <Image
                      key={i + 3}
                      src={card.front}
                      alt={`Card ${i+4}`}
                      width={83}
                      height={107}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '14px',
                        boxShadow: '0 4px 12px rgba(34,34,34,0.18)',
                        border: '2px solid #222',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                        opacity: isRevealed ? 0.5 : 1,
                        pointerEvents: isRevealed ? 'none' : 'auto',
                      }}
                      onMouseOver={e => !isRevealed && (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      onClick={() => handleCardClick(card)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {/* Center revealed card */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 220}}>
            {revealedCard ? (
              <Image src={revealedCard} alt="Revealed Card" width={180} height={240} style={{borderRadius: 12, boxShadow: '0 3px 0 #222', border: '2px solid #222', marginBottom: 8, background: '#fff'}} />
            ) : (
              <div style={{background: '#ffe066', borderRadius: 12, boxShadow: '0 3px 0 #222', border: '2px solid #222', width: 180, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, marginBottom: 8, padding: 12}}>
                
                <div style={{fontWeight: 400, fontSize: 11, color: '#000',  whiteSpace: 'pre-line', fontWeight: 1000}}>Click a card to reveal it.</div>
              </div>
            )}
            {/* Down arrow */}
            <div style={{fontSize: 32, margin: '8px 0'}}>&#8595; </div>
            <button
              style={{
                background: '#CCE5E5',
                color: '#222',
                border: '2px solid #222',
                borderRadius: 18,
                fontWeight: 700,
                fontSize: 18,
                padding: '8px 28px',
                boxShadow: '0 2px 0 #222',
                cursor: 'pointer',
                marginTop: 4
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 0 #222';
              }}
            >
              Learn More
            </button>
            
          </div>
          {/* Player 2 */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 180}}>
            <div style={{background: '#CCE5E5', borderRadius: 12, padding: '8px 16px', fontWeight: 700, border: '2px solid #222', boxShadow: '0 2px 0 #222', marginBottom: 8, color : 'black'}}>Player 2</div>
            <div style={{border: player2Color === 'green' ? '3px solid #7ed957' : '3px solid #b39ddb', borderRadius: 12, padding: 4, marginBottom: 12}}>
              <Image src={player2Img} alt="Player 2" width={90} height={90} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', marginTop: 8}}>
              {/* Top row - 3 cards */}
              <div style={{display: 'flex', gap: 16}}>
                {player2Cards.slice(0, 3).map((card, i) => {
                  const isRevealed = revealedCards.has(card.front);
                  return (
                    <Image
                      key={i}
                      src={card.front}
                      alt={`Card ${i+1}`}
                      width={83}
                      height={107}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '14px',
                        boxShadow: '0 4px 12px rgba(34,34,34,0.18)',
                        border: '2px solid #222',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                        opacity: isRevealed ? 0.5 : 1,
                        pointerEvents: isRevealed ? 'none' : 'auto',
                      }}
                      onMouseOver={e => !isRevealed && (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      onClick={() => handleCardClick(card)}
                    />
                  );
                })}
              </div>
              {/* Bottom row - 2 cards */}
              <div style={{display: 'flex', gap: 16}}>
                {player2Cards.slice(3, 5).map((card, i) => {
                  const isRevealed = revealedCards.has(card.front);
                  return (
                    <Image
                      key={i + 3}
                      src={card.front}
                      alt={`Card ${i+4}`}
                      width={83}
                      height={107}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '14px',
                        boxShadow: '0 4px 12px rgba(34,34,34,0.18)',
                        border: '2px solid #222',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                        opacity: isRevealed ? 0.5 : 1,
                        pointerEvents: isRevealed ? 'none' : 'auto',
                      }}
                      onMouseOver={e => !isRevealed && (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      onClick={() => handleCardClick(card)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Bottom yellow button */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button 
            style={{background: '#ffd166', color: '#222', border: '2px solid #222', borderRadius: 12, fontWeight: 700, fontSize: 22, padding: '12px 32px', boxShadow: '3px 6px 0 #222', marginTop: 32, marginBottom: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}
            onClick={() => {
              const p1Img = player1Img || "/green_player_1.png";
              const p2Img = player2Img || "/purple_player_1.png";
              const p1Color = player1Color || "green";
              const p2Color = player2Color || "purple";
              router.push(`/playgame/maingame3?player1Img=${p1Img}&player1Color=${p1Color}&player2Img=${p2Img}&player2Color=${p2Color}`);
            }}
            onMouseEnter = {(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
            onMouseLeave = {(e) => {
              e.currentTarget.style.boxShadow = '3px 6px 0 #222';
            }}
          >
            Click here when you reach the Equity Arch!
            <Image 
              src="/info-icon.png" 
              alt="Info" 
              width={55} 
              height={55}
              style={{ cursor: 'pointer' }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                e.currentTarget.style.transform = 'scale(1.05)';
                setShowTooltip(true);
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                e.currentTarget.style.transform = 'scale(1)';
                setShowTooltip(false);
              }}
            />
          </button>
          {showTooltip && (
            <EqualityInfo 
              title="Equity Arch Section"
              text="You've reached the Equity Arch! In this final section, the game shifts again. Now the cards reflect equity - not just treating everyone the same, but recognizing that fairness means giving each person what they need to succeed. Some players receive different cards based on what will help them reach the same goal, because we understand that people start from different places and may need different support to succeed."
            />
          )}

        </div>
        <Dice />
      </main>
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}

export default function MainGamePage() {
  return (
    <Suspense fallback={<div style={{color: '#222', fontSize: 24, fontWeight: 700, textAlign: 'center', marginTop: 100}}>An error occurred. Please Try again.</div>}>
      <MainGameContent />
    </Suspense>
  );
}