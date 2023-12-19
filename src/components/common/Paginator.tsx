import React, {useState} from 'react';
import s from './Paginator.module.css'
import Button from "@mui/material/Button";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentItem: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}
export const Paginator = (props: PropsType) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(Math.ceil(props.currentItem / props.portionSize))
    let leftPotionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionNumber = portionNumber * props.portionSize

    return <div>
        {portionNumber > 1 &&
            <Button onClick={() => setPortionNumber(portionNumber - 1)}>Previous</Button>}
        {pages
            .filter(p => p >= leftPotionPageNumber && p <= rightPortionNumber)
            .map(p => {
                return <span className={props.currentItem === p ? s.selectedPage : s.page}
                             onClick={() => props.onPageChanged(p)}>{p} </span>
            })}
        {portionCount > portionNumber &&
            <Button onClick={() => setPortionNumber(portionNumber + 1)}>Next</Button>}
    </div>
}






