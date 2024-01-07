export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container h-full w-full flex flex-col justify-start items-center">
      {children}
    </div>
  );
}
