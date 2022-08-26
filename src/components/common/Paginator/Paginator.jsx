import React from "react";
import { useState } from "react";
import styles from './Paginator.module.css';


let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize=10}) => {
    let pagesCount = Math.ceil(totalItemsCount / portionSize);
    let pages = [];
    for (let i=1; i <= pagesCount; i++){
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / pageSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return (
        <div>
            {portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber - 1)}}>prev</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
                .map(p => {
                    return <span className={p === currentPage && styles.selectedPage}
                            onClick={(e) => { onPageChanged(p); }}>{p}</span>
                })}
            {portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber + 1)}}>next</button>}
            
        </div>
    )

}
export default Paginator;