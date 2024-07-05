import { createRootRoute, Outlet } from '@tanstack/react-router'
import {Navbar} from "@/components";
export const Route = createRootRoute({
    component: () => (
        <>
            <Navbar/>
            <hr />
            <Outlet />
        </>
    ),
})
