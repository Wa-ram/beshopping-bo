import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
// import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileNav } from "./mobile-nav";
import { logout } from "@/lib/api/auth";
import { toast } from "@/hooks/use-toast";
import { Search as SearchComponent } from "@/components/search";
import { useAuth } from "@/lib/auth/auth-provider";
import { getInitials } from "@/lib/utils/utils";

export function UserNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { logout: storageLogout } = useAuth();

  const mutation = useMutation({
    mutationFn: async () => {
      return logout();
    },
    onSuccess: () => {
      storageLogout();
      router.push("/login");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Logout failed. Please try again.",
      });
    },
  });

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4 md:hidden">
        <MobileNav />
        <h1 className="text-xl font-bold">BeShopping</h1>
      </div>

      <div className="flex items-center space-x-4 md:justify-between md:w-full">
        <div className="hidden md:block">
          <SearchComponent />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials(user?.name)} </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{`${user?.name}`}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="">
              {!pathname.startsWith("/dashboard") ? (
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  Tableau de bord
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={() => router.push("/store-details")}
                  >
                    Détails de la boutique
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/shipping")}>
                    Expédition et livraison
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/taxes")}>
                    Impôts et taxes
                  </DropdownMenuItem>
                </>
              )}

              <DropdownMenuSeparator />
            </div>
            <DropdownMenuItem onClick={() => mutation.mutate()}>
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
