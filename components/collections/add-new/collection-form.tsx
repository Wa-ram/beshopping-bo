import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import CollectionGeneralInfo from "./collection-general-info";
import CollectionOptions from "./collection-options";

interface CollectionFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  initialData?: any;
}

const CollectionForm = ({
  onSubmit,
  isLoading,
  initialData,
}: CollectionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(productSchema),
    defaultValues: initialData,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex gap-6">
        <div className="lg:w-8/12 gap-6 flex flex-col order-2 lg:order-1">
          <CollectionGeneralInfo />
        </div>
        <div className="lg:w-4/12 gap-6 flex flex-col order-1 lg:order-2">
          <CollectionOptions />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {/* <Button variant="outline" type="button">
      Save as Draft
    </Button> */}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Ajouter la collection
        </Button>
      </div>
    </form>
  );
};

export default CollectionForm;
