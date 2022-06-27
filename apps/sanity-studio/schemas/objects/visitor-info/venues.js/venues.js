import { FcReading } from "react-icons/fc";

const Venues = {
  name: "visitorInfoPage.venues",
  title: "Venues",
  type: "object",
  icon: FcReading,
  fields: [
    { name: "title", type: "string" },
    {
      name: "additionalInfo",
      type: "object",
      fields: [
        { name: "title", type: "image" },
        {
          name: "venues",
          type: "array",
          of: [{ type: "reference", to: { type: "venue" } }],
        },
      ],
    },
  ],
};

export default Venues;
