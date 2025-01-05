import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export const isPlainObject = (
  value: unknown
): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) return false;

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

export const getInitials = (name: string | undefined) => {
  if (typeof name !== "string") {
    throw new Error("Input must be a string");
  }

  // Supprime les espaces inutiles et divise le nom en parties
  const parts = name.trim().split(/\s+/);

  // Récupère les deux premières parties et extrait leurs initiales
  const initials = parts
    .slice(0, 2) // Prend les deux premières parties
    .map((part) => part.charAt(0).toUpperCase()) // Extrait la première lettre en majuscule
    .join(""); // Combine les initiales

  return initials || "NA"; // Retourne 'NA' si aucune initiale trouvée
};
