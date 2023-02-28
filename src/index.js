import ReactDOM from "react-dom/client";
import "./reset.css";
import "./index.css";
import App from "./App";
// TODO: Descomentar cuando se envie el producto final
// import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// if (process.env.NODE_ENV === "production") {
//   disableReactDevTools();
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
