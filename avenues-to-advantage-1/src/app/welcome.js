"use client";
import Image from "next/image";
import styles from "./welcome.module.css";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.welcomeContainer}>
          <div className={styles.globeImageWrapper}>
            <Image
              src="/children-globe.png"
              alt="Children standing on a globe"
              fill
              className={styles.globeImage}
              priority
              sizes="(max-width: 1000px) 100vw, 700px"
            />
          </div>
          <div className={styles.bubble}>
            <h1 className={styles.title}>AVENUES TO ADVANTAGE</h1>
          </div>
          <div className={styles.subtitleBox}>
            <p className={styles.subtitle}>
              Explore how everyday life<br />shapes opportunity!
            </p>
          </div>
          <div className={styles.arrowContainer}>
            <span className={styles.downArrow}>↓</span>
          </div>
          <button className={styles.startButton} onClick={() => router.push("/playgame")}>Get started</button>
        </div>
      </main>
    </div>
  );
} 