import React from 'react';

class NavbarClass extends React.Component{
    constructor(){
        super();
        this.state = {
            time : this.getCurrentTime()
        }
    }
    
    //Function to get the current time.
    getCurrentTime(){
        const currDate = new Date();
        const time = currDate.toLocaleTimeString().indexOf(':')<2?"0"+currDate.toLocaleTimeString():currDate.toLocaleTimeString();
        return time;
    }

    componentDidMount(){    
        //Interval to setState each second for the timer
        setInterval(()=>{
            this.setState({time:this.getCurrentTime() });
        }, 1000);
    }

    render(){
        const {time} = this.state;
        return(
            <div className='navbar-container'>
                <div className='title'>iPod</div>
                <div className='time'>{time}</div>
                <div className='battery'><i class="fa-solid fa-battery-full"></i></div>
            </div>
        )
    }
}

export default NavbarClass;