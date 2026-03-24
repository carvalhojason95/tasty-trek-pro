import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import MobileLayout from "@/components/MobileLayout";
import Index from "./pages/Index";
import RestaurantList from "./pages/RestaurantList";
import RestaurantMenu from "./pages/RestaurantMenu";
import Cart from "./pages/Cart";
import OrderTracking from "./pages/OrderTracking";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import OrderHistory from "./pages/OrderHistory";
import Favorites from "./pages/Favorites";
import PaymentMethods from "./pages/PaymentMethods";
import ScheduledOrders from "./pages/ScheduledOrders";
import GroupOrders from "./pages/GroupOrders";
import EcoPreferences from "./pages/EcoPreferences";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MobileLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route path="/restaurant/:id" element={<RestaurantMenu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/tracking" element={<OrderTracking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/support" element={<Support />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/payment-methods" element={<PaymentMethods />} />
              <Route path="/scheduled-orders" element={<ScheduledOrders />} />
              <Route path="/group-orders" element={<GroupOrders />} />
              <Route path="/eco-preferences" element={<EcoPreferences />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MobileLayout>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
