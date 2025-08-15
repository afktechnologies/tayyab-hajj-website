"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface DeleteTripButtonProps {
  id: string;
  destination: string;
}

export default function DeleteTripButton({ id, destination }: DeleteTripButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${destination}?`)) {
      try {
        const response = await fetch("/api/admin/trips", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          router.refresh();
        } else {
          alert("Failed to delete trip.");
        }
      } catch {
        alert("Something went wrong, please try again.");
      }
    }
  };

  return (
    <Button
      variant="outline"
      className="border-[#DCD1D5] text-[#171717] hover:bg-[#DCD1D5]"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}