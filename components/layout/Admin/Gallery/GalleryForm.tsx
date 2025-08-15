"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import Image from "next/image";
import { IGalleryItem, IImage } from "@/models/GalleryItem";
import Loader from "@/components/common/Loader";

interface FormData {
  category: string;
  images: IImage[];
}

interface GalleryFormProps {
  initialValues?: IGalleryItem;
  isEditMode?: boolean;
  galleryItemId?: string;
}

const validationSchema = Yup.object({
  category: Yup.string()
    .required("Category is required!")
    .min(3, "Category must be at least 3 characters long")
    .max(50, "Category can't exceed 50 characters"),
  images: Yup.array()
    .of(
      Yup.object({
        src: Yup.string().required("Image URL is required"),
        alt: Yup.string().required("Image alt text is required").max(100, "Alt text can't exceed 100 characters"),
      })
    )
    .min(1, "At least one image is required"),
});

export default function GalleryForm({ initialValues, isEditMode = false, galleryItemId }: GalleryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/gallery", {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), // Send category and images, no id
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/gallery");
      } else {
        setError(result.message || `Failed to ${isEditMode ? "update" : "create"} gallery item.`);
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
        {isEditMode ? "Edit Gallery Category" : "Create New Gallery Category"}
      </h1>
      <Formik
        initialValues={{
          category: initialValues?.category || "",
          images: initialValues?.images || [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right text-[#171717]">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={values.category}
                onChange={(e) => setFieldValue("category", e.target.value)}
                className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                required
              />
              {touched.category && errors.category && (
                <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.category}</span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-[#171717]">Images</Label>
              <div className="col-span-3">
                <CloudinaryUpload
                  setImageUrl={(url: string) => {
                    const newImage = { src: url, alt: `Image for ${values.category || "category"}` };
                    setFieldValue("images", [...values.images, newImage]);
                  }}
                  size="600 x 400"
                />
                {values.images.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {values.images.map((image, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="relative w-24 h-16">
                          <Image src={image.src} alt={image.alt} fill className="object-cover rounded" />
                        </div>
                        <Input
                          value={image.alt}
                          onChange={(e) => {
                            const newImages = [...values.images];
                            newImages[index].alt = e.target.value;
                            setFieldValue("images", newImages);
                          }}
                          className="border-[#DCD1D5] focus:ring-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                          placeholder="Alt text"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const newImages = values.images.filter((_, i) => i !== index);
                            setFieldValue("images", newImages);
                          }}
                          className="border-[#DCD1D5] text-[#171717] hover:bg-[#DCD1D5]"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {touched.images && errors.images && (
                  <span className="text-[#654A55] text-xs">{typeof errors.images === "string" ? errors.images : "Invalid images"}</span>
                )}
              </div>
            </div>
            {error && <span className="text-[#654A55] text-sm block text-center">{error}</span>}
            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA] focus:ring-[#00F0B1] disabled:bg-[#757575]"
              >
                {isEditMode ? "Update Gallery Category" : "Create Gallery Category"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/gallery")}
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