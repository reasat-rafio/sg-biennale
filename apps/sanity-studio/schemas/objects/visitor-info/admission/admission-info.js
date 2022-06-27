import { FcInfo } from "react-icons/fc";

const AdmissionInfo = {
  title: "Admission Info",
  name: "admissionInfo",
  type: "object",
  icon: FcInfo,
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "description",
      type: "text",
    },
    { name: "cta", type: "cta" },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
};

export default AdmissionInfo;
