// "use client"

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
//         <DialogContent className="bg-white border-gray-200">
//           <DialogHeader>
//             <DialogTitle className="text-gray-900 text-2xl font-bold">Lead Details</DialogTitle>
//           </DialogHeader>
//           {modalData && (
//             <div className="space-y-4 text-gray-900">
//               <p><strong>Enquiry For:</strong> {modalData.enquiryFor || "N/A"}</p>
//               <p><strong>Name:</strong> {modalData.name}</p>
//               <p><strong>Email:</strong> {modalData.email}</p>
//               <p><strong>Subject:</strong> {modalData.subject}</p>
//               <p><strong>Message:</strong> {modalData.message}</p>
//               <p><strong>Date:</strong> {new Date(modalData.createdAt).toLocaleString()}</p>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       <div className="space-y-6">
//         <h3 className="text-2xl font-bold text-gray-900">Leads Data List</h3>
//         <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-100 hover:bg-gray-200">
//                 {["enquiryFor", "name", "email", "subject", "createdAt"].map((column) => (
//                   <TableHead
//                     key={column}
//                     onClick={() => handleSort(column as keyof ILead)}
//                     className="text-gray-900 font-semibold cursor-pointer"
//                   >
//                     {column === "createdAt"
//                       ? "Date"
//                       : column === "enquiryFor"
//                       ? "Enquiry For"
//                       : column.charAt(0).toUpperCase() + column.slice(1)}
//                     {sortColumn === column && (
//                       <span className="ml-2 text-black">
//                         {sortOrder === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </TableHead>
//                 ))}
//                 <TableHead className="text-gray-900 font-semibold">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {sortedLeads
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((lead) => (
//                   <TableRow key={lead._id.toString()} className="border-gray-200 hover:bg-gray-50">
//                     <TableCell className="text-gray-900">{lead.enquiryFor || "N/A"}</TableCell>
//                     <TableCell className="text-gray-900">{lead.name}</TableCell>
//                     <TableCell className="text-gray-900">{lead.email}</TableCell>
//                     <TableCell className="text-gray-900">{lead.subject}</TableCell>
//                     <TableCell className="text-gray-900">
//                       {new Date(lead.createdAt).toLocaleString()}
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="ghost"
//                         onClick={() => handleViewDetails(lead)}
//                         className="text-yellow-500 hover:text-yellow-600"
//                       >
//                         <Eye className="h-5 w-5" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//           <div className="flex justify-between items-center p-4 bg-white border-t border-gray-200">
//             <Button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
//               disabled={page === 0}
//               className="bg-green-700 hover:bg-green-800 text-white disabled:bg-gray-400 disabled:text-gray-700"
//             >
//               Previous
//             </Button>
//             <span className="text-gray-900">
//               Page {page + 1} of {Math.ceil(sortedLeads.length / rowsPerPage)}
//             </span>
//             <Button
//               onClick={() => setPage((prev) => prev + 1)}
//               disabled={page >= Math.ceil(sortedLeads.length / rowsPerPage) - 1}
//               className="bg-green-700 hover:bg-green-800 text-white disabled:bg-gray-400 disabled:text-gray-700"
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




"use client"

import { useEffect, useState } from "react";
import { ILead } from "@/models/Leads";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Visibility } from "@mui/icons-material";

interface LeadsListProps {
  leads: ILead[];
}

const LeadsList = ({ leads }: LeadsListProps) => {
  const [sortedLeads, setSortedLeads] = useState<ILead[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ILead | null>(null);

  useEffect(() => {
    setSortedLeads(leads);
  }, [leads]);

  const handleViewDetails = (lead: ILead) => {
    setModalData(lead);
    setIsModalOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "enquiryFor",
      headerName: "Enquiry For",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          onClick={() => handleViewDetails(params.row)}
          startIcon={<Visibility />}
          sx={{ color: "#FBBF24" }}
        >
        </Button>
      ),
    },
  ];

  return (
    <>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#F5F5F5", color: "#1F2937", fontWeight: "bold", fontSize: "1.5rem" }}>
          Lead Details
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#FFFFFF", color: "#1F2937" }}>
          {modalData && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingTop: "16px" }}>
              <p><strong>Enquiry For:</strong> {modalData.enquiryFor || "N/A"}</p>
              <p><strong>Name:</strong> {modalData.name}</p>
              <p><strong>Email:</strong> {modalData.email}</p>
              <p><strong>Subject:</strong> {modalData.subject}</p>
              <p><strong>Message:</strong> {modalData.message}</p>
              <p><strong>Date:</strong> {new Date(modalData.createdAt).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#FFFFFF" }}>
          <Button onClick={() => setIsModalOpen(false)} color="primary" sx={{ color: "#1976D2" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ padding: "24px", backgroundColor: "#F5F5F5" }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1F2937", marginBottom: "16px" }}>
          Leads Data List
        </h3>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <DataGrid
            rows={sortedLeads}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            paginationModel={{ page, pageSize: rowsPerPage }}
            onPaginationModelChange={({ page, pageSize }) => {
              setPage(page);
              setRowsPerPage(pageSize);
            }}
            getRowId={(row) => row._id.toString()}
            autoHeight
            sx={{
              "& .MuiDataGrid-root": {
                border: "1px solid #E5E7EB",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#F5F5F5",
                color: "#1F2937",
                fontWeight: "600",
              },
              "& .MuiDataGrid-row": {
                borderBottom: "1px solid #E5E7EB",
                "&:hover": {
                  backgroundColor: "#F9FAFB",
                },
              },
              "& .MuiDataGrid-cell": {
                color: "#1F2937",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#FFFFFF",
                borderTop: "1px solid #E5E7EB",
              },
              "& .MuiTablePagination-root": {
                color: "#1F2937",
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LeadsList;