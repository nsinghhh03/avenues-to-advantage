import Image from "next/image";
import styles from "../playgame.module.css";

export default function EqualityInfo({ text, title }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '170%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#fff',
      border: '2px solid #222',
      borderRadius: '12px',
      padding: '25px 29px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
      zIndex: 1000,
      minWidth: '500px',
      maxWidth: 'min(90vw, 700px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
      }}>
        <div style={{
          width: 50,
          height: 50,
          borderRadius: 10,
          background: 'linear-gradient(180deg, #f3eef9 0%, #eef7f4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
          flexShrink: 0
        }}>
          <Image
            src="/info-icon.png"
            alt="Info"
            width={50}
            height={50}
            style={{ display: 'block' }}
          />
        </div>

        <div style={{ flex: 1 }}>
          {title && (
            <h3 style={{
              margin: '0 0 8px 0',
              color: '#222',
              fontWeight: 700,
              fontSize: '1.3rem',
              lineHeight: 1.3
            }}>
              {title}
            </h3>
          )}
          <p style={{
            margin: 0,
            color: '#111',
            fontWeight: 500,
            fontSize: '1.1rem',
            lineHeight: 1.5
          }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}