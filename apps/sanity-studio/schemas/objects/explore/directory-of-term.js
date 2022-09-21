import { FcRules } from "react-icons/fc";

const ExploreDirectoryOfTerm = {
  name: "explorePage.directoryOfTerm",
  title: "Directory Of Term",
  type: "object",
  icon: FcRules,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "directors",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "director",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
};

export default ExploreDirectoryOfTerm;
