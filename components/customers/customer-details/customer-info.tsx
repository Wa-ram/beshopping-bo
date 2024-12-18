import { Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Customer } from "@/lib/types/customer"

interface CustomerInfoProps {
  customer: Customer
}

export function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4" />
          {customer.email}
        </div>
        {customer.phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" />
            {customer.phone}
          </div>
        )}
        {customer.address && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            {customer.address.street}, {customer.address.city}, {customer.address.state} {customer.address.postalCode}
          </div>
        )}
      </CardContent>
    </Card>
  )
}