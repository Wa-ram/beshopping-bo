import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetDescription 
} from "@/components/ui/sheet";
import { NavigationMenu } from "./navigation-menu";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="hidden">Navigation Menu</SheetTitle>
          <SheetDescription className="hidden">
            Access navigation options and settings
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <NavigationMenu />
        </div>
      </SheetContent>
    </Sheet>
  );
}