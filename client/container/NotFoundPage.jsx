import React from 'react';
import UI from '../model/dao/UI'
import AutoBind from 'react-autobind'
import NotFoundView from '../component/base/NotFoundView';

export default class RecordCheckPage extends React.Component {
    constructor(props) {
        super(props);
        AutoBind(this);
    }
    componentWillMount() {
        UI.setTitle('Page Not Found');
    }

    
    render() {
        return (
            <div className="app-page">
                <NotFoundView/>
            </div>
        );
    }
}