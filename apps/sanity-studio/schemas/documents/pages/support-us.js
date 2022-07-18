import { FaHandsHelping } from "react-icons/fa";
import { FcCollaboration } from "react-icons/fc";

const SupportUsPage = {
  name: "supportUsPage",
  type: "document",
  icon: FcCollaboration,
  fields: [
    { name: "seo", type: "seo" },
    {
      name: "header",
      type: "string",
    },
    {
      name: "methods",
      type: "array",
      of: [
        {
          name: "method",
          icon: FaHandsHelping,
          type: "object",
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
              name: "cta",
              type: "cta",
            },
          ],
        },
      ],
    },
  ],
};

export default SupportUsPage;
