import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GenderProvider } from "@/contexts/GenderContext";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import SalonDetail from "./pages/SalonDetail";
import BookingFlow from "./pages/BookingFlow";
import Bookings from "./pages/Bookings";
import Offers from "./pages/Offers";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GenderProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="max-w-lg mx-auto relative">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/salon/:id" element={<SalonDetail />} />
              <Route path="/booking/:id" element={<BookingFlow />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </GenderProvider>
  </QueryClientProvider>
);

export default App;
