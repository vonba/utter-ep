export default function SoundAndTouchVideo({ video, isCurrent, index, setSelectedVideoIndex }) {
  const currentOrNotClass = isCurrent ? "current" : "";
  return (
    <div className={`video-container ${currentOrNotClass}`}>
      <label>{video.label}</label>
      <video
        src={`${process.env.PUBLIC_URL}/video/compressed/${video.source}`}
        loop
        muted
        autoPlay
        playsInline
        onClick={() => setSelectedVideoIndex(index)}
      />
    </div>
  );
}
