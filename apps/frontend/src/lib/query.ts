import { groq } from "next-sanity";
import { withDimensions } from "sanity-react-extra";

export const siteQuery = groq`{
    "site": *[_type == "site"][0] {
      ...,
      "logo": ${withDimensions("logo")},
      "ogImage": ${withDimensions("ogImage")},
      footer {
        ...,
        socialButtons[] ->
      }
    },
  }`;