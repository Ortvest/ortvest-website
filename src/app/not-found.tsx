import Link from 'next/link';

export default function RootNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-5">
      <div className="max-w-md text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#cdff4e]">404</p>
        <h1 className="text-h1 mb-4 text-black">Page not found</h1>
        <p className="mb-10 text-body text-black/60">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90">
          Back to home
        </Link>
      </div>
    </main>
  );
}
