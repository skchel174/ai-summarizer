import { Link } from "react-router-dom";

export function SourcesPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-900">
            ← Home
          </Link>
          <h1 className="text-lg font-semibold">Sources</h1>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <p className="text-sm text-neutral-500">Sources library — coming soon.</p>
      </main>
    </div>
  );
}
