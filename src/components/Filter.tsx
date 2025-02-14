import React from 'react';
import { FaTags } from "react-icons/fa";

import styled from "styled-components"
import theme from '../theme/theme'
import devices from '../theme/devices';

const tags = require('../config/tags.json');

const Tag = (props: any) => {
    
    return (
        <button 
            onClick={props.handleClick} 
            id={props.name} 
            type="button" 
            className={`btn btn-sm ${props.filterTags.indexOf(props.name) !== -1 ? "btn-light" : "btn-primary"}`}>
                {props.name}
        </button>
  
    )
}

export const Filter = (props: any) => {
    
 
    const FilterContainer = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-evenly;

        .btn-light {
            color: ${theme.lightestGrey} !important;
            border: 1px solid ${theme.lightGrey} !important;
        }

        .btn {
            min-width: 100px;
        }
    `

    const FilterSearch = styled.div`
        display: flex;
        margin-bottom: 100px;

        svg {
            font-size: 30px;
            margin-right: 10px;
            align-self: center;
        }
    `   
    
      


    const TagIcon = styled.div`
        
        display: none;

        @media ${devices.laptop} {
            display: block;
        }
        
    `


    return (
        <FilterSearch className="FilterSearch">
            <TagIcon>
                <FaTags />
            </TagIcon>
            
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
       </FilterSearch>
    )
}
