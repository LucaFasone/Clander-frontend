import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {Navbar} from "@/components";
import { type QueryClient } from '@tanstack/react-query'

interface RouterContext {
    queryClient: QueryClient 
  } 
export const Route = createRootRouteWithContext<RouterContext>()({     
    component: () => {
        return (
            <>
                <Navbar/>
                <hr />
                <Outlet />
            </>
        );
    },
})
  