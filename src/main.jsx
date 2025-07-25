
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
const root = createRoot(document.getElementById('root'))




root.render(<App />)

import 'bootstrap/dist/css/bootstrap.min.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
