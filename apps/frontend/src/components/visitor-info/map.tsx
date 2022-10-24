interface MapProps {
  mapUrl: string;
}

export const Map: React.FC<MapProps> = ({ mapUrl }) => {
  return (
    <iframe
      title="oneMap"
      className="aspect-video w-screen "
      src={mapUrl}
      height="auto"
      width="auto"
      allowFullScreen
    />
  );
};
