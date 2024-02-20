/** @format */

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VariantProps } from "class-variance-authority";

interface Props {
  className?: string;
  variant: VariantProps<typeof buttonVariants>["variant"];
  props?: React.HTMLAttributes<HTMLDivElement>;
}
function ToggleTheme({ className, variant, ...props }: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className={className} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} className="flex" size="icon">
            {resolvedTheme === "light" ? <Moon /> : <Sun />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default ToggleTheme;
