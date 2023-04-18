import React from 'react'
import './scss/app.scss'
import Header from './components/Header'
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { Routes, Route, Outlet } from 'react-router-dom';
import Cart from './Pages/Cart';
import { useSelector, useDispatch } from 'react-redux'
import FullPizza from './Pages/FullPizza';
import MainLayout from './layouts/MainLayout';





function App() {
  // console.log(searchValue, 'qwe')
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/fullPizza/:ID' element={<FullPizza />} />
        {/* если переходить на несуществующий путь */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>

  );
}

export default App;
