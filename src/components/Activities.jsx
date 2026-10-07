import { activities } from '../data/activities.js';

export default function Activities() {
  return (
    <section id="activities" className="section section-alt">
      <div className="container">
        <p className="eyebrow">Gather with us</p>
        <h2 className="section-title">Weekly Activities</h2>
        <div className="activities-grid">
          {activities.map((activity, i) => (
            <div className="activity-card reveal-up" data-reveal style={{ '--d': `${i * 120}ms` }} key={activity.title}>
              <span className="activity-icon">{activity.icon}</span>
              <h3>{activity.title}</h3>
              <p className="activity-time">{activity.time}</p>
              <p>{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
