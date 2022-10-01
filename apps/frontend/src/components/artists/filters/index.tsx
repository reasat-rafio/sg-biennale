interface IndexProps {}

export const Filters: React.FC<IndexProps> = ({}) => {
  return (
    <section className="grid grid-cols-12 gap-5">
      <div className="xl:col-span-9 md:col-span-6 col-span-12">
        {/* <SortBy /> */}
      </div>
      <div className="xl:col-span-3 md:col-span-6 col-span-12 ">
        {/* <SearchVenue /> */}
      </div>
    </section>
  );
};
