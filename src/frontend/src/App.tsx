import { AuthGuard } from "@/components/AuthGuard";
import { FeedCardSkeleton } from "@/components/LoadingSkeleton";
import { ToastProvider } from "@/components/Toast";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const FeedPage = lazy(() => import("@/pages/Feed"));
const UploadPage = lazy(() => import("@/pages/Upload"));
const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const ProfilePage = lazy(() => import("@/pages/Profile"));

function PageFallback() {
  return (
    <div className="p-4 space-y-4">
      <FeedCardSkeleton />
      <FeedCardSkeleton />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <ToastProvider />
      <AuthGuard>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </AuthGuard>
    </>
  ),
});

const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: FeedPage,
});

const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/upload",
  component: UploadPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  feedRoute,
  uploadRoute,
  dashboardRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
