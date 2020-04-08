import React, { useRef, useEffect, useState } from 'react';
import styled from "styled-components"
import theme from '../theme/theme'
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

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

    button {
        width: 100%;
    }

    button:focus {
        box-shadow: none! important;
    }

    .card-body {
        font-size: 15px;
        padding: 45px;
        border: 1px solid ${theme.lightGrey} !important;
    }

    .MAJOR {
        color: ${theme.brightRed};
    }

    .MINOR {
        color: ${theme.amber};
    }

    .PATCH {
        color: ${theme.green};
    }
    
    h5 {
        display: flex;
        justify-content: space-between;
    }

;`

export function Accordion(props: any) {
    
    const [accordionCaret, setAccordionCaret] = useState(false);
    const accordionRef = useRef<any>();
   

    /**
     *
     *
     */
    useEffect(() => {
        
        if(accordionRef.current.className.includes("show")) {
            setAccordionCaret(true);
        }
        
    },
        [accordionRef]
    )

    return (
        <>
            <AccordionContainer className="accordion" id={`accordion${props.devtool.name}`}>
                <Card className="card">
                    <div className="card-header" id={`heading${props.devtool.name}`}>
                    <h2 className="mb-0">
                        <button onClick={() => setAccordionCaret(!accordionCaret)} className="btn" type="button" data-toggle="collapse" data-target={`#collapse${props.devtool.name}`} aria-expanded="true" aria-controls={`collapse${props.devtool.name}`}>
                        <div className="item-data">
                            <h5>
                                <div>
                                    {props.devtool.name} - NEW <span className={props.devtool.semVerDefinition}>{props.devtool.semVerDefinition}</span> {props.devtool.version}
                                </div>
                                <div>
                                    {
                                        accordionCaret ? <IoIosArrowUp /> : <IoIosArrowDown/>
                                    }
                                </div>           
                            </h5>
                        </div>
                        </button>
                    </h2>
                    </div>

                    <div ref={accordionRef} id={`collapse${props.devtool.name}`} className="collapse" aria-labelledby={`heading${props.devtool.name}`} data-parent={`#accordion${props.devtool.name}`}>
                    <div className="card-body">
                        <ReactMarkdown source={props.devtool.versionDescription} />
                    </div>
                    </div>
                </Card>
            </AccordionContainer>
        </>
    )
}
