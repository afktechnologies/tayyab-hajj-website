"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import Image from "next/image";
import { IDestination } from "@/models/Destination";
import Loader from "@/components/common/Loader";

interface FormData {
  name: string;
  description: string;
  significance: string;
  image: string;
  city: string;
}

interface DestinationFormProps {
  initialValues?: IDestination;
  isEditMode?: boolean;
  destinationId?: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required!")
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name can't exceed 100 characters"),
  description: Yup.string()
    .required("Description is required!")
    .max(500, "Description can't exceed 500 characters"),
  significance: Yup.string()
    .required("Significance is required!")
    .max(200, "Significance can't exceed 200 characters"),
  image: Yup.string().required("Image is required!"),
  city: Yup.string()
    .required("City is required!")
    .oneOf(["Mecca", "Madinah"]),
});

export default function DestinationForm({ initialValues, isEditMode = false, destinationId }: DestinationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/destinations", {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditMode ? { id: destinationId, formData: values } : { formData: values }),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/destinations");
      } else {
        setError(result.message || `Failed to ${isEditMode ? "update" : "create"} destination.`);
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: "24px", bgcolor: "#F5F5F5", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", maxWidth: "600px", mx: "auto", my: "32px" }}>
      {loading && <Loader value="Processing..." />}
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1F2937", mb: "24px" }}>
        {isEditMode ? "Edit Destination" : "Create New Destination"}
      </Typography>
      <Formik
        initialValues={{
          name: initialValues?.name || "",
          description: initialValues?.description || "",
          significance: initialValues?.significance || "",
          image: initialValues?.image || "",
          city: initialValues?.city || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, handleBlur, values, setFieldValue }) => (
          <Form style={{ display: "grid", gap: "16px" }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "16px" }}>
              <Typography sx={{ textAlign: "right", color: "#1F2937" }}>Name</Typography>
              <Box>
                <TextField
                  id="name"
                  name="name"
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
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "start", gap: "16px" }}>
              <Typography sx={{ textAlign: "right", color: "#1F2937", pt: "8px" }}>Description</Typography>
              <Box>
                <TextField
                  id="description"
                  name="description"
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
              <Typography sx={{ textAlign: "right", color: "#1F2937", pt: "8px" }}>Significance</Typography>
              <Box>
                <TextField
                  id="significance"
                  name="significance"
                  value={values.significance}
                  onChange={(e) => setFieldValue("significance", e.target.value)}
                  onBlur={handleBlur}
                  fullWidth
                  multiline
                  rows={2}
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
                {touched.significance && errors.significance && (
                  <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                    {errors.significance}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "16px" }}>
              <Typography sx={{ textAlign: "right", color: "#1F2937" }}>Image</Typography>
              <Box>
                <CloudinaryUpload
                  setImageUrl={(url: string) => setFieldValue("image", url)}
                  size="400 x 300"
                />
                {values.image && (
                  <Box sx={{ position: "relative", width: "100%", height: "96px", mt: "8px" }}>
                    <Image src={values.image} alt="Preview" fill style={{ objectFit: "cover", borderRadius: "4px" }} />
                  </Box>
                )}
                {touched.image && errors.image && (
                  <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                    {errors.image}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "16px" }}>
              <Typography sx={{ textAlign: "right", color: "#1F2937" }}>City</Typography>
              <Box>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel sx={{ color: "#1F2937" }}>City</InputLabel>
                  <Select
                    name="city"
                    value={values.city}
                    onChange={(e) => setFieldValue("city", e.target.value)}
                    label="City"
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976D2" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976D2" },
                      "& .MuiSelect-select": { color: "#1F2937" },
                    }}
                  >
                    {["Mecca", "Madinah"].map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {touched.city && errors.city && (
                  <Typography sx={{ color: "#EF4444", fontSize: "0.75rem", mt: "4px" }}>
                    {errors.city}
                  </Typography>
                )}
              </Box>
            </Box>
            {error && (
              <Typography sx={{ color: "#EF4444", fontSize: "0.875rem", textAlign: "center" }}>
                {error}
              </Typography>
            )}
            <Box sx={{ display: "flex", gap: "16px", mt: "16px" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ bgcolor: "#1976D2", "&:hover": { bgcolor: "#115293" }, "&.Mui-disabled": { bgcolor: "#B0BEC5", color: "#37474F" } }}
              >
                {isEditMode ? "Update Destination" : "Create Destination"}
              </Button>
              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={() => router.push("/admin/destinations")}
                disabled={loading}
                sx={{
                  borderColor: "#E5E7EB",
                  color: "#1F2937",
                  "&:hover": { bgcolor: "#F5F5F5", borderColor: "#E5E7EB" },
                  "&.Mui-disabled": { borderColor: "#B0BEC5", color: "#37474F" },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}