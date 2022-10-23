import { GrMap } from "react-icons/gr";

const VisitorInfoMap = {
  name: "visitorInfoPage.map",
  title: "Map",
  type: "object",
  icon: GrMap,
  fields: [{ name: "mapUrl", title: "Map Url", type: "url" }],
  preview: {
    prepare: () => ({
      title: "Map",
    }),
  },
};

export default VisitorInfoMap;
