"use client"

import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Typography, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { ITrip } from "@/models/Trip";
import DeleteTripButton from "@/components/layout/Admin/Trips/DeleteTripButton";
import { Add } from "@mui/icons-material";

interface TripListProps {
  trips: ITrip[] | null;
  error?: string;
}

const TripList = ({ trips, error }: TripListProps) => {
  const [sortedTrips, setSortedTrips] = useState<ITrip[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (trips) {
      setSortedTrips(trips);
    }
  }, [trips]);

  const columns: GridColDef[] = [
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ position: "relative", width: "64px", height: "48px" }}>
          <Image
            src={params.value.src || "/placeholder.svg"}
            alt={params.value.alt}
            fill
            style={{ objectFit: "cover", borderRadius: "4px" }}
          />
        </Box>
      ),
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Link href={`/admin/trips/edit/${params.row._id}`}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ bgcolor: "#1976D2", "&:hover": { bgcolor: "#115293" } }}
            >
              Edit
            </Button>
          </Link>
          <DeleteTripButton id={params.row._id.toString()} destination={params.row.destination} />
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: "24px", bgcolor: "#F5F5F5" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "24px" }}>
        <Typography sx={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1F2937", fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
          Manage Trips
        </Typography>
        <Link href="/admin/trips/create">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{ bgcolor: "#1976D2", "&:hover": { bgcolor: "#115293" } }}
          >
            Add New Trip
          </Button>
        </Link>
      </Box>
      {error || !trips ? (
        <Typography sx={{ color: "#EF4444", textAlign: "center" }}>
          Unable to load trips. Please try again later.
        </Typography>
      ) : (
        <Box sx={{ bgcolor: "#FFFFFF", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <DataGrid
            rows={sortedTrips}
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
            localeText={{
              noRowsLabel: "No trips found.",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default TripList;