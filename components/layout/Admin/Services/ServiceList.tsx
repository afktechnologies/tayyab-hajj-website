"use client"

import { useEffect, useState } from "react";
import { IService } from "@/models/Service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button, TextField, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Visibility, Edit, Delete, Add } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Loader from "@/components/common/Loader";

interface ServiceListProps {
  services: IService[];
}

interface FormData {
  title: string;
  description: string;
  features: string;
  icon: string;
  color: string;
}

const ServiceList = ({ services }: ServiceListProps) => {
  const [sortedServices, setSortedServices] = useState<IService[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalData, setModalData] = useState<IService | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSortedServices(services);
  }, [services]);

  const handleViewDetails = (service: IService) => {
    setModalData(service);
    setIsViewModalOpen(true);
  };

  const handleEdit = (service: IService) => {
    setModalData(service);
    setIsEditModalOpen(true);
  };

  const handleCreate = () => {
    setModalData(null);
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/service", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (result.success) {
        setSortedServices((prev) => prev.filter((s) => s._id.toString() !== id));
        setLoading(false);
      } else {
        setError(result.message || "Failed to delete service.");
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (values: FormData, isEdit: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/service", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: isEdit ? modalData?._id : undefined,
          formData: { ...values, features: values.features.split(",").map((f) => f.trim()) },
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (isEdit) {
          setSortedServices((prev) =>
            prev.map((s) => (s._id.toString() === modalData?._id.toString() ? { ...s, ...result.service } : s))
          );
        } else {
          setSortedServices((prev) => [...prev, result.service]);
        }
        setIsEditModalOpen(false);
        setIsCreateModalOpen(false);
        setLoading(false);
      } else {
        setError(result.message || "Failed to save service.");
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required!")
      .min(3, "Title must be at least 3 characters long")
      .max(100, "Title can't exceed 100 characters"),
    description: Yup.string()
      .required("Description is required!")
      .max(500, "Description can't exceed 500 characters"),
    features: Yup.string()
      .required("Features are required!")
      .test("comma-separated", "Features must be comma-separated", (value) => {
        const arr = value.split(",").map((f) => f.trim());
        return arr.length > 0 && arr.length <= 10;
      }),
    icon: Yup.string()
      .required("Icon is required!")
      .oneOf(["Calendar", "Star", "Plane", "MessageCircle", "Users", "Shield"]),
    color: Yup.string()
      .required("Color is required!")
      .oneOf(["yellow", "green", "blue", "purple", "red"]),
  });

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "color",
      headerName: "Color",
      flex: 1,
      minWidth: 100,
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
            onClick={() => handleEdit(params.row)}
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
          Service Details
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#FFFFFF", color: "#1F2937" }}>
          {modalData && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", pt: "16px" }}>
              <Typography><strong>Title:</strong> {modalData.title}</Typography>
              <Typography><strong>Description:</strong> {modalData.description}</Typography>
              <Typography><strong>Features:</strong> {modalData.features.join(", ")}</Typography>
              <Typography><strong>Icon:</strong> {modalData.icon}</Typography>
              <Typography><strong>Color:</strong> {modalData.color}</Typography>
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

      <Dialog open={isEditModalOpen || isCreateModalOpen} onClose={() => (isEditModalOpen ? setIsEditModalOpen(false) : setIsCreateModalOpen(false))} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#F5F5F5", color: "#1F2937", fontWeight: "bold", fontSize: "1.5rem" }}>
          {isEditModalOpen ? "Edit Service" : "Create Service"}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#FFFFFF", pt: "16px" }}>
          <Formik
            initialValues={{
              title: modalData?.title || "",
              description: modalData?.description || "",
              features: modalData?.features.join(", ") || "",
              icon: modalData?.icon || "",
              color: modalData?.color || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values, isEditModalOpen)}
            enableReinitialize
          >
            {({ errors, touched, handleBlur, values, setFieldValue }) => (
              <Form style={{ display: "grid", gap: "16px" }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "16px" }}>
                  <Typography sx={{ textAlign: "right", color: "#1F2937" }}>Title</Typography>
                  <Box>
                    <TextField
                      id="title"
                      value={values.title}
                      onChange={(e) => setFieldValue("title", e.target.value)}
                      onBlur={handleBlur}
                      fullWidth
                      variant="outlined"
                      size="small"
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#E5E7EB" },
                          "&:hover fieldset": { borderColor: "#1976D2" },
                          "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                        },
                        "& .MuiInputBase-input": { color: "#1F2937" },
                      }}
                    />
                    {touched.title && errors.title && (
                      <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                        {errors.title}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "start", gap: "16px" }}>
                  <Typography sx={{ textAlign: "right", color: "#1F2937", pt: "8px" }}>Description</Typography>
                  <Box>
                    <TextField
                      id="description"
                      value={values.description}
                      onChange={(e) => setFieldValue("description", e.target.value)}
                      onBlur={handleBlur}
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#E5E7EB" },
                          "&:hover fieldset": { borderColor: "#1976D2" },
                          "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                        },
                        "& .MuiInputBase-input": { color: "#1F2937" },
                      }}
                    />
                    {touched.description && errors.description && (
                      <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                        {errors.description}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "start", gap: "16px" }}>
                  <Typography sx={{ textAlign: "right", color: "#1F2937", pt: "8px" }}>Features</Typography>
                  <Box>
                    <TextField
                      id="features"
                      value={values.features}
                      onChange={(e) => setFieldValue("features", e.target.value)}
                      onBlur={handleBlur}
                      fullWidth
                      multiline
                      rows={2}
                      variant="outlined"
                      placeholder="Comma-separated list"
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#E5E7EB" },
                          "&:hover fieldset": { borderColor: "#1976D2" },
                          "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                        },
                        "& .MuiInputBase-input": { color: "#1F2937" },
                      }}
                    />
                    {touched.features && errors.features && (
                      <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                        {errors.features}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "16px" }}>
                  <Typography sx={{ textAlign: "right", color: "#1F2937" }}>Icon</Typography>
                  <Box>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel sx={{ color: "#1F2937" }}>Icon</InputLabel>
                      <Select
                        value={values.icon}
                        onChange={(e) => setFieldValue("icon", e.target.value)}
                        label="Icon"
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976D2" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976D2" },
                          "& .MuiSelect-select": { color: "#1F2937" },
                        }}
                      >
                        {["Calendar", "Star", "Plane", "MessageCircle", "Users", "Shield"].map((icon) => (
                          <MenuItem key={icon} value={icon}>{icon}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.icon && errors.icon && (
                      <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                        {errors.icon}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "16px" }}>
                  <Typography sx={{ textAlign: "right", color: "#1F2937" }}>Color</Typography>
                  <Box>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel sx={{ color: "#1F2937" }}>Color</InputLabel>
                      <Select
                        value={values.color}
                        onChange={(e) => setFieldValue("color", e.target.value)}
                        label="Color"
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976D2" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976D2" },
                          "& .MuiSelect-select": { color: "#1F2937" },
                        }}
                      >
                        {["yellow", "green", "blue", "purple", "red"].map((color) => (
                          <MenuItem key={color} value={color}>{color}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.color && errors.color && (
                      <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                        {errors.color}
                      </Typography>
                    )}
                  </Box>
                </Box>
                {error && (
                  <Typography sx={{ color: "#EF4444", fontSize: "0.875rem", textAlign: "center" }}>
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: "16px", bgcolor: "#1976D2", "&:hover": { bgcolor: "#115293" } }}
                >
                  {isEditModalOpen ? "Update Service" : "Create Service"}
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#FFFFFF" }}>
          <Button onClick={() => (isEditModalOpen ? setIsEditModalOpen(false) : setIsCreateModalOpen(false))} color="primary" sx={{ color: "#1976D2" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ p: "24px", bgcolor: "#F5F5F5" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1F2937" }}>
            Services Data List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleCreate}
            sx={{ bgcolor: "#1976D2", "&:hover": { bgcolor: "#115293" } }}
          >
            Create New Service
          </Button>
        </Box>
        <Box sx={{ bgcolor: "#FFFFFF", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <DataGrid
            rows={sortedServices}
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

export default ServiceList;