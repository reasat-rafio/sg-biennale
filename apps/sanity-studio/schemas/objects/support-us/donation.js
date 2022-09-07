import { FaHandsHelping } from "react-icons/fa";

const SupportUsDonation = {
  name: "supportUs.donation",
  title: "Donation",
  type: "object",
  icon: FaHandsHelping,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
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
  ],
};

export default SupportUsDonation;
