import { Container } from '@shared/components';

export function BlogSectionSkeleton() {
  return (
    <section className="section-padding bg-white" aria-hidden="true">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl animate-pulse space-y-3">
          <div className="mx-auto h-6 w-40 rounded-full bg-gray-100" />
          <div className="mx-auto h-10 w-3/4 max-w-md rounded-2xl bg-gray-100" />
          <div className="mx-auto h-5 w-full max-w-lg rounded-2xl bg-gray-100" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-card">
              <div className="aspect-video animate-pulse bg-gray-100" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-24 animate-pulse rounded-full bg-gray-100" />
                <div className="h-7 w-full animate-pulse rounded-2xl bg-gray-100" />
                <div className="h-4 w-full animate-pulse rounded-2xl bg-gray-100" />
                <div className="h-4 w-2/3 animate-pulse rounded-2xl bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
