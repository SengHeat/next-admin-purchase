import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - DRSB Purchase Manager',
  description: 'Login to your DRSB purchase management account',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-background px-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
