import { FaHandshake } from "react-icons/fa";

const Partner = {
  title: "Partner",
  name: "partner",
  type: "document",
  icon: FaHandshake,
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.name,
      },
    },
    {
      name: "image",
      type: "image",
    },
    { name: "description", type: "text" },
  ],
};

export default Partner;
