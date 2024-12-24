import React from "react";
import ProductFormPublishingCard from "./product-form-publishing-card";
import ProductformStatutCard from "./product-form-statut-card";
import ProductFormOrganisation from "./product-form-organisation";

const ProductGeneralInfo = () => {
  return (
    <>
      <ProductformStatutCard />
      <ProductFormPublishingCard />
      <ProductFormOrganisation />
    </>
  );
};

export default ProductGeneralInfo;
