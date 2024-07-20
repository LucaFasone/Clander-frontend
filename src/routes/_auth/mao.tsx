import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/mao')({
  beforeLoad: async ({context}) =>{
    console.log(context.user);
  },
  component: () => <div>Hello /_auth/mao!
    <div className=""></div>
    <Link to="/test">mao</Link>

  </div>
})