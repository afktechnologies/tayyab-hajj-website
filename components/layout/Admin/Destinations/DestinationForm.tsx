"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, Formik } from "formik";
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
    <div className="p-6 bg-[#FAFAFA] rounded-lg shadow-md max-w-lg mx-auto my-8">
      {loading && <Loader value="Processing..." />}
      <h1 className="text-2xl font-bold text-[#171717] mb-6">
        {isEditMode ? "Edit Destination" : "Create New Destination"}
      </h1>
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
          <Form className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-[#171717]">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={(e) => setFieldValue("name", e.target.value)}
                onBlur={handleBlur}
                className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                required
              />
              {touched.name && errors.name && (
                <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.name}</span>
              )}
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2 text-[#171717]">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={values.description}
                onChange={(e) => setFieldValue("description", e.target.value)}
                onBlur={handleBlur}
                className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                required
              />
              {touched.description && errors.description && (
                <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.description}</span>
              )}
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="significance" className="text-right pt-2 text-[#171717]">
                Significance
              </Label>
              <Textarea
                id="significance"
                name="significance"
                value={values.significance}
                onChange={(e) => setFieldValue("significance", e.target.value)}
                onBlur={handleBlur}
                className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                required
              />
              {touched.significance && errors.significance && (
                <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.significance}</span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right text-[#171717]">
                Image
              </Label>
              <div className="col-span-3">
                <CloudinaryUpload
                  setImageUrl={(url: string) => setFieldValue("image", url)}
                  size="400 x 300"
                />
                {values.image && (
                  <div className="relative w-full h-24 mt-2">
                    <Image src={values.image} alt="Preview" fill className="object-cover rounded" />
                  </div>
                )}
                {touched.image && errors.image && (
                  <span className="text-[#654A55] text-xs">{errors.image}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right text-[#171717]">
                City
              </Label>
              <Select
                name="city"
                value={values.city}
                onValueChange={(value) => setFieldValue("city", value)}
              >
                <SelectTrigger className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] bg-[#FFFFFF] text-[#171717]">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {["Mecca", "Madinah"].map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.city && errors.city && (
                <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.city}</span>
              )}
            </div>
            {error && <span className="text-[#654A55] text-sm block text-center">{error}</span>}
            <div >
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA] focus:ring-[#00F0B1] disabled:bg-[#757575]"
              >
                {isEditMode ? "Update Destination" : "Create Destination"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/destinations")}
                className="w-full mt-4 border-[#DCD1D5] text-[#171717] hover:bg-[#DCD1D5]"
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}