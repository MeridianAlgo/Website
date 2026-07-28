import { useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const DETAILS = [
  { label: 'Email', value: 'meridianalgo@gmail.com', href: 'mailto:meridianalgo@gmail.com' },
  { label: 'Code', value: 'github.com/MeridianAlgo', href: 'https://github.com/MeridianAlgo' },
  { label: 'Where we are', value: 'Remote, 4 countries' },
  { label: 'Usual reply time', value: 'Within 24 hours' },
];

const WAYS = [
  'Run a financial literacy workshop with your school or community group',
  'Use our classroom-ready material, or ask for a version that fits your class',
  'Contribute code, review our math, or file an issue',
  'Sponsor an issue of the newsletter',
];

const Contact = () => {
  const [state, handleSubmit] = useForm('xkgzwdoa');

  useEffect(() => {
    document.title = 'MeridianAlgo | Contact';
  }, []);

  if (state.succeeded) {
    return (
      <section className="sheet py-20">
        <figure className="m-0 max-w-column border border-ink bg-sheet">
          <figcaption className="lbl border-b border-ink px-5 py-3 text-ink">
            Message received
          </figcaption>
          <div className="p-5">
            <p className="text-[1.0625rem] leading-relaxed">
              Thanks — it's in our inbox. Someone reads every message, usually
              within a day. If it's urgent, email{' '}
              <a href="mailto:meridianalgo@gmail.com" className="link">
                meridianalgo@gmail.com
              </a>{' '}
              directly.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-secondary mt-6"
            >
              Send another message
            </button>
          </div>
        </figure>
      </section>
    );
  }

  return (
    <>
      <section className="sheet py-14 lg:py-20">
        <h1 className="display-1 max-w-[20ch]">Tell us what you need.</h1>
        <p className="lede mt-6">
          Questions about a calculator, a correction to something we published, a
          workshop for your school, or an offer to help — all of it goes to the
          same place.
        </p>
      </section>

      <section className="sheet grid gap-12 pb-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <figure className="m-0 border border-ink bg-sheet">
            <figcaption className="lbl border-b border-ink px-4 py-3 text-ink sm:px-5">
              Direct
            </figcaption>
            <dl className="m-0">
              {DETAILS.map((row, i) => (
                <div key={row.label} className={i % 2 === 1 ? 'bg-band' : ''}>
                  <div className="entry px-4 sm:px-5">
                    <dt className="text-[0.9375rem]">{row.label}</dt>
                    <span className="entry-fill" aria-hidden="true" />
                    <dd className="fig m-0 shrink-0 text-right text-[0.875rem]">
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="link"
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </figure>

          <h2 className="lbl mt-10 border-t border-ink pt-4 text-ink">Things people ask for</h2>
          <ul className="mt-4 list-none space-y-3 p-0">
            {WAYS.map((way) => (
              <li key={way} className="flex gap-3 text-[0.9375rem] leading-snug">
                <span className="fig shrink-0 text-stamp" aria-hidden="true">
                  —
                </span>
                {way}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="border border-ink bg-sheet">
          <p className="lbl border-b border-ink px-5 py-3 text-ink">Send a message</p>

          <div className="space-y-7 p-5 sm:p-6">
            <div>
              <label htmlFor="name" className="lbl">
                Your name <span className="text-stamp">*</span>
              </label>
              <input id="name" type="text" name="name" required autoComplete="name" className="field mt-1" />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="lbl mt-2 text-stamp" />
            </div>

            <div>
              <label htmlFor="email" className="lbl">
                Email <span className="text-stamp">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                className="field mt-1"
              />
              <p className="lbl mt-2 normal-case tracking-normal">So we can reply.</p>
              <ValidationError prefix="Email" field="email" errors={state.errors} className="lbl mt-2 text-stamp" />
            </div>

            <div>
              <label htmlFor="interest" className="lbl">
                What it's about
              </label>
              <select id="interest" name="interest" className="field-boxed mt-1">
                <option value="">Choose one</option>
                <option value="financial-literacy">Workshops and programs</option>
                <option value="education">Classroom resources</option>
                <option value="opensource">Open source contribution</option>
                <option value="research">Research collaboration</option>
                <option value="partnership">Sponsorship or partnership</option>
                <option value="recruiting">Joining the team</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="lbl">
                Message <span className="text-stamp">*</span>
              </label>
              <textarea id="message" name="message" required rows={6} className="field-boxed mt-1 py-2" />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="lbl mt-2 text-stamp"
              />
            </div>

            <button type="submit" disabled={state.submitting} className="btn-primary w-full disabled:opacity-50">
              {state.submitting ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Contact;
