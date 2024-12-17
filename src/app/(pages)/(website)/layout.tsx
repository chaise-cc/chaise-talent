export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <h2>Website Layout</h2>
      {children}
    </div>
  );
}
