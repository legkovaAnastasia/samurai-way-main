import React from 'react';
import s from './Paginator.module.css'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}
export const Paginator = (props: PropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map(p => {
            return <span className={props.currentPage === p ? s.selectedPage : s.page}
                         onClick={() => props.onPageChanged(p)}>{p} </span>
        })}
    </div>
}






