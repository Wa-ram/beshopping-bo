import { isPlainObject } from "./utils";

type Primitive = string | number | boolean | null | undefined;
type FormDataValue = File | Blob | Primitive | FormDataValue[] | FormDataObject;
export interface FormDataObject {
  [key: string]: FormDataValue;
}

export const createFormData = (values: unknown): FormData => {
  const formData = new FormData();

  const appendToFormData = (
    data: unknown,
    prefix = ""
  ): void => {
    if (data === null || data === undefined) {
      // Null or undefined values
      formData.append(prefix, "");
      return;
    }

    if (data instanceof File || data instanceof Blob) {
      // Handle File or Blob
      formData.append(prefix, data);
      return;
    }

    if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
      // Handle primitives
      formData.append(prefix, String(data));
      return;
    }

    if (Array.isArray(data)) {
      // Handle arrays
      data.forEach((item, index) => {
        const arrayPrefix = `${prefix}[${index}]`;
        appendToFormData(item, arrayPrefix);
      });
      return;
    }

    if (isPlainObject(data)) {
      // Handle objects
      Object.entries(data as FormDataObject).forEach(([key, value]) => {
        const objectPrefix = prefix ? `${prefix}[${key}]` : key;
        appendToFormData(value, objectPrefix);
      });
      return;
    }

    throw new Error(`Unsupported data type: ${typeof data}`);
  };

  if (isPlainObject(values) || Array.isArray(values)) {
    appendToFormData(values);
  } else {
    throw new Error("Input must be an object or an array.");
  }

  return formData;
};
