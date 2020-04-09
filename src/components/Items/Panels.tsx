import React from 'react';

import { Panel } from '../../components/Items/Panel';
import { ErrorBoundary } from '../../components/ErrorHandling/ErrorBoundary';
import { PanelItem } from './PanelItem';

/**
 *
 *
 * @export
 * @returns
 */
export function Panels (props: any) {
    
    
    return(
        
        <>
            {
                props.searchResults !== undefined && props.searchResults[0]
                ? <ErrorBoundary key={props.searchResults[0].name} data={props.searchResults[0]}>
                    <PanelItem data={props.searchResults[0]} devtool={props.searchResults[0].name}/> 
                    </ErrorBoundary> 
                :
                    props.filterTags.map((tag: string) => {
                    return <ErrorBoundary key={tag} data={tag}>
                                <Panel 
                                key={tag} 
                                devtool={tag} 
                                data={props.data[tag]} /> 
                            </ErrorBoundary> 
                    })
            }
        </>
    )
}