import React from 'react';
import styled from "styled-components"
import theme from '../../theme/theme'

const AboutContainer = styled.div`
    margin: 220px 0;
`;

export const About = () => {
    return (
        <AboutContainer id="About">
            <h1>About</h1>
            <p>Ever felt that <strong>updates were hard to keep track</strong> of especially when working with multiple tools? Navigating to each and every dependency's website to find out that your error is relating to an update is a pain.</p>
            <p>Are you a <strong>technical writer</strong> who enjoys staying up to date with the latest releases? Finding content to write about is <strong>time consuming</strong> especially when all of the info is spread out throughout multiple webpages.</p>
            <p>Dever was created by a developer for <strong>developers</strong> and <strong>tech writers</strong> who simply want all of this information in one location. A quick and easy one stop shop to verify versions and stay up to date!</p>
        </AboutContainer>
    )
}

