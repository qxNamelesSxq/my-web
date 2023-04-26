import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Sort, SortPropertyEnum, selectSort, setSort } from "../redux/slices/filterSlice";
import  useWhyDidYouUpdate  from 'ahooks/lib/useWhyDidYouUpdate';


type PopupClick = MouseEvent & {
  composedPath:Node[]
}

type NameSort= {
  name:string;
  sortProperty:SortPropertyEnum;
}

type SortPopUpProps ={
  value:Sort
}

export const nameSort:NameSort[] = [
  { name: "popularity (DESC)", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "popularity (ASC)", sortProperty: SortPropertyEnum.RATING_ASC},
  { name: "price (DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "price(ASC)", sortProperty: SortPropertyEnum.PRICE_ASC},
  { name: "alphabetically (DESC)", sortProperty: SortPropertyEnum.TITLE_DESC},
  { name: "alphabetically (ASC)", sortProperty: SortPropertyEnum.TITLE_ASC},
];
const SortPopUp:React.FC<SortPopUpProps> = React.memo(({value}) => {
  useWhyDidYouUpdate('SortPopUp',{value})


  const dispatchTypeSort = useDispatch();
 
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = React.useState(false);

  const setNameSort = (obj:NameSort ) => {
    dispatchTypeSort(setSort(obj));
    setIsVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if ( sortRef.current && !_event.composedPath.includes(sortRef.current)) setIsVisible(false);

      document.body.addEventListener("click", handleClickOutside);
    };

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sorted by:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
      </div>

      {/* Условный рендеринг */}
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {nameSort.map((obj, index) => (
              <li
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
                }
                key={index}
                onClick={() => setNameSort(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})
export default SortPopUp;
