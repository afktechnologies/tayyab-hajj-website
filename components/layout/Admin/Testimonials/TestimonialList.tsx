"use client"

import { useEffect, useState } from "react";
import { ITestimonial } from "@/models/Testimonial";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button, TextField, Typography, Box, Rating } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Loader from "@/components/common/Loader";

interface TestimonialListProps {
  testimonials: ITestimonial[];
}

interface FormData {
  name: string;
  location: string;
  rating: number;
  feedback: string;
}

const TestimonialList = ({ testimonials }: TestimonialListProps) => {
  const [sortedTestimonials, setSortedTestimonials] = useState<ITestimonial[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ITestimonial | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSortedTestimonials(testimonials);
  }, [testimonials]);

  const handleViewDetails = (testimonial: ITestimonial) => {
    setModalData(testimonial);
    setIsViewModalOpen(true);
  };

  const handleEdit = (testimonial: ITestimonial) => {
    setModalData(testimonial);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (result.success) {
        setSortedTestimonials((prev) => prev.filter((t) => t._id.toString() !== id));
        setLoading(false);
      } else {
        setError(result.message || "Failed to delete testimonial.");
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
      setLoading(false);
    }
  };

  const handleEditSubmit = async (values: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: modalData?._id, formData: values }),
      });

      const result = await response.json();

      if (result.success) {
        setSortedTestimonials((prev) =>
          prev.map((t) => (t._id.toString() === modalData?._id.toString() ? { ...t, ...result.testimonial } : t))
        );
        setIsEditModalOpen(false);
        setLoading(false);
      } else {
        setError(result.message || "Failed to update testimonial.");
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Your name is required!")
      .min(3, "The name must be at least 3 characters long")
      .max(32, "The name can't exceed 32 characters")
      .matches(/^[a-zA-Z\s]*$/, "Numbers and special characters are not allowed in the name"),
    location: Yup.string()
      .required("Location address is required!"),
    rating: Yup.number()
      .required("Rating is required!")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5"),
    feedback: Yup.string()
      .required("Feedback is required!")
      .max(1000, "Feedback can't exceed 1000 characters"),
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => `${params.value}/5`,
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
          Testimonial Details
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#FFFFFF", color: "#1F2937" }}>
          {modalData && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", pt: "16px" }}>
              <Typography><strong>Name:</strong> {modalData.name}</Typography>
              <Typography><strong>Location:</strong> {modalData.location}</Typography>
              <Typography><strong>Rating:</strong> {modalData.rating}/5</Typography>
              <Typography><strong>Feedback:</strong> {modalData.feedback}</Typography>
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

      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#F5F5F5", color: "#1F2937", fontWeight: "bold", fontSize: "1.5rem" }}>
          Edit Testimonial
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#FFFFFF", pt: "16px" }}>
          {modalData && (
            <Formik
              initialValues={{
                name: modalData.name,
                location: modalData.location,
                rating: modalData.rating,
                feedback: modalData.feedback,
              }}
              validationSchema={validationSchema}
              onSubmit={handleEditSubmit}
            >
              {({ errors, touched, handleBlur, values, setFieldValue }) => (
                <Form style={{ display: "grid", gap: "16px" }}>
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "16px" }}>
                    <Typography sx={{ textAlign: "right", color: "#1F2937" }}>Name</Typography>
                    <Box>
                      <TextField
                        id="name"
                        value={values.name}
                        onChange={(e) => setFieldValue("name", e.target.value)}
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
                      {touched.name && errors.name && (
                        <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                          {errors.name}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "16px" }}>
                    <Typography sx={{ textAlign: "right", color: "#1F2937" }}>Location</Typography>
                    <Box>
                      <TextField
                        id="location"
                        value={values.location}
                        onChange={(e) => setFieldValue("location", e.target.value)}
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
                      {touched.location && errors.location && (
                        <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                          {errors.location}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "16px" }}>
                    <Typography sx={{ textAlign: "right", color: "#1F2937" }}>Rating</Typography>
                    <Box>
                      <Rating
                        value={values.rating}
                        onChange={(_, newValue) => setFieldValue("rating", newValue)}
                        sx={{ color: "#FBBF24" }}
                      />
                      {touched.rating && errors.rating && (
                        <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                          {errors.rating}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "start", gap: "16px" }}>
                    <Typography sx={{ textAlign: "right", color: "#1F2937", pt: "8px" }}>Feedback</Typography>
                    <Box>
                      <TextField
                        id="feedback"
                        value={values.feedback}
                        onChange={(e) => setFieldValue("feedback", e.target.value)}
                        onBlur={handleBlur}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Your experience..."
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
                      {touched.feedback && errors.feedback && (
                        <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                          {errors.feedback}
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
                    Update Testimonial
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#FFFFFF" }}>
          <Button onClick={() => setIsEditModalOpen(false)} color="primary" sx={{ color: "#1976D2" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ p: "24px", bgcolor: "#F5F5F5" }}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1F2937", mb: "16px" }}>
          Testimonials Data List
        </Typography>
        <Box sx={{ bgcolor: "#FFFFFF", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <DataGrid
            rows={sortedTestimonials}
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

export default TestimonialList;