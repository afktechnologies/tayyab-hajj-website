import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen bg-[#E5E5E5]">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline" className="fixed top-4 left-4 z-50 bg-[#FAFAFA] border-[#DCD1D5] text-[#171717]">
            <Menu className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-[#FAFAFA] w-64 p-4 border-r border-[#DCD1D5]">
          <h2 className="text-xl font-bold text-[#171717] mb-6">Admin Panel</h2>
          <nav className="flex flex-col space-y-2">
            <Link
              href="/admin"
              className="py-2 px-4 text-[#171717] hover:bg-[#DCD1D5] hover:text-[#00F0B1] rounded"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/leads"
              className="py-2 px-4 text-[#171717] hover:bg-[#DCD1D5] hover:text-[#00F0B1] rounded"
            >
              Leads
            </Link>
            <Link
              href="/admin/testimonials"
              className="py-2 px-4 text-[#171717] hover:bg-[#DCD1D5] hover:text-[#00F0B1] rounded"
            >
              Testimonials
            </Link>
            <Link
              href="/admin/service"
              className="py-2 px-4 text-[#171717] hover:bg-[#DCD1D5] hover:text-[#00F0B1] rounded"
            >
              Services
            </Link>
            <Link
              href="/admin/destinations"
              className="py-2 px-4 text-[#171717] hover:bg-[#DCD1D5] hover:text-[#00F0B1] rounded"
            >
              Destinations
            </Link>
             <Link
              href="/admin/gallery"
              className="py-2 px-4 text-[#171717] hover:bg-[#DCD1D5] hover:text-[#00F0B1] rounded"
            >
              Gallery
            </Link>
             <Link
              href="/admin/trips"
              className="py-2 px-4 text-[#171717] hover:bg-[#DCD1D5] hover:text-[#00F0B1] rounded"
            >
              Upcoming Trips
            </Link>
          </nav>
        </DrawerContent>
      </Drawer>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}