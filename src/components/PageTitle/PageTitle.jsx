// PageTitle - כותרת עמוד אחידה
import './PageTitle.css';

function PageTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="page-title section-header">
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h1 className="section-title">{title}</h1>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

export default PageTitle;
