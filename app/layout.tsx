import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.scss'

// Replace src, weight range, and variable name to match your font.
// Drop your woff2 file(s) into public/fonts/ and update the path below.
const primaryFont = localFont({
  src: './fonts/inter-latin.woff2',
  variable: '--font-primary',
  display: 'swap',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'My Site',
  description: 'Built with Next.js and Sanity CMS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={primaryFont.variable}>
      <body>{children}</body>
    </html>
  )
}
