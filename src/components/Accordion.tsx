import React from 'react';
import styled from "styled-components"
import theme from '../theme/theme'

const ReactMarkdown = require('react-markdown')

// interface IDevTool {
//     name: string
// }
const AccordionContainer = styled.div`
    margin: 20px;

`;


const Card = styled.div`

    overflow: inherit !important;
    border: 0 !important;

    .card-header {
        background: transparent;
        border: 1px solid ${theme.lightGrey} !important;
        border-bottom: 1px solid ${theme.lightGrey} !important;
    }

    .item-data {
        color: ${theme.black};
    }

    button:focus {
        box-shadow: none! important;
    }
    

;`

export const Accordion = (props: any) => (
    
    <>
        <AccordionContainer className="accordion" id={`accordion${props.devtool.name}`}>
            <Card className="card">
                <div className="card-header" id={`heading${props.devtool.name}`}>
                <h2 className="mb-0">
                    <button className="btn" type="button" data-toggle="collapse" data-target={`#collapse${props.devtool.name}`} aria-expanded="true" aria-controls={`collapse${props.devtool.name}`}>
                    <div className="item-data">
                    
                        <h5>{props.devtool.name} - NEW {props.devtool.semVerDefinition} {props.devtool.version}</h5>
                    </div>
                    </button>
                </h2>
                </div>

                <div id={`collapse${props.devtool.name}`} className="collapse" aria-labelledby={`heading${props.devtool.name}`} data-parent={`#accordion${props.devtool.name}`}>
                <div className="card-body">
                    <ReactMarkdown source={props.devtool.versionDescription} />
                </div>
                </div>
            </Card>
        </AccordionContainer>
    </>
)
