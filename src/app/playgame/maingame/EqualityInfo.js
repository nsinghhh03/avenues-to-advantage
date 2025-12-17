import Image from "next/image";
import styles from "../playgame.module.css";

export default function EqualityInfo({ text }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '170%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#fff',
      border: '2px solid #222',
      borderRadius: '10px',
      padding: '12px 16px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
      zIndex: 1000,
      minWidth: '320px',
      maxWidth: 'min(88vw, 520px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'left',
      gap: '12px',
    }}>
      <div style={{
        width: 44,
        height: 44,
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
          width={45}
          height={45}
          style={{ display: 'block' }}
        />
      </div>

      <p style={{
        margin: 0,
        color: '#111',
        fontWeight: 700,
        fontSize: '1.05rem',
        lineHeight: 1.4
      }}>
        {text}
      </p>
    </div>
  );
}