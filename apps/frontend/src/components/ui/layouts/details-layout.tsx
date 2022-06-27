import { useWindowSize } from "@lib/hooks";
import useGlobalStore from "@stores/global-store";

interface DetailsLayoutProps {
  DescriptionBlock: any;
  CarouselBlock: any;
}

export const DetailsLayout: React.FC<DetailsLayoutProps> = ({
  DescriptionBlock,
  CarouselBlock,
}) => {
  const { footerHeight, navbarHeight } = useGlobalStore();
  const totalAdditionalHeight = footerHeight + navbarHeight;
  const windowHeight = useWindowSize()?.width ?? 0;

  return (
    <div
      className="grid grid-cols-12"
      style={{
        height:
          windowHeight >= 768
            ? `calc(100vh - ${totalAdditionalHeight}px)`
            : `100%`,
      }}
    >
      <div className="xl:col-span-4 md:col-span-5 col-span-12 overflow-y-auto">
        {DescriptionBlock}
      </div>
      <div className="xl:col-span-8 md:col-span-7 col-span-12">
        {CarouselBlock}
      </div>
    </div>
  );
};
