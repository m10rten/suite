export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container w-full flex flex-col justify-start items-center">
      {children}
    </main>
  );
}
