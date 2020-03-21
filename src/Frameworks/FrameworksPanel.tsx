import React, { Component } from 'react';
import { Framework } from './Framework';
import Moment from 'moment';


const tenDaysAgo = new Date();
tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

export class FrameworksPanel extends Component<any, any> {

    /**
     * Creates an instance of Frameworks.
     * @param {{}} props
     * @memberof Frameworks
     */
    constructor(props: {}) {
      super(props);
    }

    render() {
        return(
            
            <div>
                { 
                    this.props.latestFrameworks.map((framework: any, index: any) =>
                    Object.keys(framework).map((key: any) => 
            
                        (Moment(framework[key].updated_at).isAfter(Moment(tenDaysAgo)) ?
                            framework[key].name 
                            ? <Framework name={framework[key].name} release={framework[key]} key={key} /> 
                            : 'Getting framework releases for you...'
                        : '')
                    )
                    )
                }
            </div>
        )
    }
}