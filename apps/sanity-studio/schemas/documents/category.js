import { FcList } from "react-icons/fc";

const Category = {
  name: "category",
  type: "document",
  icon: FcList,
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
  ],
};

export default Category;
