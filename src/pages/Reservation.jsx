import PageTitle from '../components/PageTitle/PageTitle';
import './Reservation.css';

function Reservation() {
  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="׳”׳–׳׳ ׳× ׳©׳•׳׳—׳"
            title="׳”׳–׳׳™׳ ׳• ׳׳¦׳׳ ׳•"
            subtitle="׳׳—׳¦׳• ׳›׳“׳™ ׳׳”׳–׳׳™׳ ׳©׳•׳׳—׳ ׳“׳¨׳ Tabit"
          />
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <p style={{ marginBottom: '2rem', color: 'var(--text2)', fontSize: '1rem', lineHeight: 1.8 }}>
            ׳”׳–׳׳ ׳× ׳©׳•׳׳—׳ ׳׳×׳‘׳¦׳¢׳× ׳“׳¨׳ ׳׳¢׳¨׳›׳× Tabit.<br />
            ׳׳—׳¦׳• ׳¢׳ ׳”׳›׳₪׳×׳•׳¨ ׳׳”׳–׳׳ ׳” ׳׳”׳™׳¨׳” ׳•׳ ׳•׳—׳”.
          </p>
          <a
            href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}
          >
            ׳”׳–׳׳ ׳” ׳“׳¨׳ Tabit
          </a>
        </div>
      </section>
    </main>
  );
}

export default Reservation;
