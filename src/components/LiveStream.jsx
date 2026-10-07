import { YOUTUBE_CHANNEL_ID, YOUTUBE_CHANNEL_HANDLE, YOUTUBE_FALLBACK_VIDEO_ID } from '../config.js';

export default function LiveStream() {
  const embedSrc = YOUTUBE_FALLBACK_VIDEO_ID
    ? `https://www.youtube.com/embed/${YOUTUBE_FALLBACK_VIDEO_ID}`
    : `https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=0`;

  const channelUrl = `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`;

  return (
    <section id="live" className="section section-alt">
      <div className="container">
        <p className="eyebrow">Join from anywhere</p>
        <h2 className="section-title">Watch Live on YouTube</h2>
        <p className="section-lead">
          Can't make it in person? Join our Breakthrough Service live on Sundays at 9:00 AM, streamed directly from our YouTube channel.
        </p>
        <div className="video-wrapper reveal-up" data-reveal>
          <iframe
            src={embedSrc}
            title="Church Live Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <p className="live-note">
          Not seeing the stream?{' '}
          <a href={`${channelUrl}/live`} target="_blank" rel="noopener noreferrer">Watch directly on YouTube</a>
          {' '}or visit our{' '}
          <a href={channelUrl} target="_blank" rel="noopener noreferrer">channel</a>.
        </p>
      </div>
    </section>
  );
}
