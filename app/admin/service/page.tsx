import ServiceList from "@/components/layout/Admin/Services/ServiceList";


const getServicesData = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/service`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch services data");
  }
  return response.json();
};

export default async function Services() {
  const { services } = await getServicesData();

  return (
    <div className="p-6 bg-[#FAFAFA] rounded-lg shadow-md">
      <ServiceList services={services} />
    </div>
  );
}