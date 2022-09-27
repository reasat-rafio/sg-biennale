import { FaBlogger } from "react-icons/fa";

const ExploreCuratorialEssay = {
  name: "explorePage.curatorialEssay",
  title: "CuratorialEssay",
  type: "object",
  icon: FaBlogger,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default ExploreCuratorialEssay;
