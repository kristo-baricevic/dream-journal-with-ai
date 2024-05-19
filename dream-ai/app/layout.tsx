import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dream With AI',
  description: 'An AI-Enhanced Dream Journal Dream Analyzer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <html lang="en">
      <ClerkProvider publishableKey={publishableKey}>
        <body className={inter.className}>
            {children}
        </body>
      </ClerkProvider>
    </html>
  )
}
