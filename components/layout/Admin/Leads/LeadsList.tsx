// "use client";

// import { useEffect, useState } from "react";
// import { ILead } from "@/models/Leads";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Eye } from "lucide-react";

// interface LeadsListProps {
//   leads: ILead[];
// }

// const LeadsList = ({ leads }: LeadsListProps) => {
//   const [sortedLeads, setSortedLeads] = useState<ILead[]>([]);
//   const [sortColumn, setSortColumn] = useState<keyof ILead>("createdAt");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalData, setModalData] = useState<ILead | null>(null);

//   useEffect(() => {
//     const sortedData = sortData(leads, sortColumn, sortOrder);
//     setSortedLeads(sortedData);
//   }, [leads, sortColumn, sortOrder]);

//   const sortData = (data: ILead[], column: keyof ILead, order: "asc" | "desc") => {
//     return [...data].sort((a, b) => {
//       if (column === "createdAt") {
//         return order === "asc"
//           ? new Date(a[column]).getTime() - new Date(b[column]).getTime()
//           : new Date(b[column]).getTime() - new Date(a[column]).getTime();
//       }
//       return order === "asc"
//         ? (a[column] || "").localeCompare(b[column] || "")
//         : (b[column] || "").localeCompare(a[column] || "");
//     });
//   };

//   const handleSort = (column: keyof ILead) => {
//     const newSortOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
//     setSortColumn(column);
//     setSortOrder(newSortOrder);
//   };

//   const handleViewDetails = (lead: ILead) => {
//     setModalData(lead);
//     setIsModalOpen(true);
//   };

//   return (
//     <>
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="bg-[#FAFAFA] border-[#DCD1D5]">
//           <DialogHeader>
//             <DialogTitle className="text-[#171717]">Lead Details</DialogTitle>
//           </DialogHeader>
//           {modalData && (
//             <div className="space-y-4 text-[#171717]">
//               <p><strong>Enquiry For:</strong> {modalData.enquiryFor}</p>
//               <p><strong>Name:</strong> {modalData.name}</p>
//               <p><strong>Email:</strong> {modalData.email}</p>
//               <p><strong>Subject:</strong> {modalData.subject}</p>
//               <p><strong>Message:</strong> {modalData.message}</p>
//               <p><strong>Date:</strong> {new Date(modalData.createdAt).toLocaleString()}</p>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       <div className="space-y-4">
//         <h3 className="text-2xl font-bold text-[#171717]">Leads Data List</h3>
//         <div className="bg-[#FAFAFA] rounded-lg shadow-md border-[#DCD1D5] overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-[#DCD1D5]">
//                 {["name", "email", "subject", "createdAt"].map((column) => (
//                   <TableHead
//                     key={column}
//                     onClick={() => handleSort(column as keyof ILead)}
//                     className="text-[#171717] cursor-pointer hover:bg-[#AF99A1]"
//                   >
//                     {column === "createdAt"
//                       ? "Date"
//                       : column.charAt(0).toUpperCase() + column.slice(1)}
//                     {sortColumn === column && (
//                       <span className="ml-2">
//                         {sortOrder === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </TableHead>
//                 ))}
//                 <TableHead className="text-[#171717]">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {sortedLeads
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((lead) => (
//                   <TableRow key={lead._id.toString()} className="border-[#DCD1D5]">
//                     <TableCell className="text-[#171717]">{lead.name}</TableCell>
//                     <TableCell className="text-[#171717]">{lead.email}</TableCell>
//                     <TableCell className="text-[#171717]">{lead.subject}</TableCell>
//                     <TableCell className="text-[#171717]">
//                       {new Date(lead.createdAt).toLocaleString()}
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="ghost"
//                         onClick={() => handleViewDetails(lead)}
//                         className="text-[#00F0B1] hover:text-[#20FFDF]"
//                       >
//                         <Eye className="h-5 w-5" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//           <div className="flex justify-between items-center p-4 bg-[#FAFAFA] border-t border-[#DCD1D5]">
//             <Button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
//               disabled={page === 0}
//               className="bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA] disabled:bg-[#757575]"
//             >
//               Previous
//             </Button>
//             <span className="text-[#171717]">
//               Page {page + 1} of {Math.ceil(sortedLeads.length / rowsPerPage)}
//             </span>
//             <Button
//               onClick={() => setPage((prev) => prev + 1)}
//               disabled={page >= Math.ceil(sortedLeads.length / rowsPerPage) - 1}
//               className="bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA] disabled:bg-[#757575]"
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LeadsList;



"use client";

import { useEffect, useState } from "react";
import { ILead } from "@/models/Leads";
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
import { Eye } from "lucide-react";

interface LeadsListProps {
  leads: ILead[];
}

const LeadsList = ({ leads }: LeadsListProps) => {
  const [sortedLeads, setSortedLeads] = useState<ILead[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof ILead>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ILead | null>(null);

  useEffect(() => {
    const sortedData = sortData(leads, sortColumn, sortOrder);
    setSortedLeads(sortedData);
  }, [leads, sortColumn, sortOrder]);

  const sortData = (data: ILead[], column: keyof ILead, order: "asc" | "desc") => {
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

  const handleSort = (column: keyof ILead) => {
    const newSortOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleViewDetails = (lead: ILead) => {
    setModalData(lead);
    setIsModalOpen(true);
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#FAFAFA] border-[#DCD1D5]">
          <DialogHeader>
            <DialogTitle className="text-[#171717]">Lead Details</DialogTitle>
          </DialogHeader>
          {modalData && (
            <div className="space-y-4 text-[#171717]">
              <p><strong>Enquiry For:</strong> {modalData.enquiryFor || "N/A"}</p>
              <p><strong>Name:</strong> {modalData.name}</p>
              <p><strong>Email:</strong> {modalData.email}</p>
              <p><strong>Subject:</strong> {modalData.subject}</p>
              <p><strong>Message:</strong> {modalData.message}</p>
              <p><strong>Date:</strong> {new Date(modalData.createdAt).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-[#171717]">Leads Data List</h3>
        <div className="bg-[#FAFAFA] rounded-lg shadow-md border-[#DCD1D5] overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#DCD1D5]">
                {["enquiryFor", "name", "email", "subject", "createdAt"].map((column) => (
                  <TableHead
                    key={column}
                    onClick={() => handleSort(column as keyof ILead)}
                    className="text-[#171717] cursor-pointer hover:bg-[#AF99A1]"
                  >
                    {column === "createdAt"
                      ? "Date"
                      : column === "enquiryFor"
                      ? "Enquiry For"
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
              {sortedLeads
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((lead) => (
                  <TableRow key={lead._id.toString()} className="border-[#DCD1D5]">
                    <TableCell className="text-[#171717]">{lead.enquiryFor || "N/A"}</TableCell>
                    <TableCell className="text-[#171717]">{lead.name}</TableCell>
                    <TableCell className="text-[#171717]">{lead.email}</TableCell>
                    <TableCell className="text-[#171717]">{lead.subject}</TableCell>
                    <TableCell className="text-[#171717]">
                      {new Date(lead.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => handleViewDetails(lead)}
                        className="text-[#00F0B1] hover:text-[#20FFDF]"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
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
              Page {page + 1} of {Math.ceil(sortedLeads.length / rowsPerPage)}
            </span>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= Math.ceil(sortedLeads.length / rowsPerPage) - 1}
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

export default LeadsList;