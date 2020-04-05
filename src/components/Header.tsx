import React from 'react';
import styled from "styled-components"
import theme from '../theme/theme'

import { Navigation } from './Navigation';

const HeaderBlock = styled.div`
    background-color: ${theme.black};
    color: ${theme.white};
    width: 100%;
    height: 30vh;
    padding-top: 25px;
`;

const HeaderTextWrap = styled.div`
    display: flex;
    justify-content: space-between;

`;

export const Header = () => (
        
    <>
        <HeaderBlock>
            <div className="container">
                <HeaderTextWrap>
                    <div>
                        <h1>Release Repo</h1>
                        <small>A witty strapline.</small>
                    </div>
                    <Navigation />
                </HeaderTextWrap>
            </div>
        </HeaderBlock>
    </>
)
