import React from 'react';

class Games extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
           <div className='games-container'>
                <img  className='games-img' src={this.props.games} alt='games-wallpaper' />
           </div>
        )
    }
}

export default Games;