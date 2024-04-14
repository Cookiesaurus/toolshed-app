import db from "@/app/config/db.mjs";
import dynamic from "next/dynamic";
const Search = dynamic(() => import("@/components/admin/customers/Search"), {
  ssr: false
});
export default async function Page({ searchParams }) {
  let name = searchParams.searchTerm;
  return (
    <>
      <h1>Search Results: </h1>
      <Search />
    </>
  );
}
