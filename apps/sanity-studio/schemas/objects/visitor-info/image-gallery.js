import { FcAddImage } from "react-icons/fc";

const VisitorInfoPageImageGallery = {
  title: "Image",
  name: "visitorInfoPage.imageGallery",
  icon: FcAddImage,
  type: "object",
  fields: [
    {
      type: "image",
      name: "image",
      fields: [
        {
          title: "Alternative Text",
          name: "alt",
          type: "string",
          validation: (Rule) =>
            Rule.required().error(
              "Please add an alternative text for the image"
            ),
        },
      ],
    },
  ],
  preview: {
    select: {
      media: "image",
      title: "image.alt",
    },
  },
};

export default VisitorInfoPageImageGallery;
