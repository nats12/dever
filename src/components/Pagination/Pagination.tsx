import React, { useEffect, useState, cloneElement } from 'react';


export function Pagination(props: any, context: any) {
    
    const [currentPage, setCurrentPage] = useState<any>(null);
    const [pageCount, setPageCount] = useState<any>(null);

    const setCurrentPage2 = (num: any) => {
        setCurrentPage(num);
    }


    /**
     *
     *
     */
    useEffect(() => {
        
        const startingPage = props.startingPage
            ? props.startingPage
            : 1;
        // const data = props.data;
        const pageSize = props.pageSize;
        let pageCount2 = props.data.length / pageSize;
        if (props.data.length % pageSize > 0) {
        pageCount2++;
        }
        console.log(pageCount2);
        setCurrentPage(startingPage);
        setPageCount(pageCount2);
        
    },
        [props]
    )

    


    const createControls = () => {
        const controls = [];
        // const pageCount = this.state.pageCount;
        for (let i = 1; i <= pageCount; i++) {
          const baseClassName = 'pagination-controls__button';
          const activeClassName = i === currentPage ? `${baseClassName}--active` : '';
          controls.push(
            <div
                key={i}
                className={`${baseClassName} ${activeClassName}`}
                onClick={() => setCurrentPage2(i)}
            >
              {i}
            </div>
          );
        }
        return controls;
    }


    const createPaginatedData = () => {
        const data = props.data;
        const pageSize = props.pageSize;
        // const currentPage = currentPage;
        const upperLimit = currentPage * pageSize;
        const dataSlice = data.slice((upperLimit - pageSize), upperLimit);
        
        return dataSlice;
    }

    return (
        <div className='pagination-panel'>
            <div className='pagination-controls'>
            {createControls()}
            </div>
            <div className='pagination-results'>
   
            {cloneElement(props.children.props.children, {data: createPaginatedData()})}
            </div>
        </div>
    )
}




