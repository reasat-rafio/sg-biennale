import { FcVideoCall } from "react-icons/fc";

const PressPage = {
  name: "pressPage",
  type: "document",
  title: "Press",
  icon: FcVideoCall,
  fields: [
    { name: "seo", type: "seo" },
    {
      name: "sections",
      type: "array",
      of: [
        { type: "pageHeading" },
        { type: "pressPage.recentUpdate" },
        { type: "pressPage.release" },
        { type: "pressPage.kitInfo" },
        { type: "moreInfo" },
      ],
    },
  ],
  preview: {
    select: {
      title: "seo.title",
      subtitle: "seo.description",
    },
  },
};

export default PressPage;
