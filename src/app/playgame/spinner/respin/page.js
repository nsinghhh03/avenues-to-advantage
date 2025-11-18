"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import styles from '../../playgame.module.css';


export default function Respin(){

const router = useRouter();


return(
  <Suspense fallback={
      <div className={styles.chooseCharacterFallbackPage}>
        <main className={styles.chooseCharacterFallbackMain}>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#000'
          }}>
            Both players got the same color! Respin the wheel to keep playing.
            <button className={styles.backButton} onClick={() => router.back()}>
              Go Back
            </button>
          </div>
        </main>
      </div>
    }>

</Suspense>
);
}
