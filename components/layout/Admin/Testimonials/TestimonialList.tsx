"use client";

import { useEffect, useState } from "react";
import { ITestimonial } from "@/models/Testimonial";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Eye, Edit, Trash } from "lucide-react";
import { Form, Formik } from "formik";
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
  const [sortColumn, setSortColumn] = useState<keyof ITestimonial>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ITestimonial | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sortedData = sortData(testimonials, sortColumn, sortOrder);
    setSortedTestimonials(sortedData);
  }, [testimonials, sortColumn, sortOrder]);

  const sortData = (data: ITestimonial[], column: keyof ITestimonial, order: "asc" | "desc") => {
    return [...data].sort((a, b) => {
      if (column === "createdAt") {
        return order === "asc"
          ? new Date(a[column]).getTime() - new Date(b[column]).getTime()
          : new Date(b[column]).getTime() - new Date(a[column]).getTime();
      }
      if (column === "rating") {
        return order === "asc" ? a[column] - b[column] : b[column] - a[column];
      }
      return order === "asc"
        ? (a[column] || "").localeCompare(b[column] || "")
        : (b[column] || "").localeCompare(a[column] || "");
    });
  };

  const handleSort = (column: keyof ITestimonial) => {
    const newSortOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

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

  return (
    <>
      {loading && <Loader value="Processing..." />}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="bg-[#FAFAFA] border-[#DCD1D5]">
          <DialogHeader>
            <DialogTitle className="text-[#171717]">Testimonial Details</DialogTitle>
          </DialogHeader>
          {modalData && (
            <div className="space-y-4 text-[#171717]">
              <p><strong>Name:</strong> {modalData.name}</p>
              <p><strong>Location:</strong> {modalData.location}</p>
              <p><strong>Rating:</strong> {modalData.rating}/5</p>
              <p><strong>Feedback:</strong> {modalData.feedback}</p>
              <p><strong>Date:</strong> {new Date(modalData.createdAt).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-6 bg-[#FAFAFA] border-[#DCD1D5]">
          <DialogHeader>
            <DialogTitle className="text-[#171717]">Edit Testimonial</DialogTitle>
          </DialogHeader>
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
                <Form className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right text-[#171717]">
                      Name
                    </Label>
                    <Input
                      id="name"
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right text-[#171717]">
                      Location
                    </Label>
                    <Input
                      id="text"
                      type="text"
                      value={values.location}
                      onChange={(e) => setFieldValue("location", e.target.value)}
                      onBlur={handleBlur}
                      className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                      required
                    />
                    {touched.location && errors.location && (
                      <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.location}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right text-[#171717]">Rating</Label>
                    <div className="col-span-3 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 cursor-pointer ${
                            star <= values.rating ? "text-[#00F0B1] fill-current" : "text-[#DCD1D5]"
                          }`}
                          onClick={() => setFieldValue("rating", star)}
                          aria-label={`Rate ${star} stars`}
                        />
                      ))}
                    </div>
                    {touched.rating && errors.rating && (
                      <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.rating}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="feedback" className="text-right pt-2 text-[#171717]">
                      Feedback
                    </Label>
                    <Textarea
                      id="feedback"
                      value={values.feedback}
                      onChange={(e) => setFieldValue("feedback", e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Your experience..."
                      className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                      required
                    />
                    {touched.feedback && errors.feedback && (
                      <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.feedback}</span>
                    )}
                  </div>
                  {error && <span className="text-[#654A55] text-sm block text-center">{error}</span>}
                  <Button
                    type="submit"
                    className="w-full mt-4 bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA] focus:ring-[#00F0B1]"
                  >
                    Update Testimonial
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-[#171717]">Testimonials Data List</h3>
        <div className="bg-[#FAFAFA] rounded-lg shadow-md border-[#DCD1D5] overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#DCD1D5]">
                {["name", "location", "rating", "createdAt"].map((column) => (
                  <TableHead
                    key={column}
                    onClick={() => handleSort(column as keyof ITestimonial)}
                    className="text-[#171717] cursor-pointer hover:bg-[#AF99A1]"
                  >
                    {column === "createdAt"
                      ? "Date"
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
              {sortedTestimonials
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((testimonial) => (
                  <TableRow key={testimonial._id.toString()} className="border-[#DCD1D5]">
                    <TableCell className="text-[#171717]">{testimonial.name}</TableCell>
                    <TableCell className="text-[#171717]">{testimonial.location}</TableCell>
                    <TableCell className="text-[#171717]">{testimonial.rating}/5</TableCell>
                    <TableCell className="text-[#171717]">
                      {new Date(testimonial.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          onClick={() => handleViewDetails(testimonial)}
                          className="text-[#00F0B1] hover:text-[#20FFDF]"
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleEdit(testimonial)}
                          className="text-[#00F0B1] hover:text-[#20FFDF]"
                        >
                          <Edit className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(testimonial._id.toString())}
                          className="text-[#654A55] hover:text-[#533641]"
                        >
                          <Trash className="h-5 w-5" />
                        </Button>
                      </div>
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
              Page {page + 1} of {Math.ceil(sortedTestimonials.length / rowsPerPage)}
            </span>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= Math.ceil(sortedTestimonials.length / rowsPerPage) - 1}
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

export default TestimonialList;