/**
 * App.jsx — Root application component
 *
 * Wraps everything in AppProvider (global state),
 * renders the Navbar, Home page, and AI assistant widget.
 */

import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import AIAssistant from "./components/AIAssistant";
import Home from "./pages/Home";

const App = () => {
  return (
    // AppProvider makes all global state available to every component
    <AppProvider>
      {/* Fixed top navigation bar */}
      <Navbar />

      {/* Main page content */}
      <Home />

      {/* Persistent AI chat widget — floats in bottom-right corner */}
      <AIAssistant />
    </AppProvider>
  );
};

export default App;
