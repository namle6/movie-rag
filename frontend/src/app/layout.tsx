// src/app/layout.tsx
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { ClientLayout } from '@/components/client-layout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie RAG',
  description: 'An intelligent movie recommendation engine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}