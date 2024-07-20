import { createFileRoute, Outlet} from '@tanstack/react-router'
import { userQueryOptions } from '../lib/api'

const Login = () => {
  return (
    <div className="">
      You have to login <br />
      <a href="/api/login">Login</a>
    </div>
  )
}
const Component = () => {
  const {user} = Route.useRouteContext()       
  if (!user) {
    return <Login />
  }
  return <Outlet />
}

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient
    try {

      const data = await queryClient.fetchQuery(userQueryOptions)
      return {user: data}

    } catch (err) {
      return { user: null }

    }
  },
  component: Component
})