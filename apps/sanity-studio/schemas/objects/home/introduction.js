import { FcAbout } from "react-icons/fc";
import * as React from "react";

const HomeIntroduction = {
  title: "Introduction",
  name: "homePage.introduction",
  type: "object",
  icon: FcAbout,
  fields: [
    {
      name: "header",
      type: "array",
      // validation: (Rule) => Rule.required().length(3),
      of: [{ type: "string" }],
    },
    {
      name: "collection",
      type: "array",
      of: [
        {
          name: "item",
          type: "object",
          validation: (Rule) => Rule.required(),
          description: "Choose either an image or a video",
          fields: [
            {
              name: "title",
              type: "string",
            },
            {
              name: "image",
              type: "image",
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
            { name: "video", type: "video" },
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
              webm: "video.video_webm.asset.url",
              hevc: "video.video_hevc.asset.url",
            },
            prepare({ title, image, webm, hevc }) {
              return {
                title,
                media: image ? (
                  image
                ) : (
                  <video
                    muted
                    playsInline
                    autoPlay
                    loop
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <source src={webm} type="video/webm" />
                    <source src={hevc} type="video/quicktime" />
                  </video>
                ),
              };
            },
          },
        },
      ],
    },
    {
      name: "subtitle",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      subtitle: "description",
    },
    prepare({ subtitle }) {
      return {
        title: "Introduction",
        subtitle,
      };
    },
  },
};

export default HomeIntroduction;
