import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/userPage')({
  component: userPage
})

export default function userPage() {
  return (
    <div>userPage</div>
  )
}
