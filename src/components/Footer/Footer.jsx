import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__name">Developed by Nathaniel Daley</p>
      <p className="footer__date">{new Date().getFullYear()}</p>
    </footer>
  );
}
