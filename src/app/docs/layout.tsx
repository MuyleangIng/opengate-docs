import { DocsSidebar } from '@/components/layout/DocsSidebar';
import { DocsHeader } from '@/components/layout/DocsHeader';
import { PageNav } from '@/components/docs/PageNav';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DocsHeader />
      <div className="flex pt-14">
        <DocsSidebar />
        <main className="flex-1 min-w-0 ml-0 lg:ml-[260px]">
          <div className="max-w-3xl mx-auto px-6 py-10">
            <article className="prose prose-gray max-w-none
              prose-headings:font-bold
              prose-h1:text-3xl prose-h1:mb-2 prose-h1:text-gray-900
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-gray-800
              prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-gray-700
              prose-p:leading-7 prose-p:text-gray-600
              prose-li:text-gray-600 prose-li:leading-7
              prose-table:text-sm
              prose-th:font-semibold prose-th:text-gray-700 prose-th:bg-gray-50
              prose-td:text-gray-600 prose-td:align-top
              prose-code:text-[#0096c7] prose-code:font-mono prose-code:text-[0.85em]
              prose-code:bg-[#00B4D808] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-xl
              prose-a:text-[#00B4D8] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-800
              prose-hr:border-gray-200 prose-hr:my-8
              prose-ul:my-3 prose-ol:my-3
              prose-blockquote:border-[#00B4D8] prose-blockquote:bg-[#00B4D808] prose-blockquote:rounded-r-xl
            ">
              {children}
            </article>
            <PageNav />
          </div>
        </main>
      </div>
    </>
  );
}
