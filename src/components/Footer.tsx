import React from 'react';
import styled from 'styled-components';
import theme from '../theme/theme';

const FooterBlock = styled.div`
    background-color: ${theme.black};
    color: ${theme.white};
    width: 100%;
    height: 20vh;
    padding-top: 25px;
`;

export const Footer: React.FC = () => {

    return (
        <FooterBlock>
            &copy; Natalie Mclaren 2020
        </FooterBlock>
    )
}