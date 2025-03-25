import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "@/hooks/use-toast";
import { NotificationProvider } from "@/hooks/useNotifications";
import MobileNavBar from "@/components/MobileNavBar";
import PWAHandler from "@/components/PWAHandler";
import ProtectedRoute from "./components/ProtectedRoute";

// Error boundary for lazy-loaded components
const LazyErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Error loading component:', error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Component</h1>
          <p className="text-muted-foreground mb-4">Please refresh the page or try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
};

// Lazy-loaded components with error handling
const lazyLoad = (importFunc: () => Promise<any>) => {
  return lazy(() => importFunc().catch(error => {
    console.error('Failed to load component:', error);
    return { default: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Component</h1>
          <p className="text-muted-foreground mb-4">Please refresh the page or try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )};
  }));
};

// Lazy-loaded components for better performance
const Index = lazyLoad(() => import("./pages/Index"));
const NotFound = lazyLoad(() => import("./pages/NotFound"));
const DeveloperRegistration = lazyLoad(() => import("./pages/DeveloperRegistration"));
const ProjectMatching = lazyLoad(() => import("./pages/ProjectMatching"));
const DeveloperProfile = lazyLoad(() => import("./pages/DeveloperProfile"));
const Dashboard = lazyLoad(() => import("./pages/Dashboard"));
const Messages = lazyLoad(() => import("./pages/Messages"));
const ProjectDetails = lazyLoad(() => import("./pages/ProjectDetails"));
const ClientDashboard = lazyLoad(() => import("./pages/ClientDashboard"));
const PostProject = lazyLoad(() => import("./pages/PostProject"));
const ManageProjects = lazyLoad(() => import("./pages/ManageProjects"));
const ViewBids = lazyLoad(() => import("./pages/ViewBids"));
const ClientProfile = lazyLoad(() => import("./pages/ClientProfile"));
const ClientSettings = lazyLoad(() => import("./pages/ClientSettings"));
const DeveloperDashboard = lazyLoad(() => import("./pages/DeveloperDashboard"));
const FindProjects = lazyLoad(() => import("./pages/FindProjects"));
const ManageBids = lazyLoad(() => import("./pages/ManageBids"));
const DeveloperPortfolio = lazyLoad(() => import("./pages/DeveloperPortfolio"));
const DeveloperSettings = lazyLoad(() => import("./pages/DeveloperSettings"));
const DeveloperShowcase = lazyLoad(() => import("./pages/DeveloperShowcase"));
const SignIn = lazyLoad(() => import("./pages/Auth/SignIn"));
const SignUp = lazyLoad(() => import("./pages/Auth/SignUp"));
const ForgotPassword = lazyLoad(() => import("./pages/Auth/ForgotPassword"));
const EscrowPayment = lazyLoad(() => import("./pages/EscrowPayment"));
const AdminEscrowVerification = lazyLoad(() => import("./pages/AdminEscrowVerification"));
const AdminDashboard = lazyLoad(() => import("./pages/AdminDashboard"));
const ProjectVerification = lazyLoad(() => import("./pages/ProjectVerification"));
const ClientVerification = lazyLoad(() => import("./pages/ClientVerification"));
const AuthCallback = lazyLoad(() => import("./pages/Auth/AuthCallback"));
const ProfileManagement = lazyLoad(() => import("./pages/ProfileManagement"));

// Loading fallback for lazy-loaded components
const LazyLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-16 h-16 bg-muted rounded-full mb-4"></div>
      <div className="h-4 w-24 bg-muted rounded mb-3"></div>
      <div className="h-3 w-32 bg-muted rounded"></div>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToastProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <PWAHandler />
          <Suspense fallback={<LazyLoadingFallback />}>
            <LazyErrorBoundary>
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Index />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/developer/:id" element={<DeveloperProfile />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/developer-showcase" element={<DeveloperShowcase />} />
                <Route path="/project-matching" element={<ProjectMatching />} />
                <Route path="/developer-signup" element={<DeveloperRegistration />} />
                
                {/* Common Protected Pages */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/messages" 
                  element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfileManagement />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Client-side Protected Pages */}
                <Route 
                  path="/client-dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <ClientDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/post-project" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <PostProject />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/manage-projects" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <ManageProjects />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/view-bids/:id" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <ViewBids />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/client-profile" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <ClientProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/client-settings" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <ClientSettings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/project/:id/payment" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <EscrowPayment />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Developer-side Protected Pages */}
                <Route 
                  path="/developer-dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['developer']}>
                      <DeveloperDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/find-projects" 
                  element={
                    <ProtectedRoute allowedRoles={['developer']}>
                      <FindProjects />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/manage-bids" 
                  element={
                    <ProtectedRoute allowedRoles={['developer']}>
                      <ManageBids />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/developer-portfolio" 
                  element={
                    <ProtectedRoute allowedRoles={['developer']}>
                      <DeveloperPortfolio />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/developer-settings" 
                  element={
                    <ProtectedRoute allowedRoles={['developer']}>
                      <DeveloperSettings />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin Protected Pages */}
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/escrow-verification" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminEscrowVerification />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/project-verification" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <ProjectVerification />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/client-verification" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <ClientVerification />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LazyErrorBoundary>
          </Suspense>
          <MobileNavBar />
        </NotificationProvider>
      </ToastProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
