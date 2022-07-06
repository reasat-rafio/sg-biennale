import { groq } from "next-sanity";
import { withDimensions } from "sanity-react-extra";

export const siteQuery = groq`{
    "site": *[_type == "site"][0] {
      ...,
      "logo": ${withDimensions("logo")},
      "ogImage": ${withDimensions("ogImage")},
      navigations {
        ...,
        heightlights[]{
          ...,
          "icon": ${withDimensions("icon")},
        },
      },
      footer {
        ...,
        socialButtons[] ->{
          ...,
          "icon": ${withDimensions("icon")},
        }
      }
    },
  }`;

export const pageQuery = (query: string) => groq`{
    "site": ${siteQuery},
    "page": ${query}
  }`;
