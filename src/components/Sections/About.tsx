import React from 'react';
import styled from "styled-components"
import theme from '../../theme/theme'

const AboutContainer = styled.div`
    margin-top: 220px;
`;

export const About = () => {
    return (
        <AboutContainer>
            <h1>About</h1>
            <p>Ever felt that updates were hard to keep track of especially when working with multiple tools? Navigating to each and every dependency's website to find out that your error is relating to an update is a pain.</p>
            <p>Release Repo was created for developers by a developer who simply wanted all of this information in one location. A quick and easy one stop shop for developers to verify the versions all of their project's languages.</p>
        </AboutContainer>
    )
}

