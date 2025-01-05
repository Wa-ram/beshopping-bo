import { isPlainObject } from "./utils";

type Primitive = string | number | boolean | null | undefined;
type FormDataValue = File | Blob | Primitive | FormDataValue[] | FormDataObject;
interface FormDataObject {
  [key: string]: FormDataValue;
}

export const createFormData = (values: FormDataObject): FormData => {
  const formData = new FormData();

  const appendToFormData = (
    data: FormDataObject | FormDataValue[],
    prefix = ""
  ) => {
    Object.entries(data).forEach(([key, value]) => {
      const fieldName = prefix ? `${prefix}[${key}]` : key;

      if (value === null || value === undefined) {
        formData.append(fieldName, "");
        return;
      }

      // Handle files and blobs
      if (value instanceof File || value instanceof Blob) {
        formData.append(fieldName, value);
        return;
      }

      // Handle arrays
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const arrayFieldName = `${fieldName}[${index}]`;

          if (item instanceof File || item instanceof Blob) {
            formData.append(arrayFieldName, item);
          } else if (isPlainObject(item)) {
            appendToFormData(item as FormDataObject, arrayFieldName);
          } else {
            formData.append(arrayFieldName, String(item));
          }
        });
        return;
      }

      // Handle objects
      if (isPlainObject(value)) {
        appendToFormData(value as FormDataObject, fieldName);
        return;
      }

      // Handle primitives
      formData.append(fieldName, String(value));
    });
  };

  appendToFormData(values);
  return formData;
};
