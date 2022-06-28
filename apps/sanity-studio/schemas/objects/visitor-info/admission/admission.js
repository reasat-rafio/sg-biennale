import { FcCameraAddon } from "react-icons/fc";

const VisitorInfoAdmission = {
  name: "visitorInfoPage.admission",
  title: "Admission",
  type: "object",
  icon: FcCameraAddon,
  fields: [
    { name: "title", type: "string" },
    { name: "cta", type: "cta" },
    { name: "moreInfos", type: "array", of: [{ type: "admissionInfo" }] },
  ],
};

export default VisitorInfoAdmission;
