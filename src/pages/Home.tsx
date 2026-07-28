import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Ledger from '../components/Ledger';

const CONTENTS = [
  {
    n: '01',
    to: '/tools',
    title: 'Calculators',
    detail: '37 worksheets — budgets, debt payoff, mortgages, taxes, retirement.',
    count: '37',
  },
  {
    n: '02',
    to: '/newsletters',
    title: 'Newsletter',
    detail: 'Smart Cents Weekly and Corporate Compass. Read or download any issue.',
    count: '19',
  },
  {
    n: '03',
    to: '/opensource',
    title: 'Source code',
    detail: 'Every tool, model, and this site itself. Public, and ready to fork.',
    count: '16',
  },
];

const PUBLICATIONS = [
  {
    title: 'Smart Cents Weekly',
    thumb: '/newsletters/thumbnails/SmartCents.png',
    detail:
      'The weekly issue. One market idea, one habit, and the numbers behind both — written for people who have never bought a share.',
  },
  {
    title: 'Corporate Compass',
    thumb: '/newsletters/thumbnails/Corporate-Compass.png',
    detail:
      'A closer read of how companies actually make money: earnings, filings, and what the jargon in them means.',
  },
];

const Home = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo | Home';
  }, []);

  return (
    <>
      {/* Hero: the claim on the left, the proof on the right. */}
      <section className="sheet grid items-start gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <h1 className="display-1">Money math, worked out in the open.</h1>
          <p className="lede mt-6">
            MeridianAlgo is a student-run nonprofit. We build free calculators,
            publish a weekly newsletter, and open-source the code behind both.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/tools" className="btn-primary">
              Open the calculators
            </Link>
            <Link to="/newsletters" className="btn-secondary">
              Read the newsletter
            </Link>
          </div>
          <p className="mt-8 border-t border-rule pt-4 text-[0.9375rem] text-steel">
            Fiscally sponsored by The Hack Foundation, a 501(c)(3).
          </p>
        </div>

        <div>
          <Ledger />
        </div>
      </section>

      {/* Contents: an index of the site, kept as ledger rows rather than cards. */}
      <section className="sheet py-14 sm:py-16">
        <div className="border-t border-ink pt-4">
          <h2 className="display-2">Three things, all free.</h2>
        </div>

        <ul className="mt-8 list-none border-t border-rule p-0">
          {CONTENTS.map((item, i) => (
            <li key={item.n} className={i % 2 === 1 ? 'bg-band' : ''}>
              <Link
                to={item.to}
                className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 border-b border-rule px-2 py-5 transition-colors duration-150 hover:bg-ink hover:text-paper sm:grid-cols-[3rem_1fr_auto] sm:px-4"
              >
                <span className="fig text-[0.6875rem] text-steel group-hover:text-paper/70">
                  {item.n}
                </span>
                <span>
                  <span className="font-display text-xl font-bold">{item.title}</span>
                  <span className="mt-1 block max-w-column text-[0.9375rem] leading-snug text-steel group-hover:text-paper/80">
                    {item.detail}
                  </span>
                </span>
                <span className="fig text-lg">{item.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works — plain columns, no icons, no boxes. */}
      <section className="sheet py-14 sm:py-16">
        <div className="border-t border-ink pt-4">
          <h2 className="display-2">How this works</h2>
          <p className="lede mt-3">
            Three rules we hold ourselves to on every calculator and every issue.
          </p>
        </div>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-3">
          <div className="border-t border-rule pt-4">
            <h3 className="text-lg font-bold">Nothing to sign up for</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel">
              The calculators run in your browser. Your figures never leave the
              page, and there is no account to make.
            </p>
          </div>
          <div className="border-t border-rule pt-4">
            <h3 className="text-lg font-bold">The assumptions are printed</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel">
              Each worksheet shows its inputs and the rate it assumed. If a result
              looks wrong, check the math — or read the code that ran it.
            </p>
          </div>
          <div className="border-t border-rule pt-4">
            <h3 className="text-lg font-bold">Students wrote it</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel">
              We are learning this too, which is why nothing here assumes you
              already know what a basis point is.
            </p>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="sheet py-14 sm:py-16">
        <div className="border-t border-ink pt-4">
          <h2 className="display-2">Published weekly</h2>
          <p className="lede mt-3">
            Two letters, 19 issues so far, and the presses are running again.
            New issues are on the way.
          </p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {PUBLICATIONS.map((pub) => (
            <article key={pub.title} className="border border-rule bg-sheet">
              {/* Covers are printed in one ink so they sit on the sheet. */}
              <img
                src={pub.thumb}
                alt=""
                loading="lazy"
                className="h-44 w-full border-b border-rule bg-band object-contain p-4 grayscale"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold">{pub.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel">{pub.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6">
          <Link to="/newsletters" className="link">
            Browse every issue
          </Link>
        </p>
      </section>

      {/* Closing */}
      <section className="border-t border-ink bg-band">
        <div className="sheet flex flex-wrap items-center justify-between gap-6 py-10">
          <p className="max-w-column font-display text-xl font-bold leading-snug sm:text-2xl">
            Start with the one that costs you the most money to get wrong.
          </p>
          <Link to="/tools" className="btn-primary">
            Open the calculators
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
