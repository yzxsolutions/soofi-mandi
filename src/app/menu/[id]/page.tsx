import { mockMenuItems } from "@/lib/mock-data";
import MenuItemClient from "./MenuItemClient";

// Generate static params for static export
export async function generateStaticParams() {
  return mockMenuItems.map((item) => ({
    id: item.id,
  }));
}

export default function ItemDetailPage() {
  return <MenuItemClient />;
}
