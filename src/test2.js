// import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import CommonFirst from './components/CommonFirst';
class SecondComp extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }

    render () {
        return <div>
            2321232323<div className='secondChid'><CommonFirst/></div>
        </div>
    }
}

ReactDOM.render(<SecondComp />, document.getElementById('app2'));