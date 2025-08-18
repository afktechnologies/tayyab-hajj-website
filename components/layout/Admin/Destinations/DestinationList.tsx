"use client"

import { useEffect, useState } from "react";
import { IDestination } from "@/models/Destination";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button, Typography, Box } from "@mui/material";
import { Visibility, Edit, Delete, Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import Image from "next/image";

interface DestinationListProps {
  destinations: IDestination[];
}

const DestinationList = ({ destinations }: DestinationListProps) => {
  const router = useRouter();
  const [sortedDestinations, setSortedDestinations] = useState<IDestination[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalData, setModalData] = useState<IDestination | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSortedDestinations(destinations);
  }, [destinations]);

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

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      minWidth: 120,
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
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Button
            variant="text"
            color="primary"
            onClick={() => handleViewDetails(params.row)}
            startIcon={<Visibility />}
            sx={{ color: "#FBBF24" }}
          />
          <Button
            variant="text"
            color="primary"
            onClick={() => handleEdit(params.row._id.toString())}
            startIcon={<Edit />}
            sx={{ color: "#FBBF24" }}
          />
          <Button
            variant="text"
            color="error"
            onClick={() => handleDelete(params.row._id.toString())}
            startIcon={<Delete />}
            sx={{ color: "#EF4444" }}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      {loading && <Loader value="Processing..." />}
      <Dialog open={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#F5F5F5", color: "#1F2937", fontWeight: "bold", fontSize: "1.5rem" }}>
          Destination Details
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#FFFFFF", color: "#1F2937" }}>
          {modalData && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", pt: "16px" }}>
              <Typography><strong>Name:</strong> {modalData.name}</Typography>
              <Typography><strong>Description:</strong> {modalData.description}</Typography>
              <Typography><strong>Significance:</strong> {modalData.significance}</Typography>
              <Typography><strong>City:</strong> {modalData.city}</Typography>
              <Typography><strong>Image:</strong></Typography>
              <Box sx={{ position: "relative", width: "100%", height: "192px" }}>
                <Image src={modalData.image} alt={modalData.name} fill style={{ objectFit: "cover", borderRadius: "4px" }} />
              </Box>
              <Typography><strong>Date:</strong> {new Date(modalData.createdAt).toLocaleString()}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#FFFFFF" }}>
          <Button onClick={() => setIsViewModalOpen(false)} color="primary" sx={{ color: "#1976D2" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ p: "24px", bgcolor: "#F5F5F5" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1F2937" }}>
            Destinations Data List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleCreate}
            sx={{ bgcolor: "#1976D2", "&:hover": { bgcolor: "#115293" } }}
          >
            Create New Destination
          </Button>
        </Box>
        <Box sx={{ bgcolor: "#FFFFFF", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <DataGrid
            rows={sortedDestinations}
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
        </Box>
      </Box>
    </>
  );
};

export default DestinationList;