import { redirect } from 'next/navigation'

/**
 * Root page - redirects to login or dashboard
 * In a real app, this would check authentication status
 */
export default function RootPage() {
  // TODO: Check auth status and redirect accordingly
  // For now, always redirect to login
  redirect('/login')
}
