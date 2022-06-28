import { SiApacherocketmq } from "react-icons/si";

const visitorInfoHero = {
  name: "visitorInfoPage.hero",
  type: "object",
  title: "Hero",
  icon: SiApacherocketmq,
  fields: [
    { name: "header", type: "string" },
    {
      name: "shortGuide",
      type: "file",
      fields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "icon",
          type: "image",
        },
      ],
    },
  ],
};

export default visitorInfoHero;
