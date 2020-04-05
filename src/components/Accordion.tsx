import React from 'react';
import styled from "styled-components"
import theme from '../theme/theme'

// interface IDevTool {
//     name: string
// }

const Card = styled.div`

    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: none !important;
    

    .card-header {
        background: transparent;
        // border-bottom: none !important;
    }

    .item-data {
        color: ${theme.black};
    }
    

;`

export const Accordion = (props: any) => (
        
    <>
        <div className="accordion" id={`accordion${props.devtool.name}`}>
            <Card className="card">
                <div className="card-header" id={`heading${props.devtool.name}`}>
                <h2 className="mb-0">
                    <button className="btn" type="button" data-toggle="collapse" data-target={`#collapse${props.devtool.name}`} aria-expanded="true" aria-controls={`collapse${props.devtool.name}`}>
                    <div className="item-data">
                        <h5>{props.devtool.name} - NEW MAJOR/MINOR/PATCH {props.devtool.version}</h5>
                    </div>
                    </button>
                </h2>
                </div>

                <div id={`collapse${props.devtool.name}`} className="collapse show" aria-labelledby={`heading${props.devtool.name}`} data-parent={`#accordion${props.devtool.name}`}>
                <div className="card-body">
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </div>
                </div>
            </Card>
        </div>
    </>
)
