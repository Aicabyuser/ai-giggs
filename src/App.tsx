import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "@/hooks/use-toast";
import { NotificationProvider } from "@/hooks/useNotifications";
import MobileNavBar from "@/components/MobileNavBar";
import PWAHandler from "@/components/PWAHandler";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded components for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DeveloperRegistration = lazy(() => import("./pages/DeveloperRegistration"));
const ProjectMatching = lazy(() => import("./pages/ProjectMatching"));
const DeveloperProfile = lazy(() => import("./pages/DeveloperProfile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Messages = lazy(() => import("./pages/Messages"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const ClientDashboard = lazy(() => import("./pages/ClientDashboard"));
const PostProject = lazy(() => import("./pages/PostProject"));
const ManageProjects = lazy(() => import("./pages/ManageProjects"));
const ViewBids = lazy(() => import("./pages/ViewBids"));
const ClientProfile = lazy(() => import("./pages/ClientProfile"));
const ClientSettings = lazy(() => import("./pages/ClientSettings"));
const DeveloperDashboard = lazy(() => import("./pages/DeveloperDashboard"));
const FindProjects = lazy(() => import("./pages/FindProjects"));
const ManageBids = lazy(() => import("./pages/ManageBids"));
const DeveloperPortfolio = lazy(() => import("./pages/DeveloperPortfolio"));
const DeveloperSettings = lazy(() => import("./pages/DeveloperSettings"));
const DeveloperShowcase = lazy(() => import("./pages/DeveloperShowcase"));
const SignIn = lazy(() => import("./pages/Auth/SignIn"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const EscrowPayment = lazy(() => import("./pages/EscrowPayment"));
const AdminEscrowVerification = lazy(() => import("./pages/AdminEscrowVerification"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ProjectVerification = lazy(() => import("./pages/ProjectVerification"));
const ClientVerification = lazy(() => import("./pages/ClientVerification"));
const AuthCallback = lazy(() => import("./pages/Auth/AuthCallback"));
const ProfileManagement = lazy(() => import("./pages/ProfileManagement"));

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
    <BrowserRouter>
      <TooltipProvider>
        <ToastProvider>
          <NotificationProvider>
            <Toaster />
            <Sonner />
            <PWAHandler />
            <Suspense fallback={<LazyLoadingFallback />}>
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
                  path="/admin-dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/project/:projectId/verification" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminEscrowVerification />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Client-side Verification Routes */}
                <Route 
                  path="/project/:projectId/verification/client" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <ClientVerification />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Developer-side Verification Routes */}
                <Route 
                  path="/project/:projectId/verification/developer" 
                  element={
                    <ProtectedRoute allowedRoles={['developer']}>
                      <ProjectVerification />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <MobileNavBar />
          </NotificationProvider>
        </ToastProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
