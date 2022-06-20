import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoShareSocial,
} from "react-icons/io5";

const Social = {
  name: "social",
  title: "Social",
  type: "document",
  icon: IoShareSocial,
  fields: [
    {
      name: "type",
      type: "string",
      options: {
        list: ["facebook", "linkedin", "instagram"],
      },
    },
    {
      name: "url",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "url",
      type: "type",
    },
    prepare({ title, subtitle, type }) {
      return {
        title,
        subtitle,
        media:
          type === "facebook"
            ? IoLogoFacebook
            : type === "linkedin"
            ? IoLogoLinkedin
            : type === "instagram"
            ? IoLogoInstagram
            : IoShareSocial,
      };
    },
  },
};

export default Social;
