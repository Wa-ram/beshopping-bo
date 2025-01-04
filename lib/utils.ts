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

export const createFormData = (values: any): FormData => {
  const formData = new FormData();

  // Iterate over each key in the values object
  (Object.keys(values) as (keyof any)[]).forEach((key) => {
    const value = values[key] as unknown;

    if (key === "images" && Array.isArray(value)) {
      // Handle images array
      value.forEach((file, index) => {
        formData.append(`images[${index}]`, file as Blob); // Cast to Blob or File
      });
    } else if (Array.isArray(value)) {
      // Handle other arrays (e.g., tags, collections)
      value.forEach((item, index) => {
        formData.append(`${String(key)}[${index}]`, String(item)); // Convert items to string
      });
    } else if (typeof value === "object" && value !== null) {
      if (value instanceof File || value instanceof Blob) {
        formData.append(String(key), value);
      }
    } else {
      // Handle primitive values or undefined/null
      formData.append(
        String(key),
        value !== null && value !== undefined ? String(value) : ""
      );
    }
  });

  return formData;
};
