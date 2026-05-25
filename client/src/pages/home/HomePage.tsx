import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold">AI Summarizer</h1>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Link
            to="/sources"
            className="rounded border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100"
          >
            Sources
          </Link>
        </div>
        <p className="text-sm text-neutral-500">Dashboard — coming soon.</p>
      </main>
    </div>
  );
}
