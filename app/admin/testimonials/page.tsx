import TestimonialList from "@/components/layout/Admin/Testimonials/TestimonialList"


const getTestimonialsData = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/testimonials`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch testimonials data");
  }
  return response.json();
};

export default async function Testimonials() {
  const { testimonials } = await getTestimonialsData();

  return (
    <div className="p-6 bg-[#FAFAFA] rounded-lg shadow-md">
      <TestimonialList testimonials={testimonials} />
    </div>
  );
}