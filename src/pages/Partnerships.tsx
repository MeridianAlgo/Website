import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import jukeboxLogo from '../assets/images/jukebox.png';
import costcoLogo from '../assets/images/Costco.png';
import hackFoundationLogo from '../assets/images/HackClub.png';

const PARTNERS = [
  {
    name: 'The Hack Foundation',
    role: 'Fiscal sponsor',
    logo: hackFoundationLogo,
    url: 'https://the.hackfoundation.org/',
    detail:
      'Holds our 501(c)(3) status and handles the nonprofit paperwork, so donations are tax-deductible and we can spend our time writing instead of filing.',
  },
  {
    name: 'Jukebox Print',
    role: 'Printing',
    logo: jukeboxLogo,
    url: 'https://www.jukeboxprint.com/',
    detail:
      'Prints the workshop handouts and stickers we hand out at events, at a rate a student nonprofit can actually pay.',
  },
  {
    name: 'Costco',
    role: 'Event food',
    logo: costcoLogo,
    url: 'https://www.costco.com/',
    detail:
      'Supplies food for our in-person sessions. Turnout goes up when there is something to eat.',
  },
];

const Partnerships = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo | Partners';
  }, []);

  return (
    <>
      <section className="sheet py-14 lg:py-20">
        <p className="lbl">Partners</p>
        <h1 className="display-1 mt-3 max-w-[20ch]">The people who cover what we can't.</h1>
        <p className="lede mt-6">
          We don't sell anything, so the work runs on sponsorship and donated
          services. Here is exactly who helps and with what.
        </p>
      </section>

      <section className="sheet pb-4">
        <ul className="list-none border-t border-ink p-0">
          {PARTNERS.map((partner, i) => (
            <li
              key={partner.name}
              className={`grid gap-x-8 gap-y-4 border-b border-rule px-2 py-8 sm:grid-cols-[8rem_1fr] sm:px-4 ${
                i % 2 === 1 ? 'bg-band' : ''
              }`}
            >
              <img
                src={partner.logo}
                alt=""
                className="h-16 w-28 border border-rule bg-sheet object-contain p-2 grayscale"
              />
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h2 className="text-xl font-bold">{partner.name}</h2>
                  <span className="lbl">{partner.role}</span>
                </div>
                <p className="mt-2 max-w-column text-[0.9375rem] leading-relaxed text-steel">
                  {partner.detail}
                </p>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link lbl mt-3 inline-flex items-center gap-1"
                >
                  Visit {partner.name}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="sheet py-14 sm:py-16">
        <div className="border-t border-ink pt-4">
          <p className="lbl">Working with us</p>
          <h2 className="display-2 mt-2 max-w-[24ch]">What a partner actually gets.</h2>
        </div>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-3">
          <div className="border-t border-rule pt-4">
            <h3 className="text-lg font-bold">A named credit</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel">
              On this page and in the issues your support paid for. We say what
              you gave and what it covered.
            </p>
          </div>
          <div className="border-t border-rule pt-4">
            <h3 className="text-lg font-bold">A student audience</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel">
              Readers at the start of their financial lives, in four countries,
              who asked to hear from us.
            </p>
          </div>
          <div className="border-t border-rule pt-4">
            <h3 className="text-lg font-bold">Work you can point at</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel">
              Free tools and open code, with a public record of where the support
              went.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink bg-band">
        <div className="sheet flex flex-wrap items-center justify-between gap-6 py-10">
          <p className="max-w-column font-display text-xl font-bold leading-snug sm:text-2xl">
            Want to sponsor an issue, a workshop, or a semester?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Start a conversation
            </Link>
            <a href="mailto:meridianalgo@gmail.com" className="btn-secondary">
              Email us directly
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partnerships;
