"use client";
import { Suspense } from "react";
import ChooseCharacterClient from "./ChooseCharacterClient";

export default function ChooseCharacterPage() {
  return ( // make sure the text is bolded and centered in the webpage.
    <div style={{ maxHeight: '90vh', overflowY: 'auto' }}>
    <Suspense fallback={<div>Loading...</div>}>
      <ChooseCharacterClient />
    </Suspense>
    </div>
  );
} 
