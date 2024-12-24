import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "@/lib/types/customer";
import { Textarea } from "@/components/ui/textarea";
import { useCustomerStore } from "@/lib/stores/customer-store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomerNotes from "./customer-notes";

interface CustomerInfoProps {
  customer: Customer;
}

export function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Client</CardTitle>
          {/* <CardTitle>Customer Information</CardTitle> */}
        </CardHeader>
        <CardContent className="flex">
          <div className="w-full">
            <div className="space-y-2">
              <h1>Information de contact</h1>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span className="text-[#3574F2]">{customer.email}</span>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  {customer.phone}
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2 ">
              {customer.address && (
                <>
                  <h1>Adresse par défaut</h1>
                  <div className="flex items-center gap-2 text-sm">
                    {/* <MapPin className="h-4 w-4" /> */}
                    {customer.address.street},<br /> {customer.address.city}{" "}
                    <br /> {customer.address.state}{" "}
                    {customer.address.postalCode}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-full border-l ps-6">
            <div className="space-y-1">
              <h1>Marketing</h1>
              <p>
                Email non souscrit <br />
                SMS non souscrit
              </p>
            </div>

            <div className="space-y-1 mt-4">
              <h1>Exonération fiscale</h1>
              <p>
                Aucune exonération <br />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <CustomerNotes customer={customer} />
    </>
  );
}
