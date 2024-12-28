"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

export function Search() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-64 h-8 px-2 text-sm text-muted-foreground rounded-md ring-1 ring-inset ring-gray-200 dark:ring-gray-800 hover:ring-gray-300 dark:hover:ring-gray-700"
      >
        <SearchIcon className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100">
          <span>⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard"))}
            >
              Dashboard
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/products"))}
            >
              Products
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/customers"))}
            >
              Customers
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/orders"))}
            >
              Orders
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
