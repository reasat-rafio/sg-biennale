import { FcInfo } from "react-icons/fc";

const VisitorInfo = {
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
        { type: "visitorInfoPage.admission" },
        { type: "visitorInfoPage.venues" },
      ],
    },
  ],
};

export default VisitorInfo;
