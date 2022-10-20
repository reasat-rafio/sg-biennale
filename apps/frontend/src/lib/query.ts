import { groq } from "next-sanity";
import { withDimensions } from "sanity-react-extra";

export const siteQuery = groq`{
    "site": *[_type == "site"][0] {
      ...,
      "logo": ${withDimensions("logo")},
      "eventLogo": ${withDimensions("eventLogo")},
      "ogImage": ${withDimensions("ogImage")},
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
        kvs[] {
          ..., 
          asset->{
            ...,
            metadata {
              dimensions
            }
          }
        },
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
