import S from "@sanity/desk-tool/structure-builder";
import { FaBlog, FaSitemap } from "react-icons/fa";
import { GrEdit, GrView } from "react-icons/gr";
import { RiPagesLine } from "react-icons/ri";
import React from "react";

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

const singleItem = ({ schemaType, id, title, icon }) =>
  S.listItem({ schemaType, title, id, icon }).child(
    S.editor().id(id).title(title).schemaType(schemaType)
  );

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
      S.listItem()
        .title("Site")
        .icon(FaSitemap)
        .child(S.list().title("Site").items([])),
      S.divider(),
      S.listItem().title("Pages").icon(RiPagesLine).child(
        S.list().title("Pages").items([
          // pageItem({
          //   schemaType: "datasetDetailsPage",
          //   id: "datasetDetailsPage",
          //   title: "Dataset Details Page",
          //   icon: GiArchiveResearch,
          //   slug: "",
          // }),
        ])
      ),
      S.divider(),
    ]);

export default deskStructure;
