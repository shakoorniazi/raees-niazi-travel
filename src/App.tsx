import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PrivacyPolicy from "@/pages/privacy-policy";
import Terms from "@/pages/terms";
import Contact from "@/pages/contact";
import About from "@/pages/about";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
