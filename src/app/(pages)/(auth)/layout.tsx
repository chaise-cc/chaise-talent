export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <h2>Authentication Layout</h2>
      {children}
    </div>
  );
}
