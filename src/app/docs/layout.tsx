import { DocsSidebar } from '@/components/layout/DocsSidebar';
import { DocsHeader } from '@/components/layout/DocsHeader';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DocsHeader />
      <div className="flex pt-14">
        <DocsSidebar />
        <main className="flex-1 min-w-0 ml-0 lg:ml-[260px]">
          <div className="max-w-3xl mx-auto px-6 py-10">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
