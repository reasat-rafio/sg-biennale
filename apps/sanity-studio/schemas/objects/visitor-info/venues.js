import { FcReading } from "react-icons/fc";

const VisitorInfoVenues = {
  name: "visitorInfoPage.venues",
  title: "Venues",
  type: "object",
  icon: FcReading,
  fields: [
    { name: "title", type: "string" },
    {
      name: "highlight",
      type: "object",
      fields: [
        { name: "icon", type: "image", description: "optional" },
        { name: "title", type: "string" },
      ],
    },
    {
      name: "venues",
      type: "array",
      of: [{ type: "reference", to: { type: "venue" } }],
    },
    { name: "additionalInfo", type: "array", of: [{ type: "admissionInfo" }] },
  ],
};

export default VisitorInfoVenues;
