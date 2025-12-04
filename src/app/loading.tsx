import { Loader, Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <h1 >
          <Loader2 className="animate-spin text-6xl" />
        </h1>
      </div>
    </>
  );
}
