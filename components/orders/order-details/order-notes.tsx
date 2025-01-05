import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Order } from "@/lib/types/order";
import { useState } from "react";

interface OrderNotesProps {
  order: Order;
}

export function OrderNotes({ order }: OrderNotesProps) {
  const [isEditNote, setIsEditNote] = useState(false);
  // const [actualNote, setActualNote] = useState(order.notes);
  const [notes, setNotes] = useState(order.notes);
  // if (!order.notes) {
  //   return null;
  // }

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
      <CardContent>
        {!isEditNote && (
          <div>
            {order.notes === "" || order.notes === undefined
              ? "Ce client n’a encore aucune note"
              : order.notes}
          </div>
        )}
        {isEditNote && (
          <>
            <Textarea
              placeholder="Add a note about this customer..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
            <div>
              <Button
                onClick={() => {
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
}
