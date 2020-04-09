import React, { useRef, useEffect, useState } from 'react';
import { IoIosPricetag } from "react-icons/io";

import styled from "styled-components"
import theme from '../theme/theme'

const tags = require('../config/tags.json');

const Tag = (props: any) => {
    
    return (
        <button 
            onClick={props.handleClick} 
            id={props.name} 
            type="button" 
            className={`btn ${props.filterTags.indexOf(props.name) !== -1 ? "btn-light" : "btn-primary"}`}>
                {props.name}
        </button>
  
    )
}

export const Filter = (props: any) => {
    
 
    const FilterContainer = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;

        button {
            min-width: 120px;

        }

        .btn-light {
            color: ${theme.lightestGrey} !important;
            border: 1px solid ${theme.lightGrey} !important;
        }
    `


    return (
        <div className="FilterSearch">
            <div className="Tag">
                <IoIosPricetag/>
            </div>
            
            <FilterContainer>
                {
                    tags.data.map((tag: string) => 
                        <Tag 
                            handleClick={props.handleClick} 
                            filterTags={props.filterTags}
                            onChange={props.handler} 
                            name={tag} 
                            key={tag} />)
                }
            </FilterContainer>
       </div>
    )
}
