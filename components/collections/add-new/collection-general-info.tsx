import React, { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { useFormikContext } from "formik";

const CollectionGeneralInfo = () => {
  return (
    <>
      <CollectionBasicsInfoCard />
      <CollectionMediaCard />
      {/*<CollectionSEOCard />*/}
    </>
  );
};

export default CollectionGeneralInfo;

const CollectionBasicsInfoCard = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<any>();
  return (
    <Card>
      <CardContent className="space-y-4 mt-4">
        <div className="space-y-1">
          <Label htmlFor="name">Titre</Label>
          <Input
            id="name"
            name="name"
            placeholder="Titre du produit"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <div className="text-red-500">{errors.name as ReactNode}</div>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Description du produit"
          />
          {errors.description && touched.description && (
            <div className="text-red-500">
              {errors.description as ReactNode}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const CollectionMediaCard = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ImageUpload
          values={values.images}
          onChange={(newImages: File[]) => setFieldValue("images", newImages)}
          maxFiles={7}
        />
      </CardContent>
    </Card>
  );
};

// const CollectionSEOCard = () => {
//   const product = {
//     title: "custum-mug",
//     description:
//       "Créez des collections de mug pour organiser fetes et boire à votre soif. Vous pouvez choisir des collections en fonction de conditions comme vos couleurs préférés ou le thème de vos chill.",
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Référencement sur les moteurs de recherche</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="space-y-2">
//           <h2 className="productTitle">Custum mug</h2>
//           <p className="productLink">
//             {`${process.env.DOMAIN_NAME}/products/${
//               product?.title || "custum-mug "
//             }`}{" "}
//           </p>
//           <p>{product.description} </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
