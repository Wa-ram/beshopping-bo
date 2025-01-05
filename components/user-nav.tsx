"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "@/components/search";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export function UserNav() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      return logout();
    },
    // mutationFn: ,
    onSuccess: () =>
      // data

      {
        // login(data.token, data.user);
        router.push("/login");
      },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Registration failed. Please try again.",
      });
    },
  });

  return (
    <div className="flex items-center justify-between w-full">
      <div className="p-4 md:hidden">
        <h1 className="text-xl font-bold">BeShopping</h1>
      </div>
      <div className="w-min-content flex space-x-4 md:justify-between md:w-full">
        <Search />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@username" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/dashboard")}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/store-details")}>
              Store Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/shipping")}>
              Shipping & Delivery
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/taxes")}>
              Taxes & Duties
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => mutation.mutate()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
