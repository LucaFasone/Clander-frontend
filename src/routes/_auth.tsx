import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'

const Component = () => {
  const { user } = Route.useRouteContext()
  if (!user) {
    throw redirect({ to: '/LandingPage' })
  }  
  if (user.picture == null || user.picture?.substring(0, 16) === "https://gravatar") {
    user.picture = 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'
  }
  return (
    <>
      <Navbar>
        <Button className='boxColorShadow rounded-md border-2 font-secondary text-[#fcedd8] font-semibold mx-5 p-2 ' onClick={(e) => {
          e.preventDefault();
          window.location.href = '/api/logout';
        }}> Logout</Button>
        <Link to='/userPage'>
          <div className=''>
            <img src={user.picture} height={'36px'} width={'36px'} className='rounded-full border-2' />
          </div>
        </Link>
      </Navbar >
      <Outlet />
    </>
  )
}

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    try {
      const { user } = await context.authentication
      return { user }

    } catch (err) {
      throw redirect({ to: '/LandingPage' })

    }
  },
  component: Component
})


