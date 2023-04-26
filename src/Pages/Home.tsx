import React from "react";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { nameSort } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { SearchPizzaParams, fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

import { useSelector, useDispatch } from "react-redux";
import {
  FilterSliceState,
  setCategoryId,
  setCurrentPage,
  setFilters,
  slectFilter,
} from "../redux/slices/filterSlice";
import { AppDispatch } from "../redux/store";



const Home:React.FC = () => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch()

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(slectFilter);

  // const sortType = sort.sortProperty; 
  // const [items, setItems] = React.useState([]);

  const onChangeCategory =  React.useCallback((id:number) => {
    dispatch(setCategoryId(id));
  },[]);

  const renderPizzas = items.map((value:any) => (
    <PizzaBlock key={value.id} {...value} />
  ));

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const onChangePage = (page:number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(

      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  //Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId:categoryId>0?categoryId:null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     }

  //     const queryString = qs.stringify(params,{skipNulls:true})
  //     navigate(`?${queryString}`);

  //     if(!window.location.search)
  //     {
  //       dispatch(fetchPizzas({} as SearchPizzaParams))
  //     }
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  //Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
//   React.useEffect(() => {
//     if (window.location.search) {
//       const params = qs.parse(window.location.search.substring(1)) as SearchPizzaParams

//       const sort = nameSort.find(
//         (obj) => obj.sortProperty === params.sortBy
//       );
   
//       dispatch(
//         setFilters({
//   searchValue:params.search,
//   categoryId: Number(params.category),
//   currentPage: Number(params.currentPage),
//   sort: sort || nameSort[0],
// })
//       );
//       isSearch.current = true;
//     }
//   }, []);
  //Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>

      {status === "error" ? (
        <div className="content__error-info">
          <h2>Error</h2>
          <p>Oops, something is wrong. </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : renderPizzas}
        </div>
      )}

      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};
export default Home;
