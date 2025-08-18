import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="fixed top-4 left-4 z-50 bg-white border-gray-200 text-stone-900 hover:bg-green-700 hover:text-white hover:border-green-700"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-white w-64 p-4 border-r border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-stone-900">Admin Panel</h2>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="p-2 bg-white border-gray-200 text-stone-900 hover:bg-green-700 hover:text-white hover:border-green-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
          <nav className="flex flex-col space-y-2">
            <Link
              href="/admin"
              className="py-2 px-4 text-stone-900 hover:bg-green-700 hover:text-white rounded"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/leads"
              className="py-2 px-4 text-stone-900 hover:bg-green-700 hover:text-white rounded"
            >
              Leads
            </Link>
            <Link
              href="/admin/testimonials"
              className="py-2 px-4 text-stone-900 hover:bg-green-700 hover:text-white rounded"
            >
              Testimonials
            </Link>
            <Link
              href="/admin/service"
              className="py-2 px-4 text-stone-900 hover:bg-green-700 hover:text-white rounded"
            >
              Services
            </Link>
            <Link
              href="/admin/destinations"
              className="py-2 px-4 text-stone-900 hover:bg-green-700 hover:text-white rounded"
            >
              Destinations
            </Link>
            <Link
              href="/admin/gallery"
              className="py-2 px-4 text-stone-900 hover:bg-green-700 hover:text-white rounded"
            >
              Gallery
            </Link>
            <Link
              href="/admin/trips"
              className="py-2 px-4 text-stone-900 hover:bg-green-700 hover:text-white rounded"
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