import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import HomePage from './pages/HomePage.jsx';
import ProductPage from "./pages/ProductPage.jsx";




function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            Cool Commerce
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
