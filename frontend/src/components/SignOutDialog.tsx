"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#181818] border border-white/10 text-white rounded-2xl max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-xl">Sign Out</AlertDialogTitle>
          <AlertDialogDescription className="text-white/50 text-base">
            Are you sure you want to sign out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-white/10 text-black hover:bg-white/5 hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => signOut()}
            className="bg-rose-600 hover:bg-rose-500 text-white"
          >
            Sign Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
