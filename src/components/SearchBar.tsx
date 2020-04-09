import React, { useRef, useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components"
import theme from '../theme/theme'


export const SearchBar = React.forwardRef((props: any, ref: any) => {  
    


    return (
        
        <div className="input-group mb-3">
            <input ref={ref} onChange={props.onChange} type="text" className="form-control" placeholder="Search for your favourite tools..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2"><IoIosSearch/></span>
            </div>
        </div>
    )
})
