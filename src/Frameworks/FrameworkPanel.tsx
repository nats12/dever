import React from 'react';

import { Framework } from './Framework';

const frameworks = require('../config/frameworks.json');

/**
 *
 *
 * @export
 * @returns
 */
export function FrameworkPanel (props: any) {
    
    
    return(
        
        <div>
            { 
                Object.keys(frameworks.data).map((index: any) =>
                     <Framework key={frameworks.data[index]} framework={frameworks.data[index]} /> 
                )
            }
        </div>
    )
}