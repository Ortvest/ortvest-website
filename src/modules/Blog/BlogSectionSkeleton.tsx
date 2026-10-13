import { Container } from '@shared/components';

export function BlogSectionSkeleton() {
  return (
    <section className="section-padding bg-white" aria-hidden="true">
      <Container>
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="animate-pulse space-y-3">
            <div className="h-4 w-24 rounded-full bg-gray-100" />
            <div className="h-10 w-72 max-w-full rounded-2xl bg-gray-100 sm:w-96" />
          </div>
          <div className="h-10 w-full max-w-sm animate-pulse rounded-2xl bg-gray-100" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-[420px] animate-pulse rounded-2xl bg-gray-100" />
          <div className="space-y-5">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-9 w-20 animate-pulse rounded-full bg-gray-100" />
              ))}
            </div>
            <div className="space-y-5 border-t border-black/10 pt-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2.5 border-b border-black/10 pb-5">
                  <div className="h-5 w-full animate-pulse rounded-2xl bg-gray-100" />
                  <div className="h-3.5 w-32 animate-pulse rounded-full bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 h-24 animate-pulse rounded-2xl bg-gray-100" />
      </Container>
    </section>
  );
}
