"use client";

import { useEffect, useState } from "react";
import { IService } from "@/models/Service";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Edit, Trash } from "lucide-react";
import { Form, Formik } from "formik";
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
  const [sortColumn, setSortColumn] = useState<keyof IService>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalData, setModalData] = useState<IService | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sortedData = sortData(services, sortColumn, sortOrder);
    setSortedServices(sortedData);
  }, [services, sortColumn, sortOrder]);

  const sortData = (data: IService[], column: keyof IService, order: "asc" | "desc") => {
    return [...data].sort((a, b) => {
      if (column === "createdAt") {
        return order === "asc"
          ? new Date(a[column]).getTime() - new Date(b[column]).getTime()
          : new Date(b[column]).getTime() - new Date(a[column]).getTime();
      }
      return order === "asc"
        ? (a[column] || "").localeCompare(b[column] || "")
        : (b[column] || "").localeCompare(a[column] || "");
    });
  };

  const handleSort = (column: keyof IService) => {
    const newSortOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

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

  return (
    <>
      {loading && <Loader value="Processing..." />}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="bg-[#FAFAFA] border-[#DCD1D5]">
          <DialogHeader>
            <DialogTitle className="text-[#171717]">Service Details</DialogTitle>
          </DialogHeader>
          {modalData && (
            <div className="space-y-4 text-[#171717]">
              <p><strong>Title:</strong> {modalData.title}</p>
              <p><strong>Description:</strong> {modalData.description}</p>
              <p><strong>Features:</strong> {modalData.features.join(", ")}</p>
              <p><strong>Icon:</strong> {modalData.icon}</p>
              <p><strong>Color:</strong> {modalData.color}</p>
              <p><strong>Date:</strong> {new Date(modalData.createdAt).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen || isCreateModalOpen} onOpenChange={(open) => (isEditModalOpen ? setIsEditModalOpen(open) : setIsCreateModalOpen(open))}>
        <DialogContent className="sm:max-w-[425px] p-6 bg-[#FAFAFA] border-[#DCD1D5]">
          <DialogHeader>
            <DialogTitle className="text-[#171717]">{isEditModalOpen ? "Edit Service" : "Create Service"}</DialogTitle>
          </DialogHeader>
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
              <Form className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right text-[#171717]">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={values.title}
                    onChange={(e) => setFieldValue("title", e.target.value)}
                    onBlur={handleBlur}
                    className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                    required
                  />
                  {touched.title && errors.title && (
                    <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.title}</span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2 text-[#171717]">
                    Description
                  </Label>
                  <Textarea
                    id="description"
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
                  <Label htmlFor="features" className="text-right pt-2 text-[#171717]">
                    Features
                  </Label>
                  <Textarea
                    id="features"
                    value={values.features}
                    onChange={(e) => setFieldValue("features", e.target.value)}
                    onBlur={handleBlur}
                    placeholder="Comma-separated list"
                    className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                    required
                  />
                  {touched.features && errors.features && (
                    <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.features}</span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="icon" className="text-right text-[#171717]">
                    Icon
                  </Label>
                  <Select
                    value={values.icon}
                    onValueChange={(value) => setFieldValue("icon", value)}
                  >
                    <SelectTrigger className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] bg-[#FFFFFF] text-[#171717]">
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Calendar", "Star", "Plane", "MessageCircle", "Users", "Shield"].map((icon) => (
                        <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {touched.icon && errors.icon && (
                    <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.icon}</span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="color" className="text-right text-[#171717]">
                    Color
                  </Label>
                  <Select
                    value={values.color}
                    onValueChange={(value) => setFieldValue("color", value)}
                  >
                    <SelectTrigger className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] bg-[#FFFFFF] text-[#171717]">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {["yellow", "green", "blue", "purple", "red"].map((color) => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {touched.color && errors.color && (
                    <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.color}</span>
                  )}
                </div>
                {error && <span className="text-[#654A55] text-sm block text-center">{error}</span>}
                <Button
                  type="submit"
                  className="w-full mt-4 bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA] focus:ring-[#00F0B1]"
                >
                  {isEditModalOpen ? "Update Service" : "Create Service"}
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-[#171717]">Services Data List</h3>
          <Button
            onClick={handleCreate}
            className="bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA]"
          >
            Create New Service
          </Button>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg shadow-md border-[#DCD1D5] overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#DCD1D5]">
                {["title", "icon", "color", "createdAt"].map((column) => (
                  <TableHead
                    key={column}
                    onClick={() => handleSort(column as keyof IService)}
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
              {sortedServices
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((service) => (
                  <TableRow key={service._id.toString()} className="border-[#DCD1D5]">
                    <TableCell className="text-[#171717]">{service.title}</TableCell>
                    <TableCell className="text-[#171717]">{service.icon}</TableCell>
                    <TableCell className="text-[#171717]">{service.color}</TableCell>
                    <TableCell className="text-[#171717]">
                      {new Date(service.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          onClick={() => handleViewDetails(service)}
                          className="text-[#00F0B1] hover:text-[#20FFDF]"
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleEdit(service)}
                          className="text-[#00F0B1] hover:text-[#20FFDF]"
                        >
                          <Edit className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(service._id.toString())}
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
              Page {page + 1} of {Math.ceil(sortedServices.length / rowsPerPage)}
            </span>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= Math.ceil(sortedServices.length / rowsPerPage) - 1}
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

export default ServiceList;