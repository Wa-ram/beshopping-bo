import { isPlainObject } from "../utils";

export const createFormData = (values: any): FormData => {
  const formData = new FormData();

  const appendToFormData = (data: any, prefix = '') => {
    (Object.keys(data) as (keyof any)[]).forEach((key) => {
      const value = data[key];
      const fieldName = prefix ? `${prefix}[${String(key)}]` : String(key);

      if (value === null || value === undefined) {
        formData.append(fieldName, '');
        return;
      }

      // Gestion des fichiers
      if (value instanceof File || value instanceof Blob) {
        formData.append(fieldName, value);
        return;
      }

      // Gestion des tableaux
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const arrayFieldName = `${fieldName}[${index}]`;
          
          if (item instanceof File || item instanceof Blob) {
            formData.append(arrayFieldName, item);
          } else if (isPlainObject(item)) {
            appendToFormData(item, arrayFieldName);
          } else {
            formData.append(arrayFieldName, String(item));
          }
        });
        return;
      }

      // Gestion des objets
      if (isPlainObject(value)) {
        appendToFormData(value, fieldName);
        return;
      }

      // Valeurs primitives
      formData.append(fieldName, String(value));
    });
  };

  appendToFormData(values);
  return formData;
};