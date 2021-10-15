import React from 'react';

class Tick extends React.Component {
    render() {
        let iconStyle = { fontSize: '48px' }
        let className = 'las la-check'
        return < i className={className} style={iconStyle} ></i>
    }
}

export default Tick;