import { FcInfo } from "react-icons/fc";

const VisitorInfoAdmissionInfo = {
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
    {
      name: "icon",
      type: "image",
      description: "optional",
    },
    { name: "cta", type: "cta" },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "icon",
    },
  },
};

export default VisitorInfoAdmissionInfo;
