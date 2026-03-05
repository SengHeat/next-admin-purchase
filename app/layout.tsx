import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geistSans = Geist({
    subsets: ["latin"],
    variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: '--font-geist-mono'
})

export const metadata: Metadata = {
    title: 'DRSB Purchase Manager',
    description: 'Professional purchase order management and tracking system',
    generator: 'v0.app',
    icons: {
        icon: [
            {
                url: '/icon.svg',
                type: 'image/svg+xml',
            },
        ],
    },
}

export const viewport: Viewport = {
    themeColor: '#1a1f3a',
    userScalable: false,
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="font-sans antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"  // 👈 This makes it follow system by default
            enableSystem           // 👈 This enables system detection
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        <Analytics />
        </body>
        </html>
    )
}