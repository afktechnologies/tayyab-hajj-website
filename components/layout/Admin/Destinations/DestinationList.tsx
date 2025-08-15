"use client";

import { useEffect, useState } from "react";
import { IDestination } from "@/models/Destination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import Image from "next/image";

interface DestinationListProps {
  destinations: IDestination[];
}

const DestinationList = ({ destinations }: DestinationListProps) => {
  const router = useRouter();
  const [sortedDestinations, setSortedDestinations] = useState<IDestination[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof IDestination>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalData, setModalData] = useState<IDestination | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sortedData = sortData(destinations, sortColumn, sortOrder);
    setSortedDestinations(sortedData);
  }, [destinations, sortColumn, sortOrder]);

  const sortData = (data: IDestination[], column: keyof IDestination, order: "asc" | "desc") => {
    return [...data].sort((a, b) => {
      if (column === "createdAt") {
        return order === "asc"
          ? new Date(a[column]).getTime() - new Date(b[column]).getTime()
          : new Date(b[column]).getTime() - new Date(a[column]).getTime();
      }
      return order === "asc"
        ? (a[column] || "").localeCompare(b[column] || "")
        : (b[column] || "").localeCompare(a[column] || "");
    });
  };

  const handleSort = (column: keyof IDestination) => {
    const newSortOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleViewDetails = (destination: IDestination) => {
    setModalData(destination);
    setIsViewModalOpen(true);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/destinations/edit/${id}`);
  };

  const handleCreate = () => {
    router.push("/admin/destinations/create");
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/destinations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (result.success) {
        setSortedDestinations((prev) => prev.filter((d) => d._id.toString() !== id));
        setLoading(false);
      } else {
        setError(result.message || "Failed to delete destination.");
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader value="Processing..." />}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="bg-[#FAFAFA] border-[#DCD1D5]">
          <DialogHeader>
            <DialogTitle className="text-[#171717]">Destination Details</DialogTitle>
          </DialogHeader>
          {modalData && (
            <div className="space-y-4 text-[#171717]">
              <p><strong>Name:</strong> {modalData.name}</p>
              <p><strong>Description:</strong> {modalData.description}</p>
              <p><strong>Significance:</strong> {modalData.significance}</p>
              <p><strong>City:</strong> {modalData.city}</p>
              <p><strong>Image:</strong></p>
              <div className="relative w-full h-48">
                <Image src={modalData.image} alt={modalData.name} fill className="object-cover rounded" />
              </div>
              <p><strong>Date:</strong> {new Date(modalData.createdAt).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-[#171717]">Destinations Data List</h3>
          <Button
            onClick={handleCreate}
            className="bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA]"
          >
            Create New Destination
          </Button>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg shadow-md border-[#DCD1D5] overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#DCD1D5]">
                {["name", "city", "createdAt"].map((column) => (
                  <TableHead
                    key={column}
                    onClick={() => handleSort(column as keyof IDestination)}
                    className="text-[#171717] cursor-pointer hover:bg-[#AF99A1]"
                  >
                    {column === "createdAt"
                      ? "Date"
                      : column.charAt(0).toUpperCase() + column.slice(1)}
                    {sortColumn === column && (
                      <span className="ml-2">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </TableHead>
                ))}
                <TableHead className="text-[#171717]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDestinations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((destination) => (
                  <TableRow key={destination._id.toString()} className="border-[#DCD1D5]">
                    <TableCell className="text-[#171717]">{destination.name}</TableCell>
                    <TableCell className="text-[#171717]">{destination.city}</TableCell>
                    <TableCell className="text-[#171717]">
                      {new Date(destination.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          onClick={() => handleViewDetails(destination)}
                          className="text-[#00F0B1] hover:text-[#20FFDF]"
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleEdit(destination._id.toString())}
                          className="text-[#00F0B1] hover:text-[#20FFDF]"
                        >
                          <Edit className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(destination._id.toString())}
                          className="text-[#654A55] hover:text-[#533641]"
                        >
                          <Trash className="h-5 w-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center p-4 bg-[#FAFAFA] border-t border-[#DCD1D5]">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className="bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA] disabled:bg-[#757575]"
            >
              Previous
            </Button>
            <span className="text-[#171717]">
              Page {page + 1} of {Math.ceil(sortedDestinations.length / rowsPerPage)}
            </span>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= Math.ceil(sortedDestinations.length / rowsPerPage) - 1}
              className="bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA] disabled:bg-[#757575]"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationList;