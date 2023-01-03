import { FcInfo } from "react-icons/fc";

const VisitorInfoPage = {
  name: "visitorInfoPage",
  title: "Visitor Info Page",
  type: "document",
  icon: FcInfo,
  fields: [
    { name: "seo", type: "seo", title: "SEO" },
    {
      name: "sections",
      type: "array",
      title: "Sections",
      of: [
        { type: "pageHeading" },
        { type: "visitorInfoPage.imageGallery" },
        // { type: "visitorInfoPage.moreInfo" },
        { type: "visitorInfoPage.accesibilityInfo" },
        { type: "visitorInfoPage.map" },
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

export default VisitorInfoPage;
