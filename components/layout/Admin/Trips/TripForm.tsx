"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { ITrip } from "@/models/Trip";
import Loader from "@/components/common/Loader";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";

interface FormData {
  destination: string;
  date: string;
  description: string;
  image: { src: string; alt: string };
  duration: string;
  price: string;
}

interface TripFormProps {
  initialValues?: ITrip;
  isEditMode?: boolean;
  tripId?: string;
}

const validationSchema = Yup.object({
  destination: Yup.string()
    .required("Destination is required!")
    .min(3, "Destination must be at least 3 characters long")
    .max(50, "Destination can't exceed 50 characters"),
  date: Yup.string().required("Date is required!"),
  description: Yup.string()
    .required("Description is required!")
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description can't exceed 500 characters"),
  image: Yup.object({
    src: Yup.string().required("Image URL is required"),
    alt: Yup.string().required("Image alt text is required").max(100, "Alt text can't exceed 100 characters"),
  }),
  duration: Yup.string().required("Duration is required!").max(50, "Duration can't exceed 50 characters"),
  price: Yup.string()
    .required("Price is required!")
    .matches(/^\d+(\.\d{1,2})?$/, "Price must be a valid number (e.g., 1000 or 1000.00)"),
});

export default function TripForm({ initialValues, isEditMode = false, tripId }: TripFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/trips", {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditMode ? { id: tripId, ...values } : values),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/trips");
      } else {
        setError(result.message || `Failed to ${isEditMode ? "update" : "create"} trip.`);
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
      <h1 className="text-2xl font-bold text-[#171717] mb-6 font-arabic">
        {isEditMode ? "Edit Trip" : "Create New Trip"}
      </h1>
      <Formik
        initialValues={{
          destination: initialValues?.destination || "",
          date: initialValues?.date ? new Date(initialValues.date).toISOString().split("T")[0] : "",
          description: initialValues?.description || "",
          image: initialValues?.image || { src: "", alt: "" },
          duration: initialValues?.duration || "",
          price: initialValues?.price || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="destination" className="text-right text-[#171717]">
                Destination
              </Label>
              <Input
                id="destination"
                name="destination"
                value={values.destination}
                onChange={(e) => setFieldValue("destination", e.target.value)}
                className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                required
              />
              {touched.destination && errors.destination && (
                <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.destination}</span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right text-[#171717]">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={values.date}
                onChange={(e) => setFieldValue("date", e.target.value)}
                className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                required
              />
              {touched.date && errors.date && (
                <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.date}</span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-[#171717]">
                Description
              </Label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={(e) => setFieldValue("description", e.target.value)}
                className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717] rounded-md p-2"
                rows={4}
                required
              />
              {touched.description && errors.description && (
                <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.description}</span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-[#171717]">Image</Label>
              <div className="col-span-3">
                <CloudinaryUpload
                  setImageUrl={(url: string) => {
                    setFieldValue("image", { src: url, alt: `Image for ${values.destination || "trip"}` });
                  }}
                  size="600 x 400"
                />
                {values.image.src && (
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="relative w-24 h-16">
                      <Image src={values.image.src} alt={values.image.alt} fill className="object-cover rounded" />
                    </div>
                    <Input
                      value={values.image.alt}
                      onChange={(e) => setFieldValue("image.alt", e.target.value)}
                      className="border-[#DCD1D5] focus:ring-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                      placeholder="Alt text"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFieldValue("image", { src: "", alt: "" })}
                      className="border-[#DCD1D5] text-[#171717] hover:bg-[#DCD1D5]"
                    >
                      Remove
                    </Button>
                  </div>
                )}
                {touched.image && errors.image && (
                  <span className="text-[#654A55] text-xs">
                    {typeof errors.image === "string" ? errors.image : "Invalid image"}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right text-[#171717]">
                Duration
              </Label>
              <Input
                id="duration"
                name="duration"
                value={values.duration}
                onChange={(e) => setFieldValue("duration", e.target.value)}
                className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                placeholder="e.g., 7 days"
                required
              />
              {touched.duration && errors.duration && (
                <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.duration}</span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right text-[#171717]">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                value={values.price}
                onChange={(e) => setFieldValue("price", e.target.value)}
                className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                placeholder="e.g., 1500.00"
                required
              />
              {touched.price && errors.price && (
                <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.price}</span>
              )}
            </div>
            {error && <span className="text-[#654A55] text-sm block text-center">{error}</span>}
            <div >
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA] focus:ring-[#00F0B1] disabled:bg-[#757575]"
              >
                {isEditMode ? "Update Trip" : "Create Trip"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/trips")}
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