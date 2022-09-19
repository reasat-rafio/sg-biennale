import { FcList } from "react-icons/fc";

const Category = {
  name: "category",
  type: "document",
  icon: FcList,
  fields: [
    {
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      type: "number",
      hidden: true,
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.name,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default Category;
