import ItemDetails from "@/components/item-details";

export const metadata = { title: "Details" };

export default function Details({ params }) {
  const listingId = params.id;

  return (
    <>
      <ItemDetails listingId={listingId} />
    </>
  );
}
