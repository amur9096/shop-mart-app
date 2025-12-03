import { Loader, Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <h1>
          Loading... <Loader2 className="animate-spin" />
        </h1>
      </div>
    </>
  );
}
