import React from 'react'
import './scss/app.scss'
import Header from './components/Header'
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import Cart from './Pages/Cart';
import { useSelector, useDispatch } from 'react-redux'

export const SearchContext = React.createContext()



function App() {


  const [searchValue, setSearchValue] = React.useState("")

  // console.log(searchValue, 'qwe')


  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            {/* если переходить на несуществующий путь */}
            <Route path='*' element={<NotFound />} />
          </Routes>


        </div>
      </SearchContext.Provider>
    </div >
  );
}

export default App;
