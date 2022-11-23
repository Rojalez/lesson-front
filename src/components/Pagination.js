import React from "react";
import Button from "./UI/Button";

const Pagination = ({lessons, currentPage, setCurrentPage}) => {
    return (
        <div className={'space-x-2 flex w-full justify-between'}>
            {lessons?.lessons?.current_page === 1
                ? <Button color={'teal-300'} textColor={'gray-200'} disabled={true}>Назад</Button>
                : <Button color={'white'} textColor={'black'} cursor={'pointer'} onClick={() => setCurrentPage(currentPage - 1)}>Назад</Button>
            }
            {lessons?.lessons?.current_page === lessons?.lessons?.last_page
                ? <Button color={'teal-300'} textColor={'gray-200'} disabled={true}>Следующее задание</Button>
                : <Button color={'white'} textColor={'black'} cursor={'pointer'} onClick={() => setCurrentPage(currentPage + 1)}>Следующее задание</Button>
            }
        </div>
    )
}

export default Pagination;