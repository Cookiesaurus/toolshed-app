import Navbar from "@/components/Navbar/Navbar";
import { getSession } from "@/actions/actions";
export default async function Layout({
  children // will be a page or nested layout
}) {
  let session = await getSession();
  session = JSON.parse(JSON.stringify(session));
  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}
