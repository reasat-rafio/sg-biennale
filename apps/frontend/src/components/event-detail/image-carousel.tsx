import clsx from "clsx";

interface ImageCarouselProps {
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ className }) => {
  return <div className={clsx(className)}></div>;
};
