import { Checkbox } from "./checkbox";
import { useFormikContext } from "formik";

interface FormikCheckboxProps {
  name: string;
  checked: boolean; // Accepte booléens ou 0/1
}

const FormikCheckbox = ({ name, checked }: FormikCheckboxProps) => {
  const { setFieldValue } = useFormikContext();

  const handleCheckedChange = (isChecked: boolean) => {
    // Met à jour la valeur dans Formik
    setFieldValue(name, isChecked ? 1 : 0); // Stocke comme 1 ou 0 si nécessaire
  };

  return (
    <Checkbox
      checked={!!checked} // Convertit 0/1 en booléen
      onCheckedChange={handleCheckedChange}
    />
  );
};

export { FormikCheckbox };
