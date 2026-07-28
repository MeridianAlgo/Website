import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * The house signature: a columnar accounting sheet that works out a real
 * compound-interest schedule. Same math as the Compound Interest tool.
 */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const money = (n: number) =>
  n.toLocaleString('en-US', { maximumFractionDigits: 0 });

/** Counts once, on mount only — typing should feel instant, not animated. */
function useTallyOnMount(target: number, duration = 900) {
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? target : 0));
  const done = useRef(prefersReducedMotion());

  useEffect(() => {
    if (done.current) {
      setShown(target);
      return;
    }
    done.current = true;
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(target * eased);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (done.current) setShown(target);
  }, [target]);

  return shown;
}

const Ledger = () => {
  const [monthly, setMonthly] = useState('200');
  const [years, setYears] = useState('20');
  const [rate, setRate] = useState('7');

  const result = useMemo(() => {
    const pmt = Math.max(0, parseFloat(monthly) || 0);
    const yrs = Math.min(60, Math.max(0, parseFloat(years) || 0));
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = Math.round(yrs * 12);
    const balance = r > 0 ? pmt * ((Math.pow(1 + r, n) - 1) / r) : pmt * n;
    const deposited = pmt * n;
    return { balance, deposited, interest: balance - deposited };
  }, [monthly, years, rate]);

  const tallied = useTallyOnMount(result.balance);

  const rows = [
    { n: '01', label: 'Opening balance', value: <span className="entry-fig">0</span> },
    {
      n: '02',
      label: 'Deposit, every month',
      htmlFor: 'lg-monthly',
      value: (
        <span className="flex w-28 shrink-0 items-baseline justify-end gap-1">
          <span className="fig text-steel">$</span>
          <input
            id="lg-monthly"
            type="number"
            inputMode="decimal"
            min="0"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            className="field w-20 py-1 text-right sm:w-24"
          />
        </span>
      ),
    },
    {
      n: '03',
      label: 'Term',
      htmlFor: 'lg-years',
      value: (
        <span className="flex w-28 shrink-0 items-baseline justify-end gap-1">
          <input
            id="lg-years"
            type="number"
            inputMode="numeric"
            min="1"
            max="60"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="field w-14 py-1 text-right sm:w-16"
          />
          <span className="fig text-steel">yrs</span>
        </span>
      ),
    },
    {
      n: '04',
      label: 'Assumed annual return',
      htmlFor: 'lg-rate',
      value: (
        <span className="flex w-28 shrink-0 items-baseline justify-end gap-1">
          <input
            id="lg-rate"
            type="number"
            inputMode="decimal"
            min="0"
            max="30"
            step="0.5"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="field w-14 py-1 text-right sm:w-16"
          />
          <span className="fig text-steel">%</span>
        </span>
      ),
    },
    {
      n: '05',
      label: 'Paid in from your pocket',
      value: <span className="entry-fig">{money(result.deposited)}</span>,
    },
    {
      n: '06',
      label: 'Earned by the interest',
      value: <span className="entry-fig">{money(result.interest)}</span>,
    },
  ];

  return (
    <figure className="m-0 border border-ink bg-sheet">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ink px-4 py-3 sm:px-6">
        <span className="font-sans text-[0.9375rem] font-medium">Worksheet 01 — Compound interest</span>
        <span className="font-sans text-[0.875rem] text-steel">
          Monthly deposits, compounded monthly
        </span>
      </figcaption>

      <ol className="list-none p-0">
        {rows.map((row, i) => (
          <li
            key={row.n}
            className={`grid grid-cols-[2.25rem_1fr] items-baseline sm:grid-cols-[3rem_1fr] ${
              i % 2 === 1 ? 'bg-band' : ''
            } animate-ledger-line`}
            style={{ animationDelay: `${120 + i * 55}ms` }}
          >
            <span className="fig self-stretch border-r-2 border-stamp/70 py-2 pr-2 text-right text-[0.6875rem] text-steel sm:pr-3">
              {row.n}
            </span>
            <div className="entry px-3 sm:px-6">
              {row.htmlFor ? (
                <label htmlFor={row.htmlFor} className="cursor-text text-[0.9375rem]">
                  {row.label}
                </label>
              ) : (
                <span className="text-[0.9375rem]">{row.label}</span>
              )}
              <span className="entry-fill" aria-hidden="true" />
              {row.value}
            </div>
          </li>
        ))}
      </ol>

      <div
        className="grid animate-ledger-line grid-cols-[2.25rem_1fr] border-t border-ink sm:grid-cols-[3rem_1fr]"
        style={{ animationDelay: '460ms' }}
      >
        <span className="fig flex items-center justify-end self-stretch border-r-2 border-stamp/70 py-4 pr-2 text-[0.6875rem] text-steel sm:pr-3">
          =
        </span>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 px-3 py-4 sm:px-6">
          <span className="max-w-[13rem] text-[0.9375rem] leading-snug">
            Balance after {parseFloat(years) || 0} years
          </span>
          <span className="fig rule-total pb-1 text-[1.75rem] font-medium leading-none sm:text-[2.25rem]">
            ${money(tallied)}
          </span>
        </div>
      </div>
    </figure>
  );
};

export default Ledger;
