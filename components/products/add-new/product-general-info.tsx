import React from "react";
import ProductFormPublishingCard from "./product-form-publishing-card";
import ProductformStatutCard from "./product-form-statut-card";
import ProductFormOrganisation from "./product-form-organisation";

const ProductGeneralInfo = (formik: any) => {
  return (
    <>
      <ProductformStatutCard formik={formik}/>
      <ProductFormPublishingCard formik={formik}/>
      <ProductFormOrganisation formik={formik}/>
    </>
  );
};

export default ProductGeneralInfo;
