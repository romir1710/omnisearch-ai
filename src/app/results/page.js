"use client";

/**
 * SearchResults Page — /results?q=...
 *
 * WHY: This page displays search results that are contextual to the query.
 * Results are matched via keyword matching against our mock data sets.
 * If the query doesn't match any known topics, we show a helpful fallback
 * with suggested demo queries the user can click.
 *
 * ACCESSIBILITY FEATURES:
 * - <main> with id="main-content" for skip link target
 * - <ol> ordered list for results (screen readers announce count)
 * - <article> per result (landmark for screen readers)
 * - All buttons have explicit aria-labels with context
 * - aria-live region announces when AI Access View opens
 * - useRef on trigger buttons to return focus after modal closes
 */

import { useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ExternalLink, Sparkles, ArrowLeft, SearchX, Lightbulb } from "lucide-react";
import Link from "next/link";
import { findResultsForQuery, suggestedQueries } from "@/data/mockResults";
import AIAccessView from "@/components/AIAccessView";

function SearchResultsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("q") || "";
    const [activeResult, setActiveResult] = useState(null);

    // Find matching results for this query
    const matchedSet = findResultsForQuery(query);
    const results = matchedSet ? matchedSet.results : [];

    /**
     * WHY useRef for each trigger button: When the AI Access View modal
     * closes, we need to return focus to the exact button that opened it.
     * This is WCAG 2.4.3 — Focus Order. We store a ref for each result's
     * "Open in AI Access View" button.
     */
    const triggerRefs = useRef({});

    const openAIView = (result) => {
        setActiveResult(result);
    };

    const closeAIView = () => {
        setActiveResult(null);
    };

    /**
     * Navigate to results for a suggested query.
     * WHY: Clicking a suggestion chip re-searches with the demo query,
     * providing a guided experience for the hackathon demo.
     */
    const handleSuggestedQuery = (suggested) => {
        router.push(`/results?q=${encodeURIComponent(suggested)}`);
    };

    return (
        <>
            <main
                id="main-content"
                className="flex-1 px-4 py-8 aurora-bg"
                style={{ backgroundColor: "var(--bg-primary)" }}
            >
                <div className="max-w-3xl mx-auto">
                    {/* Back to Search + Query Display */}
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 mb-4 text-sm font-semibold no-underline transition-colors"
                            style={{ color: "var(--accent-primary)" }}
                            aria-label="Go back to the search homepage"
                        >
                            <ArrowLeft size={16} aria-hidden="true" />
                            Back to Search
                        </Link>

                        <h1
                            className="text-2xl font-bold mb-1"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Results for &ldquo;{query}&rdquo;
                        </h1>

                        {results.length > 0 ? (
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-muted)" }}
                            >
                                {results.length} results found
                                {matchedSet?.label && (
                                    <span>
                                        {" "}in <strong style={{ color: "var(--accent-primary)" }}>{matchedSet.label}</strong>
                                    </span>
                                )}
                                {" "}— each includes an{" "}
                                <strong style={{ color: "var(--accent-primary)" }}>
                                    AI Access View
                                </strong>{" "}
                                for easier reading.
                            </p>
                        ) : (
                            <p
                                className="text-sm"
                                style={{ color: "var(--text-muted)" }}
                            >
                                No results matched your search.
                            </p>
                        )}
                    </div>

                    {/* ---------------------------------------------------------------
              No Results State
              WHY: Rather than showing an empty page, we guide users to our
              demo queries. This improves the hackathon demo experience and
              is also good UX — always give users a way forward.
              --------------------------------------------------------------- */}
                    {results.length === 0 && (
                        <section
                            className="text-center py-12 px-6 rounded-xl mb-8"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                border: "2px solid var(--border-color)",
                            }}
                            aria-label="No results found — try a suggested search"
                        >
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                style={{ backgroundColor: "var(--bg-card)", border: "2px solid var(--border-color)" }}
                                aria-hidden="true"
                            >
                                <SearchX size={28} style={{ color: "var(--text-muted)" }} />
                            </div>

                            <h2
                                className="text-xl font-bold mb-2"
                                style={{ color: "var(--text-primary)" }}
                            >
                                No results for &ldquo;{query}&rdquo;
                            </h2>
                            <p
                                className="mb-6 max-w-md mx-auto"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                This is a prototype with curated demo data. Try one of the
                                suggested searches below to experience the AI Access View.
                            </p>

                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Lightbulb
                                    size={18}
                                    style={{ color: "var(--accent-primary)" }}
                                    aria-hidden="true"
                                />
                                <h3
                                    className="text-sm font-bold"
                                    style={{ color: "var(--accent-primary)" }}
                                >
                                    Try one of these:
                                </h3>
                            </div>

                            <div className="flex flex-wrap justify-center gap-2">
                                {suggestedQueries.map((suggested, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestedQuery(suggested)}
                                        aria-label={`Search for: ${suggested}`}
                                        className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 brand-gradient-bg text-white hover:opacity-90 active:scale-95"
                                    >
                                        {suggested}
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Results List */}
                    {results.length > 0 && (
                        /* WHY <ol>: Search results are ranked by relevance — an ordered
                           list communicates this hierarchy. Screen readers announce
                           "list, N items" and "1 of N", "2 of N", etc. */
                        <ol
                            className="space-y-6 list-none"
                            aria-label={`Search results for ${query}`}
                        >
                            {results.map((result, index) => (
                                <li key={result.id}>
                                    {/* WHY <article>: Each search result is a self-contained
                      content unit. Using <article> creates an article landmark
                      that screen readers can list and jump between. */}
                                    <article
                                        className="p-5 rounded-xl transition-shadow"
                                        style={{
                                            backgroundColor: "var(--bg-card)",
                                            border: "2px solid var(--border-color)",
                                        }}
                                        aria-labelledby={`result-title-${result.id}`}
                                    >
                                        {/* Result Number Badge */}
                                        <span
                                            className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2"
                                            style={{
                                                backgroundColor: "var(--bg-secondary)",
                                                color: "var(--text-muted)",
                                            }}
                                            aria-hidden="true"
                                        >
                                            Result {index + 1}
                                        </span>

                                        {/* URL Preview */}
                                        <p
                                            className="text-sm mb-1 truncate"
                                            style={{ color: "var(--text-muted)" }}
                                        >
                                            {result.url}
                                        </p>

                                        {/* Title — styled as a link to the original site */}
                                        <h2
                                            id={`result-title-${result.id}`}
                                            className="text-xl font-bold mb-2"
                                        >
                                            <a
                                                href={result.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="no-underline hover-underline-animated"
                                                style={{ color: "var(--accent-primary)" }}
                                                aria-label={`${result.title} — opens in a new tab`}
                                            >
                                                {result.title}
                                            </a>
                                        </h2>

                                        {/* Snippet */}
                                        <p
                                            className="mb-5 leading-relaxed"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {result.snippet}
                                        </p>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap items-center gap-3">
                                            {/* PRIMARY: Open in AI Access View Button */}
                                            <button
                                                ref={(el) => (triggerRefs.current[result.id] = el)}
                                                onClick={() => openAIView(result)}
                                                aria-label={`Open AI Access View for: ${result.title}. This will show a simplified, accessible version of this page.`}
                                                className="flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm transition-all duration-200 brand-gradient-bg text-white hover:opacity-90 active:scale-95"
                                            >
                                                <Sparkles size={18} aria-hidden="true" />
                                                Open in AI Access View
                                            </button>

                                            {/* SECONDARY: Visit Original Site Link */}
                                            <a
                                                href={result.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit original site: ${result.title} — opens in a new tab`}
                                                className="flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm no-underline transition-all duration-200 hover:bg-gray-100 active:scale-95"
                                                style={{
                                                    backgroundColor: "transparent",
                                                    color: "var(--text-secondary)",
                                                    border: "2px solid var(--border-color)",
                                                }}
                                            >
                                                <ExternalLink size={16} aria-hidden="true" />
                                                Visit Original Site
                                            </a>
                                        </div>
                                    </article>
                                </li>
                            ))}
                        </ol>
                    )}

                    {/* Suggested Queries — also shown below results for discovery */}
                    {results.length > 0 && (
                        <section
                            className="mt-10 pt-8"
                            style={{ borderTop: "1px solid var(--border-color)" }}
                            aria-label="Try other demo searches"
                        >
                            <h2
                                className="text-sm font-bold mb-3"
                                style={{ color: "var(--text-muted)" }}
                            >
                                Try other searches:
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {suggestedQueries
                                    .filter((s) => s.toLowerCase() !== query.toLowerCase())
                                    .map((suggested, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestedQuery(suggested)}
                                            aria-label={`Search for: ${suggested}`}
                                            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 no-underline hover:bg-gray-100 active:scale-95"
                                            style={{
                                                backgroundColor: "var(--bg-secondary)",
                                                color: "var(--text-secondary)",
                                                border: "1px solid var(--border-color)",
                                            }}
                                        >
                                            {suggested}
                                        </button>
                                    ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            {/* AI Access View Modal */}
            {activeResult && (
                <AIAccessView
                    result={activeResult}
                    onClose={closeAIView}
                    triggerRef={{ current: triggerRefs.current[activeResult.id] }}
                />
            )}
        </>
    );
}

/**
 * WHY Suspense: useSearchParams() requires a Suspense boundary in Next.js
 * App Router. Without it, the build would fail with a hydration error.
 * The fallback provides a meaningful loading state for screen readers.
 */
export default function SearchResultsPage() {
    return (
        <Suspense
            fallback={
                <main
                    id="main-content"
                    className="flex-1 flex items-center justify-center px-4 py-12"
                    style={{ backgroundColor: "var(--bg-primary)" }}
                >
                    <p
                        className="text-lg"
                        style={{ color: "var(--text-secondary)" }}
                        role="status"
                        aria-live="polite"
                    >
                        Loading search results…
                    </p>
                </main>
            }
        >
            <SearchResultsContent />
        </Suspense>
    );
}
