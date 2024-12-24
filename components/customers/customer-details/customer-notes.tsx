import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCustomerStore } from "@/lib/stores/customer-store";
import { Customer } from "@/lib/types/customer";
import React, { useState } from "react";

interface CustomerInfoProps {
  customer: Customer;
}

const CustomerNotes = ({ customer }: CustomerInfoProps) => {
  const [isEditNote, setIsEditNote] = useState(false);
  const [actualNote, setActualNote] = useState(customer.notes);

  const { updateCustomerNote } = useCustomerStore();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Notes</CardTitle>
          <span
            onClick={() => {
              setIsEditNote(true);
            }}
          >
            edit
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {!isEditNote && (
          <div>
            {customer.notes === "" || customer.notes === undefined
              ? "Ce client n’a encore aucune note"
              : customer.notes}
          </div>
        )}
        {isEditNote && (
          <>
            <Textarea
              placeholder="Add a note about this customer..."
              value={customer.notes || ""}
              onChange={(e) => updateCustomerNote(customer.id, e.target.value)}
              className="min-h-[100px]"
            />
            <div>
              <Button
                onClick={() => {
                  if (actualNote !== undefined) {
                    updateCustomerNote(customer.id, actualNote);
                  }
                  setIsEditNote(false);
                }}
              >
                Annuler
              </Button>
              {/* <Button>Valider la note</Button> */}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerNotes;
