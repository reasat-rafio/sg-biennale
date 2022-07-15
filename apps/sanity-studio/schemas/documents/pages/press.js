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
      of: [{ type: "pressPage.release" }],
    },
  ],
};

export default PressPage;
