const BlobBackground = () => {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden">
      <div className="absolute inset-0 bg-hero-base" />
      <div className="absolute inset-0 hero-grid" />
      <div className="blob blob-one" />
      <div className="blob blob-two" />
      <div className="blob blob-three" />
      <div className="blob blob-four" />
    </div>
  );
};

export default BlobBackground;
