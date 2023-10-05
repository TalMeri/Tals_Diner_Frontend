import "./App.css";
import MenuPage from "./pages/MenuPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Headers from "./components/Headers/Headers";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <div className="App">
      <BrowserRouter>
      <Headers />
        <Routes>
        <Route path="/" element={<HomePage />}></Route>
          <Route path="/menu" element={<MenuPage />}></Route>
          <Route path="/signUp" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </PersistGate>
    </Provider>
  );
}

export default App;
