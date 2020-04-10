import React, { useState, useEffect, useReducer, useCallback } from 'react';

import { Panel } from '../../components/Items/Panel';
import { ErrorBoundary } from '../../components/ErrorHandling/ErrorBoundary';
import { PanelItem } from './PanelItem';
import { Filter } from '../../components/Filter';

const frameworks = require('../../config/frameworks.json');
const tool = require('../../config/tools.json');

/**
 *
 *
 * @export
 * @returns
 */
export function Panels (props: any) {
    
    const [allDataState, setAllData] = useState<any>([...frameworks.data, ...tool.data]);
    const [filterTags, setFilterTags] = useState<any>(["frameworks"]);

    const c = allDataState.filter((d: any) => filterTags.indexOf(d.tag) !== -1);

    const b = c.reduce(
		(entryMap: any, e: any) => entryMap.set(e.tag, [...entryMap.get(e.tag)||[], e]),
		new Map()
    );
    
    const [filteredData, setFilteredData] = useState<any>(b);
   
        // const [searchResults, setSearchResults] = useState<any>({ data: {} });

    // const [allData, allDataDispatch] = useReducer(reduce, [...allFrameworks, ...allTools]);

    /**
     *
     *
     * @param {*} event
     */
    function handleClick(event: any) {
    
        const id = event.target.id;
        const index = filterTags.indexOf(id);
        
        if(index === -1) {
            setFilterTags((tags: string[]) => [...tags, id]);
            return;
        } else {
            setFilterTags(filterTags.filter((tag: string) => { 
                return tag !== id
            }))
        } 
    };


    /**
     *
     *
     */
    function updateState() {
        
        const t = allDataState.filter((d: any) => { return filterTags.indexOf(d.tag) !== -1} )
    
        const data = t.reduce(
            (entryMap: any, e: any) => entryMap.set(e.tag, [...entryMap.get(e.tag)||[], e]),
            new Map()    
        )

        setFilteredData(data);
    }
    
    /**
     *
     *
     */
    useEffect(() => {
        
        updateState();
    },
        [filterTags]
    )

    
	// const handleSearch = (event: any) => {
      
	// 	const text = event.target.value;

	// 	if(text === "") {
	// 		setSearchResults(undefined);
	// 		return;
	// 	}
	
	// 	const data = allItems.filter((item: any) => {
	// 		return item.name.includes(text);
	// 	});

	// 	if((data[0] !== undefined) && (filterTags.indexOf(data[0].tag) !== -1)) {
	// 		setSearchResults(data) 
	// 	} 
  	// };

    return(
        
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Filter 
                            handleClick={handleClick}
                            filterTags={filterTags} />
                    </div>
                    <div className="col-lg-6">
                        {/* <SearchBar onChange={handleSearch} /> */}
                    </div>
                </div>
            </div>
            {
                [...filteredData.entries()] ? 
                    [...filteredData.entries()].map((item: any) => 
                        <ErrorBoundary key={item[0]} data={item[1]}>
                            <Panel description={item[0]} data={item[1]} /> 
                        </ErrorBoundary>
                    )
                    : 'Oops there was an error bringing back the panels. Check in later.'
            }
        </>
    )
    
}