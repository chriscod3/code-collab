import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";
import { LandingPage } from "./pages/LandingPage";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* New landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* App entry (create/join rooms) */}
          <Route path="/app" element={<Index />} />

          {/* Existing editor route stays untouched */}
          <Route path="/editor/:roomCode" element={<Editor />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
