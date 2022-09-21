import S from "@sanity/desk-tool/structure-builder";
import { FcCalendar } from "react-icons/fc";
import { GrEdit, GrView } from "react-icons/gr";
import { RiPagesLine } from "react-icons/ri";
import React from "react";
import { FaUserFriends } from "react-icons/fa";

function SitePreview({ document, options }) {
  if (!process.env.SANITY_STUDIO_PREVIEW_URL) {
    console.warn(
      "SANITY_STUDIO_PREVIEW_URL should be set for preview to work! Falling back to localhost:3000"
    );
  }

  return (
    <iframe
      title="Page preview"
      src={`${
        process.env.SANITY_STUDIO_PREVIEW_URL ?? "http://localhost:3000"
      }/api/preview?secret=${process.env.SANITY_STUDIO_PREVIEW_TOKEN}&slug=${
        options?.slug
      }`}
      style={{ width: "100%", height: "100%", border: 0 }}
    />
  );
}

const pageItem = ({ schemaType, id, title, icon, slug }) =>
  S.documentListItem({ schemaType, id, title, icon }).child(
    S.editor()
      .schemaType(schemaType)
      .views([
        S.view.form().icon(GrEdit),
        S.view
          .component(SitePreview)
          .icon(GrView)
          .options({ slug })
          .title("Preview"),
      ])
  );

const deskStructure = () =>
  S.list()
    .title("Content")
    .id("__root__")
    .items([
      S.documentListItem()
        .schemaType("site")
        .id("site")
        .title("Site")
        .child(S.editor().schemaType("site").title("Site")),
      S.divider(),
      S.listItem()
        .title("Pages")
        .icon(RiPagesLine)
        .child(
          S.list()
            .title("Pages")
            .items([
              pageItem({
                schemaType: "homePage",
                id: "homePage",
                title: "Home",
                slug: "",
              }),
              pageItem({
                schemaType: "visitorInfoPage",
                id: "visitorInfoPage",
                title: "Visitor Info",
                slug: "",
              }),
              pageItem({
                schemaType: "pressPage",
                id: "pressPage",
                title: "Press",
                slug: "",
              }),
              pageItem({
                schemaType: "aboutPage",
                id: "aboutPage",
                title: "About",
                slug: "",
              }),
              pageItem({
                schemaType: "explorePage",
                id: "explorePage",
                title: "Explore",
                slug: "",
              }),
              pageItem({
                schemaType: "supportUsPage",
                id: "supportUsPage",
                title: "Support Us",
                slug: "",
              }),
              pageItem({
                schemaType: "programmesEventsPage",
                id: "programmesEventsPage",
                title: "Programmes Events",
                slug: "",
              }),

              pageItem({
                schemaType: "artistListingPage",
                id: "artistListingPage",
                title: "Artists Listing",
                slug: "",
              }),
              pageItem({
                schemaType: "partnerListingPage",
                id: "partnerListingPage",
                title: "Partners Listing",
                slug: "",
              }),
              pageItem({
                schemaType: "eventsListingPage",
                id: "eventsListingPage",
                title: "Events Listing",
                slug: "",
              }),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Events")
        .icon(FcCalendar)
        .child(
          S.list()
            .title("Events")
            .items([
              S.documentTypeListItem("category").title("Category"),
              S.documentTypeListItem("events").title("Event"),
            ])
        ),
      S.documentTypeListItem("artist").title("Artists"),
      S.documentTypeListItem("curatorial").title("Curatorials"),
      S.documentTypeListItem("artwork").title("Artworks"),
      S.documentTypeListItem("venue").title("Venues"),
      S.documentTypeListItem("news").title("News"),

      S.listItem()
        .title("Partners")
        .icon(FaUserFriends)
        .child(
          S.list()
            .title("Partners")
            .items([
              S.documentTypeListItem("tier").title("Tiers"),
              S.documentTypeListItem("partner").title("Partners"),
            ])
        ),
    ]);

export default deskStructure;
