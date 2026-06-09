import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "566386177665-m6b3c4u4es40m6355u8dig66l7dlf4do.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);
