import Image from "next/image";
import logo from "../public/images/toolshed_logo.png";
import Signupform from "@/components/FormComponents/signupform";
import db from "../config/db.mjs";

export default async function Page() {
  const waivers = await db.selectFromDB("Select Waiver_Name, Waiver_Details From Waivers");
  const gender = await db.selectFromDB(`Select Gender_Name from Genders`)
  const memberships = await db.selectFromDB(`SELECT Membership_Levels.Membership_Title FROM Membership_Levels;`)
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
        <Signupform waivers={waivers} genders={gender} membershiplevel={memberships}></Signupform>
      </div>
    </>
  );
}
