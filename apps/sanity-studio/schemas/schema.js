// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import Site from "./documents/site";

import SEO from "./objects/seo";
import MenuItems from "./objects/site/menu-item";
import Social from "./objects/social";
import Footer from "./objects/site/footer";
import Menu from "./objects/menu";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([Site, Menu, Footer, SEO, MenuItems, Social]),
});
