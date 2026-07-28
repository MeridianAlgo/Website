import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Newsletter {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  category?: string;
  week?: number;
  thumbnail?: string;
}

const ITEMS_PER_PAGE = 10;

const Newsletters = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = 'MeridianAlgo | Newsletters';
  }, []);

  useEffect(() => {
    const loadNewsletters = async () => {
      try {
        const response = await fetch('/newsletters/manifest.json');
        if (response.ok) {
          const manifestData = await response.json();
          const newsletterList: Newsletter[] = manifestData.newsletters.map(
            (item: { fileName: string;[key: string]: unknown }) => ({
              ...item,
              fileUrl: `/newsletters/${item.fileName}`,
              id: item.fileName.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9]/g, '-')
            })
          );
          newsletterList.sort(
            (a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          );
          setNewsletters(newsletterList);
        } else {
          setNewsletters([]);
        }
      } catch {
        setNewsletters([]);
      } finally {
        setLoading(false);
      }
    };

    loadNewsletters();
  }, []);

  // Escape closes the reader.
  useEffect(() => {
    if (!selectedPdf) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPdf(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedPdf]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  const categories = Array.from(
    new Set(newsletters.map((n) => n.category).filter(Boolean))
  ) as string[];

  const filteredNewsletters = newsletters.filter((newsletter) => {
    const matchesSearch =
      searchQuery === '' ||
      newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsletter.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      (newsletter.category && selectedCategories.includes(newsletter.category));

    const ts = new Date(newsletter.uploadDate).getTime();
    const afterStart = startDate ? ts >= new Date(startDate + 'T00:00:00').getTime() : true;
    const beforeEnd = endDate ? ts <= new Date(endDate + 'T23:59:59').getTime() : true;

    return matchesSearch && matchesCategory && afterStart && beforeEnd;
  });

  const totalPages = Math.ceil(filteredNewsletters.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredNewsletters.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const filtersActive = Boolean(searchQuery || selectedCategories.length || startDate || endDate);

  return (
    <>
      <section className="sheet py-14 lg:py-20">
        <p className="lbl"></p>
        <h1 className="display-1 mt-3 max-w-[20ch]">Every issue, free to read.</h1>
        <p className="lede mt-6">
          Smart Cents Weekly covers one idea and one habit a week. Corporate
          Compass goes deeper on how companies make money. Both are PDFs, so read
          them here or keep a copy.
        </p>

        <div className="mt-8 max-w-column border-l-4 border-stamp bg-band py-4 pl-5 pr-4">
          <p className="font-sans text-[1.0625rem] font-bold">The presses are back on.</p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-steel">
            We went quiet for a while. The newsletter factory is running again, so
            expect new issues on this page shortly.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sheet">
        <div className="border-t border-ink pt-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <label htmlFor="nl-search" className="lbl">
                Search titles and topics
              </label>
              <input
                id="nl-search"
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="e.g. inflation"
                className="field mt-1"
              />
            </div>
            <div>
              <label htmlFor="nl-start" className="lbl">
                Published after
              </label>
              <input
                id="nl-start"
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="field mt-1"
              />
            </div>
            <div>
              <label htmlFor="nl-end" className="lbl">
                Published before
              </label>
              <input
                id="nl-end"
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="field mt-1"
              />
            </div>
          </div>

          {categories.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="lbl">Topic</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  aria-pressed={selectedCategories.includes(cat)}
                  className={`lbl border-b-2 py-1 transition-colors duration-150 hover:text-ink ${
                    selectedCategories.includes(cat) ? 'border-stamp text-ink' : 'border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
              {filtersActive && (
                <button type="button" onClick={clearFilters} className="lbl ml-auto text-stamp">
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Index */}
      <section className="sheet pb-20 pt-8">
        <div className="flex items-baseline justify-between border-b border-ink pb-2">
          <h2 className="lbl text-ink">Issues</h2>
          <p className="lbl">
            {loading ? 'Loading' : `${filteredNewsletters.length} of ${newsletters.length}`}
          </p>
        </div>

        {loading ? (
          <p className="lbl py-12">Loading the archive…</p>
        ) : filteredNewsletters.length === 0 ? (
          <div className="py-12">
            <p className="text-[1.0625rem]">No issues match those filters.</p>
            <button type="button" onClick={clearFilters} className="btn-secondary mt-4">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <ul className="list-none p-0">
              {paginated.map((issue, i) => (
                <li
                  key={issue.id}
                  className={`grid grid-cols-1 gap-x-6 gap-y-3 border-b border-rule px-2 py-5 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:px-4 ${
                    i % 2 === 1 ? 'bg-band' : ''
                  }`}
                >
                  <span className="fig hidden text-[0.6875rem] text-steel sm:block">
                    {String(startIndex + i + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <h3 className="text-[1.0625rem] font-bold leading-snug">{issue.title}</h3>
                    <p className="mt-1 max-w-column text-[0.9375rem] leading-snug text-steel">
                      {issue.description}
                    </p>
                    <p className="lbl mt-2">
                      {formatDate(issue.uploadDate)}
                      {issue.category ? ` · ${issue.category}` : ''}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    {issue.fileName.toLowerCase().endsWith('.pdf') ? (
                      <button
                        type="button"
                        onClick={() => setSelectedPdf(issue)}
                        className="btn-secondary"
                      >
                        Read
                      </button>
                    ) : (
                      <a
                        href={issue.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        Open
                      </a>
                    )}
                    <a href={issue.fileUrl} download={issue.fileName} className="btn-secondary">
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn-secondary disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Newer
                </button>
                <span className="lbl">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="btn-secondary disabled:opacity-40"
                >
                  Older
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Reader */}
      {selectedPdf && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPdf.title}
        >
          <div className="flex h-full max-h-[92vh] w-full max-w-5xl flex-col border border-ink bg-sheet">
            <div className="flex items-center justify-between gap-4 border-b border-ink px-4 py-3">
              <h2 className="lbl text-ink">{selectedPdf.title}</h2>
              <div className="flex items-center gap-2">
                <a
                  href={selectedPdf.fileUrl}
                  download={selectedPdf.fileName}
                  className="lbl hover:text-stamp"
                >
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedPdf(null)}
                  className="inline-flex h-11 w-11 items-center justify-center hover:text-stamp"
                >
                  <span className="sr-only">Close reader</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <iframe src={selectedPdf.fileUrl} className="flex-1 border-0" title={selectedPdf.title} />
          </div>
        </div>
      )}
    </>
  );
};

export default Newsletters;
