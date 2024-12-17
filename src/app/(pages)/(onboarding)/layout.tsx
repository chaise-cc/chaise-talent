export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <h2>Onboarding Layout</h2>
      {children}
    </div>
  );
}
