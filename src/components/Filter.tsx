import React, { useRef, useEffect, useState } from 'react';
import styled from "styled-components"
import theme from '../theme/theme'

const tags = require('../config/tags.json');

const Tag = (props: any) => (
    
    <>
        <button 
            onClick={props.handleClick} 
            id={props.name} 
            type="button" 
            className={`btn ${props.filterList.indexOf(props.name) !== -1 ? "btn-light" : "btn-primary"}`}>
                {props.name}
        </button>
    </>
)

export function Filter(props: any) {
    
 
    const FilterContainer = styled.div`
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
        <>
            
            <FilterContainer>
                {
                    tags.data.map((tag: string) => 
                        <Tag 
                            handleClick={props.handleClick} 
                            filterList={props.filterList}
                            onChange={props.handler} 
                            name={tag} 
                            key={tag} />)
                }
            </FilterContainer>
             
         
        </>
    )
}
