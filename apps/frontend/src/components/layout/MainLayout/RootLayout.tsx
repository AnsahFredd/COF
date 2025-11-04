import React from 'react';
import { AppShell } from '@mantine/core';
import { Header } from '../header/Header';
import Footer from '../footer/Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <AppShell header={{ height: 70 }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>

      <Footer />
    </AppShell>
  );
};
