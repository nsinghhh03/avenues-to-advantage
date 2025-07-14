"use client";
import { Suspense } from "react";
import ChooseCharacterClient from "./ChooseCharacterClient";

export default function ChooseCharacterPage() {
  return (
    <Suspense fallback={<div>Spin The Wheel Before Proceeding!</div>}>
      <ChooseCharacterClient />
    </Suspense>
  );
} 
