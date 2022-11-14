interface MapProps {
  mapUrl: string;
}

export const Map: React.FC<MapProps> = ({ mapUrl }) => {
  return (
    <iframe
      title="oneMap"
      className="aspect-video sm:w-[72vw] w-[80vw] mx-auto"
      src={mapUrl}
      height="auto"
      width="auto"
      allowFullScreen
    />
  );
};
