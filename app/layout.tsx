import type { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
