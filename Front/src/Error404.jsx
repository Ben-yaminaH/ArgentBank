import { Link } from "react-router-dom"; 


function Error404() {
  return (
    <div className="div-404">
      <p className="title-404">404</p>
      <p className="message-404">
        Oups! La page que vous demandez n'existe pas.
      </p>
      <Link to="/" className="link-404">
        Retourner sur la page d’accueil
      </Link>
    </div>
  );
}

export default Error404;
