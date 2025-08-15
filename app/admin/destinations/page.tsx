import DestinationList from "@/components/layout/Admin/Destinations/DestinationList";

const getDestinationsData = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/destinations`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch destinations data");
  }
  return response.json();
};

export default async function Destinations() {
  const { destinations } = await getDestinationsData();

  return (
    <div className="p-6 bg-[#FAFAFA] rounded-lg shadow-md">
      <DestinationList destinations={destinations} />
    </div>
  );
}