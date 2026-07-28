import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const RECORD = [
  { label: 'Structure', value: 'Student-run nonprofit' },
  { label: 'Fiscal sponsor', value: 'The Hack Foundation, 501(c)(3)' },
  { label: 'Years running', value: '4' },
  { label: 'Volunteers', value: '35' },
  { label: 'Countries', value: '4' },
  { label: 'Newsletter issues', value: '19' },
  { label: 'Calculators', value: '37, free, no account' },
  { label: 'Public repositories', value: '16' },
  { label: 'Cost to use', value: 'Nothing' },
];

const About = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo | About';
  }, []);

  return (
    <>
      <section className="sheet grid items-start gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <h1 className="display-1">
            Students teaching the money math we had to learn ourselves.
          </h1>
          <p className="lede mt-6">
            Nobody sat us down and explained compound interest, or what an APR
            really costs, or why a 401(k) match is the closest thing to free
            money most people will see. So we started writing it down.
          </p>
        </div>

        {/* The record: the same ruled sheet used for every figure on this site. */}
        <figure className="m-0 border border-ink bg-sheet">
          <figcaption className="lbl border-b border-ink px-4 py-3 text-ink sm:px-6">
            The organization, on record
          </figcaption>
          <dl className="m-0">
            {RECORD.map((row, i) => (
              <div key={row.label} className={i % 2 === 1 ? 'bg-band' : ''}>
                <div className="entry px-4 sm:px-6">
                  <dt className="text-[0.9375rem]">{row.label}</dt>
                  <span className="entry-fill" aria-hidden="true" />
                  <dd className="fig m-0 shrink-0 text-right text-[0.875rem]">{row.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </figure>
      </section>

      <section className="sheet py-14 sm:py-16">
        <div className="border-t border-ink pt-4">
          <p className="lbl">What we do</p>
        </div>
        <div className="mt-8 max-w-column space-y-5 text-[1.0625rem] leading-relaxed sm:text-[1.125rem]">
          <p>
            MeridianAlgo publishes a weekly newsletter, builds free calculators,
            and releases every line of the code behind them. The audience is
            people at the start: students, first jobs, first loans, first
            paycheck that has to cover rent.
          </p>
          <p>
            We don't sell anything and we don't take a cut of anything. There is
            no product upsell at the end of an article, because there is no
            product. The Hack Foundation handles our nonprofit paperwork so the
            rest of us can spend the time writing and shipping.
          </p>
        </div>
      </section>

      <section className="sheet py-14 sm:py-16">
        <div className="border-t border-ink pt-4">
          <p className="lbl">How we work</p>
        </div>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-3">
          <div className="border-t border-rule pt-4">
            <h2 className="text-lg font-bold">Plain language first</h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel">
              If a sentence needs a finance degree to parse, it gets rewritten.
              Jargon is defined the first time it appears or it doesn't appear.
            </p>
          </div>
          <div className="border-t border-rule pt-4">
            <h2 className="text-lg font-bold">Show the working</h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel">
              Our models are interpretable on purpose. A number you can't trace
              back to its assumptions is a number you shouldn't act on.
            </p>
          </div>
          <div className="border-t border-rule pt-4">
            <h2 className="text-lg font-bold">Open by default</h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel">
              Research, tools, and this website are public repositories. Fork
              them, check our math, or lift a formula for your own class.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink bg-band">
        <div className="sheet flex flex-wrap items-center justify-between gap-6 py-10">
          <p className="max-w-column font-display text-xl font-bold leading-snug sm:text-2xl">
            Want to help write, teach, or code? We have room.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Get in touch
            </Link>
            <Link to="/opensource" className="btn-secondary">
              Read the source
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
