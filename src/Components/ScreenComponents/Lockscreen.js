import React from 'react';
import lockscreen from '../../static/images/lockscreen.png';

class Lockscreen extends React.Component{
    constructor(){
        super();

    }

    render(){
        return(
           <div className='lockscreen-container'>
            
            <img className='lockscreen' src={lockscreen} alt='lockscreen' />
            <span className='lockscreen-msg'>Please press center button to unlock.</span>
           </div>
        )
    }
}
export default Lockscreen;