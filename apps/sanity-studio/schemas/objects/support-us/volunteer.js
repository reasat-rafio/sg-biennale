import { RiServiceFill } from "react-icons/ri";

const SupportUsVolunteer = {
  name: "supportUs.volunteer",
  title: "Volunteer",
  type: "object",
  icon: RiServiceFill,
  fields: [
    { name: "header", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cta",
      type: "cta",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default SupportUsVolunteer;
