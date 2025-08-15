import LeadsList from "@/components/layout/Admin/Leads/LeadsList";


const getLeadsData = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/clients`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch leads data");
  }
  return response.json();
};

export default async function Leads() {
  const { leads } = await getLeadsData();

  return (
    <div className="p-6 bg-[#FAFAFA] rounded-lg shadow-md">
      <LeadsList leads={leads} />
    </div>
  );
}