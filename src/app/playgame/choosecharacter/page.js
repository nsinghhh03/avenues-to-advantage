"use client";
import { Suspense } from "react";
import ChooseCharacterClient from "./ChooseCharacterClient";

export default function ChooseCharacterPage() {
  return ( 
    <div style={{ maxHeight: '90vh', overflowY: 'auto', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', }}>
    <Suspense fallback={<div>Spin The Wheel Before Proceeding!</div>}>
      <ChooseCharacterClient />
    </Suspense>
    </div>
  );
} 
