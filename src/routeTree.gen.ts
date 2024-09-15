/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as LandingPageImport } from './routes/LandingPage'
import { Route as IndexImport } from './routes/index'
import { Route as AuthUserPageImport } from './routes/_auth/userPage'
import { Route as AuthDashboardImport } from './routes/_auth/dashboard'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const LandingPageRoute = LandingPageImport.update({
  path: '/LandingPage',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthUserPageRoute = AuthUserPageImport.update({
  path: '/userPage',
  getParentRoute: () => AuthRoute,
} as any)

const AuthDashboardRoute = AuthDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/LandingPage': {
      id: '/LandingPage'
      path: '/LandingPage'
      fullPath: '/LandingPage'
      preLoaderRoute: typeof LandingPageImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_auth/dashboard': {
      id: '/_auth/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthDashboardImport
      parentRoute: typeof AuthImport
    }
    '/_auth/userPage': {
      id: '/_auth/userPage'
      path: '/userPage'
      fullPath: '/userPage'
      preLoaderRoute: typeof AuthUserPageImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  LandingPageRoute,
  AuthRoute: AuthRoute.addChildren({ AuthDashboardRoute, AuthUserPageRoute }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/LandingPage",
        "/_auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/LandingPage": {
      "filePath": "LandingPage.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/dashboard",
        "/_auth/userPage"
      ]
    },
    "/_auth/dashboard": {
      "filePath": "_auth/dashboard.tsx",
      "parent": "/_auth"
    },
    "/_auth/userPage": {
      "filePath": "_auth/userPage.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
