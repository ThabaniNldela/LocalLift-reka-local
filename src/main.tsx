import React from "react"
import ReactDOM from "react-dom/client"

import App from "@/App"
import RootProviders from "@/context"
import "@/index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootProviders>
      <App />
    </RootProviders>
  </React.StrictMode>,
)
