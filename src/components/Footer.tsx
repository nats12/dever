import React from 'react';
import styled from 'styled-components';
import theme from '../theme/theme';

const FooterBlock = styled.div`
    background-color: ${theme.black};
    color: ${theme.white};
    width: 100%;
    height: 20vh;
    padding-top: 25px;
    overflow: hidden;
`;

const FooterContent = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 30px;
}
`;

export const Footer: React.FC = () => {

    return (
        <FooterBlock>
            <FooterContent>
                <small>&copy; Natalie Mclaren 2020</small>
                <small>Made with &hearts; by <a href="https://github.com/nats12" target="_blank">nats12</a></small>
            </FooterContent>
        </FooterBlock>
    )
}