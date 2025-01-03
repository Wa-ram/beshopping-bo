import { Checkbox } from "./checkbox";
import { useFormikContext } from "formik";

interface FormikCheckboxProps {
  name: string;
  checked: boolean;
}

const FormikCheckbox = ({ name, checked }: FormikCheckboxProps) => {
  const { setFieldValue } = useFormikContext();

  const handleCheckedChange = (isChecked: boolean) => {
    // Utilise setFieldValue pour mettre à jour la valeur
    setFieldValue(name, isChecked);
  };

  return <Checkbox checked={checked} onCheckedChange={handleCheckedChange} />;
};

export { FormikCheckbox };
