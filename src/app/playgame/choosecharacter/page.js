"use client";
import { Suspense } from "react";
import ChooseCharacterClient from "./ChooseCharacterClient";

export default function ChooseCharacterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChooseCharacterClient />
    </Suspense>
  );
} 
