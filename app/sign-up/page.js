import Image from "next/image";
import logo from "../public/images/toolshed_logo.png";
import Signupform from "@/components/FormComponents/signupform";
import db from "../config/db.mjs";

export default async function Page() {
  let waivers = await db.selectFromDB("Select Waiver_Name, Waiver_Details From Waivers");
  let gender = await db.selectFromDB(`Select Gender_Name from Genders`)
  let memberships = await db.selectFromDB(`SELECT Membership_Levels.Membership_Title FROM Membership_Levels;`)

  waivers = JSON.parse(JSON.stringify(waivers));
  gender = JSON.parse(JSON.stringify(gender));
  memberships = JSON.parse(JSON.stringify(memberships));
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
