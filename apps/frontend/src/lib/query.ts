import { groq } from "next-sanity";
import { withDimensions } from "sanity-react-extra";

export const siteQuery = groq`{
    "site": *[_type == "site"][0] {
      ...,
      "logo": ${withDimensions("logo")},
      "ogImage": ${withDimensions("ogImage")},
      kvs[] {
        ..., 
        asset->{
          ...,
          metadata {
            dimensions
          }
        }
      },
      favicon {
        ...,
        asset->
      },
      navigations {
        ...,
        ctas[] {
          ...,
          "icon": ${withDimensions("icon")},
        },
      },
      footer {
        ...,
        "image": ${withDimensions("image")},
        social{
          ..., 
          socials[] {
            ...,
            "icon": ${withDimensions("icon")},
          }
        }
      }
    },
  }`;

export const pageQuery = (query: string) => groq`{
    "site": ${siteQuery},
    "page": ${query}
  }`;
