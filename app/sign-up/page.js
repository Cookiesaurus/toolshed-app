import Image from "next/image";
import logo from "../public/images/toolshed_logo.png";
import Signupform from "@/components/FormComponents/signupform";
import db from "../config/db.mjs";

export default async function Page() {
  const waivers = await db.selectFromDB(
    "Select Waiver_Name, Waiver_Details From Waivers"
  );
  const gender = await db.selectFromDB(`Select Gender_Name from Genders`)
  return (
    <>
      <div className="content">
        <div className="title">
          <Image
            src={logo}
            alt="toolshed logo"
            width={200}
            height={200}
          ></Image>
          <h1 className="pagetitle">Create an Account</h1>
        </div>
        {/* <SignupForm></SignupForm> */}
        <Signupform waivers={waivers} genders={gender}></Signupform>
      </div>
    </>
  );
}
