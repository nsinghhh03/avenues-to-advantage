"use client";
import styles from '../playgame.module.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import InstructionsModal from "../choosecharacter/InstructionsModal";

function MainGameContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showInstructions, setShowInstructions] = useState(false);
  const [revealedCard, setRevealedCard] = useState(null);

  // Read params
  const player1Img = searchParams.get('player1Img') ? searchParams.get('player1Img').startsWith('/') ? searchParams.get('player1Img') : `/${searchParams.get('player1Img')}` : "/green_player_1.png";
  const player2Img = searchParams.get('player2Img') ? searchParams.get('player2Img').startsWith('/') ? searchParams.get('player2Img') : `/${searchParams.get('player2Img')}` : "/purple_player_1.png";
  const player1Color = searchParams.get('player1Color') || "green";
  const player2Color = searchParams.get('player2Color') || "purple";

  // Card sets
  const purpleCards = [
    { front: "/equity-career.png", back: "/equity-career-f1.png" },
    { front: "/equity-community.png", back: "/equity-comm-f1.png" },
    { front: "/equity-health.png", back: "/equity-health-f1.png" },
    { front: "/equity-school.png", back: "/equity-school-f1.png" },
    { front: "/equity-wealth.png", back: "/equity-wealth-f1.png" },
  ];
  const greenCards = [
    { front: "/green-career.png", back: "/green-career-f1.png" },
    { front: "/green-comm.png", back: "/green-comm-f1.png" },
    { front: "/green-health.png", back: "/green-health-f1.png" },
    { front: "/green-school.png", back: "/green-school-f1.png" },
    { front: "/green-wealth.png", back: "/green-wealth-f1.png" },
  ];

  // Pick correct card set for each player
  const player1Cards = player1Color === "green" ? greenCards : purpleCards;
  const player2Cards = player2Color === "green" ? greenCards : purpleCards;

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
            <div style={{background: '#CCE5E5', borderRadius: 12, padding: '8px 16px', fontWeight: 700, border: '2px solid #222', boxShadow: '0 2px 0 #222', marginBottom: 8, color : 'black'}}>Player 1</div>
            <div style={{border: player1Color === 'green' ? '3px solid #7ed957' : '3px solid #b39ddb', borderRadius: 12, padding: 4, marginBottom: 12}}>
              <Image src={player1Img} alt="Player 1" width={90} height={90} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', marginTop: 8}}>
              {/* Top row - 3 cards */}
              <div style={{display: 'flex', gap: 16}}>
                {player1Cards.slice(0, 3).map((card, i) => (
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
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={() => setRevealedCard(card.back)}
                  />
                ))}
              </div>
              {/* Bottom row - 2 cards */}
              <div style={{display: 'flex', gap: 16}}>
                {player1Cards.slice(3, 5).map((card, i) => (
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
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={() => setRevealedCard(card.back)}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Center revealed card */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 220}}>
            {revealedCard ? (
              <Image src={revealedCard} alt="Revealed Card" width={180} height={240} style={{borderRadius: 12, boxShadow: '0 3px 0 #222', border: '2px solid #222', marginBottom: 8, background: '#fff'}} />
            ) : (
              <div style={{background: '#ffe066', borderRadius: 12, boxShadow: '0 3px 0 #222', border: '2px solid #222', width: 180, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, marginBottom: 8, padding: 12}}>
                
                <div style={{fontWeight: 400, fontSize: 11, whiteSpace: 'pre-line', fontWeight: 1000, color : 'black'}}>Click a card to reveal it.</div>
              </div>
            )}
            {/* Down arrow */}
            <div style={{fontSize: 32, margin: '8px 0'}}>&#8595;</div>
            <button style={{background: '#CCE5E5', color: '#222', border: '2px solid #222', borderRadius: 18, fontWeight: 700, fontSize: 18, padding: '8px 28px', boxShadow: '0 2px 0 #222', cursor: 'pointer', marginTop: 4}}>Learn More</button>
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
                {player2Cards.slice(0, 3).map((card, i) => (
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
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={() => setRevealedCard(card.back)}
                  />
                ))}
              </div>
              {/* Bottom row - 2 cards */}
              <div style={{display: 'flex', gap: 16}}>
                {player2Cards.slice(3, 5).map((card, i) => (
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
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={() => setRevealedCard(card.back)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
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