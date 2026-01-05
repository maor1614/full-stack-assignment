import './globals.css';


export const metadata = {
  title: 'Task Management',
  description: 'Task management assignment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
