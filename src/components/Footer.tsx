import React from 'react';
import styled from 'styled-components';
import theme from '../theme/theme';
import devices from '../theme/devices';

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
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;

    @media ${devices.laptop} {
        display: flex;
        width: 100%;
        align-items: center;
        flex-direction: row;
        justify-content: space-between !important;
        height: 100%;
        padding: 0 30px;
    }
}
`;

export const Footer: React.FC = () => {

    return (
        <FooterBlock>
            <FooterContent>
                <small>&copy; <strong>Natalie Mclaren 2020</strong></small>
                <small>Want to chat? Feel free to drop me an <a href="mailto:natalielmclaren@hotmail.com" target="_blank">email</a>!</small>
                <small>Made with &hearts; by <a href="https://github.com/nats12" target="_blank">nats12</a></small>
            </FooterContent>
        </FooterBlock>
    )
}