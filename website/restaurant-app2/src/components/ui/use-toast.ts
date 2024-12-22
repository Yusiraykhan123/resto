// src/components/ui/use-toast.ts
import { useState } from "react";

export function useToast() {
  const [isVisible, setIsVisible] = useState(false);

  const toast = ({ title, description, variant = "default" }: { title: string; description: string; variant?: string }) => {
    console.log(`[${variant}] ${title}: ${description}`);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  };

  return { toast };
}
