import { FcAbout } from "react-icons/fc";

const AboutPage = {
  name: "aboutPage",
  title: "About Us Page",
  type: "document",
  icon: FcAbout,
  fields: [
    {
      name: "seo",
      type: "seo",
    },
    {
      name: "sections",
      type: "array",
      title: "Sections",
      of: [
        { type: "aboutPage.hero" },
        { type: "aboutPage.curatorialTeam" },
        { type: "aboutPage.team" },
        { type: "aboutPage.about" },
        { type: "aboutPage.pastEdition" },
      ],
    },
  ],
};

export default AboutPage;
