export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div data-reveal className="reveal-up">
          <p className="eyebrow">Who we are</p>
          <h2 className="section-title">About Our Church</h2>
          <p className="section-lead">
            Jesus Worship Interdenominational Prayer Ministry Int'l is a family of believers dedicated to sharing the love of Christ.
            We gather every week to worship, learn the Word, and serve our community. Whether you're
            visiting for the first time or have been with us for years, there's a place for you here.
          </p>
        </div>
        <div className="pillars">
          {[
            ['🕊', 'Worship', 'Hearts lifted in praise'],
            ['🙏', 'Prayer', 'Standing in the gap together'],
            ['📖', 'The Word', 'Rooted in Scripture'],
          ].map(([icon, title, text], i) => (
            <div key={title} className="pillar reveal-up" data-reveal style={{ '--d': `${i * 120}ms` }}>
              <span>{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
