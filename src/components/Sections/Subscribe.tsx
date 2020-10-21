import React from 'react';
import styled from 'styled-components';
import theme from '../../theme/theme';
import devices from '../../theme/devices';


const SubscribeContainer = styled.div`
    padding: 10vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: ${theme.lightGrey};
    color: ${theme.midGrey};

    h2 {
        font-size: 1.2em;
        text-align: center; 
    }
    

    a {
        margin-top: 2vw;
        padding: 10px 80px 10px 80px;
    }

    @media ${devices.laptop} { 
        font-size: 1.6em;
    }
`;


export const Subscribe = () => {

    return (
        <SubscribeContainer>
            <h2>Interested in receiving these updates via email?</h2>
            <a
                className="btn btn-primary"
                href="http://eepurl.com/hfYJET"
                role="button"
                target="_blank">Subscribe</a>
        </SubscribeContainer>
    )
}