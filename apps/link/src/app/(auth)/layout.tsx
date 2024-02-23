export default function AuthLayout({
  children,
  // signin,
}: {
  children: React.ReactNode;
  // signin: React.ReactNode;
}) {
  return (
    <>
      <main className="container pt-16 flex-1">{children}</main>
      {/* {signin} */}
    </>
  );
}
