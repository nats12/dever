import React from 'react';
import styled from "styled-components"
import theme from '../theme/theme'

const Menu = styled.ul`
    list-style-type: none;
    width: 30%;
    display: flex;
    justify-content: space-around;
`;

const MenuItem = styled.li`
    color: ${theme.lightGrey};
    margin-top: 20px;
    transition: color 0.5s ease;

    &:hover {
        color: ${theme.red};
        cursor: pointer;
        transition: color 0.5s ease;
    }
`;



export const Navigation = () => (
        
        <>
            <Menu>
                <MenuItem>About</MenuItem>
                <MenuItem>Donate</MenuItem>
            </Menu>
        </>
)
