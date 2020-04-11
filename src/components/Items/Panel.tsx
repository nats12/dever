import React from 'react';

import { PanelItem } from './PanelItem';
import { Spinner } from '../Spinner';

/**
 *
 *
 * @export
 * @param {*} props
 * @returns
 */
export function Panel (props: any) {
    console.log(props);
    return(
        <div className={props.description}>
            {
                props.data ? 
                    props.data.map((item: any) => 
                        <PanelItem key={`${props.devtool}-${item.name}`} devtool={item.name} /> 
                    )
                : <Spinner />

            }
        </div>
    )
}