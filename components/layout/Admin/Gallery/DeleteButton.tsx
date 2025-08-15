"use client";

import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
  id: string;
  category: string;
}

export default function DeleteButton({ id, category }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${category}?`)) {
      try {
        const response = await fetch("/api/admin/gallery", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          window.location.reload();
        } else {
          alert("Failed to delete category.");
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