import { Link } from 'react-router-dom';

const COLUMNS = [
  {
    head: 'Use',
    links: [
      { label: 'Calculators', to: '/tools' },
      { label: 'Newsletter archive', to: '/newsletters' },
      { label: 'Source code', to: '/opensource' },
    ],
  },
  {
    head: 'Organization',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Partners', to: '/partnerships' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

const EXTERNAL = [
  { label: 'GitHub', href: 'https://github.com/MeridianAlgo' },
  { label: 'Email', href: 'mailto:meridianalgo@gmail.com' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A107717373&keywords=meridianalgo&origin=RICH_QUERY_SUGGESTION&position=0&searchId=78e6a6ae-9729-449e-8747-3931ace9b150&sid=M2v&spellCorrectionEnabled=false',
  },
  { label: 'The Hack Foundation', href: 'https://the.hackfoundation.org/' },
];

const Footer = () => (
  <footer className="border-t-2 border-ink bg-sheet">
    <div className="sheet grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div className="lg:col-span-2">
        <p className="font-display text-lg font-bold">MeridianAlgo</p>
        <p className="mt-3 max-w-column text-[0.9375rem] leading-relaxed text-steel">
          A student-run nonprofit teaching personal finance. Fiscally sponsored by
          The Hack Foundation, a 501(c)(3). Every calculator is free to use and our
          code is public.
        </p>
      </div>

      {COLUMNS.map((col) => (
        <div key={col.head}>
          <h2 className="lbl border-b border-rule pb-2 text-ink">{col.head}</h2>
          <ul className="mt-3 list-none space-y-2 p-0 text-[0.9375rem]">
            {col.links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="link decoration-transparent hover:decoration-stamp">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="sheet flex flex-wrap gap-x-6 gap-y-2 border-t border-rule py-4">
      {EXTERNAL.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link hover:text-stamp"
        >
          {item.label}
        </a>
      ))}
    </div>

    <div className="sheet flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-ink py-4">
      <p className="m-0 text-[0.9375rem] text-steel">© {new Date().getFullYear()} MeridianAlgo</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <a
          href="/legal/Privacy Policy for MeridianAlgo.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link hover:text-stamp"
        >
          Privacy
        </a>
        <a
          href="/legal/Terms of Service for MeridianAlgo.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link hover:text-stamp"
        >
          Terms
        </a>
        <a
          href="https://github.com/MeridianAlgo/meridianalgo.org/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link hover:text-stamp"
        >
          Changelog v5.0.0
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
