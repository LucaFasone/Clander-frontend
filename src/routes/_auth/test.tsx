import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/test')({
  component: () => <div>Hello /_auth/test!
    <br />

    <Link to="/mao">mao</Link>
  </div>
})