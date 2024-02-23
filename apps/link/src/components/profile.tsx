"use client";

import { forwardRef } from "react";
import { Laptop, LogOut, Moon, Sun } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProfileProps {
  session?: Session | null | undefined;
  className?: string;
}

const Profile = forwardRef<HTMLDivElement, ProfileProps>(
  ({ session, className }, ref) => {
    const { setTheme } = useTheme();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              `mx-2 my-2 flex cursor-pointer rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800`,
              className,
            )}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user?.image ?? undefined} />
              <AvatarFallback>
                <Skeleton className="h-full w-full rounded-full" />
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent ref={ref} className="ml-2 w-56 sm:ml-4 md:ml-8">
          <DropdownMenuLabel>
            My Account
            <span className="sr-only">My Account</span>
            {session?.user?.email ? (
              <span className="text-xs block text-secondary-foreground/60">
                {session.user.email}
              </span>
            ) : null}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex h-auto w-full items-center justify-start gap-2 p-0 border-none ring-0 outline-none hover:cursor-pointer">
                    <span className="relative h-4 w-4">
                      <Sun className="absolute h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute  h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </span>
                    <span> User theme </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setTheme("light");
                    }}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setTheme("dark");
                    }}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setTheme("system");
                    }}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);
Profile.displayName = "Profile";

export default Profile;
