import React, { useState, useEffect, useRef } from 'react';

import { Panel } from './Panel';
import { ErrorBoundary } from '../ErrorHandling/ErrorBoundary';
import { Filter } from '../Filter';
import { SearchBar } from '../SearchBar';
import { Pagination } from '../Pagination/Pagination';

const frameworks = require('../../config/frameworks.json');
const tool = require('../../config/tools.json');
const languages = require('../../config/languages.json');



/**
 *
 *
 * @export
 * @returns
 */
export function Panels(props: any) {

    const [allDataState] = useState<any>([...frameworks.data, ...tool.data, ...languages.data]);
    const [filterTags, setFilterTags] = useState<any>(["tools"]);

    const checkFilter = allDataState.filter((d: any) => filterTags.indexOf(d.tag) !== -1);

    const groupedData = checkFilter.reduce(
        (entryMap: any, e: any) => entryMap.set(e.tag, [...entryMap.get(e.tag) || [], e]),
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

        if (index === -1) {
            setFilterTags((tags: string[]) => [...tags, id]);
            return;
        } else {
            setFilterTags(filterTags.filter((tag: string) => {
                return tag !== id
            }))
        }

        // filter all objects for the ones whose tags match active tags in filter tags
        const t = allDataState.filter((d: any) => { return filterTags.indexOf(d.tag) !== -1 })
        // filter through the objects in prev step for the one whos name matches the search bar 
        const c = t.filter((item: any) => { return item.name.indexOf(searchBarRef.current.value) !== -1 });

        const b = c.reduce(
            (entryMap: any, e: any) => entryMap.set(e.tag, [...entryMap.get(e.tag) || [], e]),
            new Map()
        );

        setFilteredData(b);
    };


    const isInFilterCategory = () =>
        allDataState.filter((d: any) => { return filterTags.indexOf(d.tag) !== -1 })

    const isInSearchTerm = (items: any) =>
        items.filter((item: any) => { return item.name.indexOf(searchBarRef.current.value) !== -1 });


    const isInSearchTermAndInFilterCatgory = (searchTerm: string) =>
        allDataState.filter((d: any) => { return d.name.indexOf(searchTerm) !== -1 && filterTags.indexOf(d.tag) !== -1 });


    const groupByTags = (ungrouped: any) => ungrouped.reduce(
        (entryMap: any, e: any) => entryMap.set(e.tag, [...entryMap.get(e.tag) || [], e]),
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


        if (name === "") {
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


    return (

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
                filterTags.length === 0
                    ?
                    <h2 style={{color: "#c8c8c8"}}>Select from the filters above to reveal new releases.</h2>

                    : ([...filteredData.entries()]
                        ? [...filteredData.entries()].map((item: any) =>
                            <Pagination data={item[1]} pageSize={4} key={item[0]}>
                                <ErrorBoundary key={item[0]} data={item[1]}>
                                    <Panel description={item[0]} data={item[1]} key={item[0]} />
                                </ErrorBoundary>
                            </Pagination>
                        )
                        : <h2 style={{color: "#c8c8c8"}}>Oops there was an error bringing back the panels. Check in later.</h2>)
            }
        </>
    )

}