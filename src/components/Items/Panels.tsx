import React, { useState, useEffect, useRef } from 'react';

import { Panel } from '../../components/Items/Panel';
import { ErrorBoundary } from '../../components/ErrorHandling/ErrorBoundary';
import { PanelItem } from './PanelItem';
import { Filter } from '../../components/Filter';
import { SearchBar } from '../../components/SearchBar';

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

    const checkFilter = allDataState.filter((d: any) => filterTags.indexOf(d.tag) !== -1);

    const groupedData = checkFilter.reduce(
		(entryMap: any, e: any) => entryMap.set(e.tag, [...entryMap.get(e.tag)||[], e]),
		new Map()
    );
    
    const [filteredData, setFilteredData] = useState<any>(groupedData);
    const searchBarRef = useRef<any>();

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

        // filter all objects for the ones whose tags match active tags in filter tags
        const t = allDataState.filter((d: any) => { return filterTags.indexOf(d.tag) !== -1} )
        // filter through the objects in prev step for the one whos name matches the search bar 
        const c = t.filter((item: any) => { return item.name.indexOf(searchBarRef.current.value) !== -1});

        const b = c.reduce(
            (entryMap: any, e: any) => entryMap.set(e.tag, [...entryMap.get(e.tag)||[], e]),
            new Map()
        );

        setFilteredData(b);
    };


    const isInFilterCategory = () => 
        allDataState.filter((d: any) => { return filterTags.indexOf(d.tag) !== -1} )

    const isInSearchTerm = (items: any) => 
    items.filter((item: any) => { return item.name.indexOf(searchBarRef.current.value) !== -1});


    const isInSearchTermAndInFilterCatgory = (searchTerm: string) => 
        allDataState.filter((d: any) => { return d.name.indexOf(searchTerm) !== -1 && filterTags.indexOf(d.tag) !== -1} );


    const groupByTags = (ungrouped: any) => ungrouped.reduce(
            (entryMap: any, e: any) => entryMap.set(e.tag, [...entryMap.get(e.tag)||[], e]),
            new Map()
        );

    /**
     *
     *
     */
    function updateState() {
        
        const checkCategory = isInFilterCategory();
        // filter through the objects in prev step for the one whos name matches the search bar 
        const checkTerm = isInSearchTerm(checkCategory);

        const groupedFilteredData = groupByTags(checkTerm);

        setFilteredData(groupedFilteredData);
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

    /**
     *
     *
     * @param {*} event
     */
    const handleSearch = (event: any) => {
    
		const name = event.target.value;
    
        
		if(name === "") {
            const checkCategory = isInFilterCategory();
            // filter through the objects in prev step for the one whos name matches the search bar 
            const checkTerm = isInSearchTerm(checkCategory);

            const groupedFilteredData = groupByTags(checkTerm);
            

            setFilteredData(groupedFilteredData);
			return;
		}
    
        const checkTermAndCategory = isInSearchTermAndInFilterCatgory(name);
        
        const data = groupByTags(checkTermAndCategory);
        

        setFilteredData(data);
  	};

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
                        <SearchBar onChange={handleSearch} ref={searchBarRef} />
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