import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo | Page not found';
  }, []);

  return (
  <main className="sheet flex min-h-dvh flex-col justify-center py-20">
    <p className="lbl">Error 404</p>
    <h1 className="display-1 mt-3">This page isn't on file.</h1>
    <p className="lede mt-5">
      The address you followed doesn't match anything we publish. It may have
      moved when the site was rebuilt.
    </p>
    <div className="mt-8 flex flex-wrap gap-3">
      <Link to="/" className="btn-primary">
        Back to the front page
      </Link>
      <Link to="/tools" className="btn-secondary">
        Go to the calculators
      </Link>
    </div>
    </main>
  );
};

export default NotFound;
