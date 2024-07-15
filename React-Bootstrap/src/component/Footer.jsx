import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="text-center bg-body-tertiary mt-5">
      <div className="container pt-4">
        <section className="mb-4">
          <a
            href="#!"
            className="btn btn-link btn-floating btn-lg text-body m-1"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>

          <a
            href="#!"
            className="btn btn-link btn-floating btn-lg text-body m-1"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a
            href="#!"
            className="btn btn-link btn-floating btn-lg text-body m-1"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </section>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright :
        <a className="text-body" href="#NNNDev">NNNDev</a>
      </div>
    </footer>
  );
};

export default Footer;
