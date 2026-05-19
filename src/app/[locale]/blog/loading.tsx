import { Container } from '@shared/components';

export default function BlogLoading() {
  return (
    <div className="section-padding bg-white">
      <Container>
        <div className="mx-auto mb-8 max-w-2xl animate-pulse space-y-3">
          <div className="mx-auto h-12 w-48 rounded-2xl bg-gray-100" />
          <div className="mx-auto h-6 w-full max-w-md rounded-2xl bg-gray-100" />
        </div>
        <div className="mb-10 overflow-hidden rounded-2xl border border-black/[0.06] bg-white lg:flex">
          <div className="aspect-video w-full animate-pulse bg-gray-100 lg:w-[60%] lg:min-h-[280px]" />
          <div className="flex-1 space-y-4 p-8">
            <div className="h-4 w-32 rounded-full bg-gray-100" />
            <div className="h-10 w-full rounded-2xl bg-gray-100" />
            <div className="h-4 w-full rounded-2xl bg-gray-100" />
            <div className="h-4 w-2/3 rounded-2xl bg-gray-100" />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-card">
              <div className="aspect-video animate-pulse bg-gray-100" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-20 rounded-full bg-gray-100" />
                <div className="h-7 w-full rounded-2xl bg-gray-100" />
                <div className="h-4 w-full rounded-2xl bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
