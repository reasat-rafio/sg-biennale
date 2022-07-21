import { FcManager } from "react-icons/fc";

const Curatorial = {
  name: "curatorial",
  type: "document",
  icon: FcManager,
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.name,
      },
    },
    { name: "images", type: "array", of: [{ type: "image" }] },
    {
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};

export default Curatorial;
