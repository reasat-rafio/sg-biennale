import { SiOpslevel } from "react-icons/si";

const Tier = {
  name: "tier",
  type: "document",
  icon: SiOpslevel,
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.title,
      },
    },
  ],
};

export default Tier;