import { FcFlowChart } from "react-icons/fc";

const PastEdition = {
  name: "pastEdition",
  type: "document",
  icon: FcFlowChart,
  fields: [
    {
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    { name: "url", type: "url" },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "image",
    },
  },
};

export default PastEdition;