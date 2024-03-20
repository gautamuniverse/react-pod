import React from 'react';

class Settings extends React.Component{
    constructor(){
        super();
        this.lastNavigationStackItem = null;
        this.prevProps = null;
    }

    changeOrientation(){
        alert('This feature will be released soon!');
    }

    getProps() {
        return this.props.prop;
      }

    componentDidMount() {
        this.prevProps = this.getProps();
      }
      
      componentDidUpdate(prevProps) {
      
        if (this.prevProps.currentFocusMenu !== this.props.prop.currentFocusMenu) {
          const prevElement = document.getElementById(prevProps.currentFocusMenu);
          //Unfocus the previously focused menu by removing the css class
          if (prevElement) {
            prevElement.classList.remove("focused-menu");
          }
        }
    }
    render(){
        return(
           <div className='settings-container'>
                <ul className='homeMenuItemsUL' id='settings-ul'>
                    <li id='changewallpaper' onClick={() => this.props.changeWallpaper()}>
                        Change Wallpaper
                    </li>
                    <li id='changeorientation' onClick={()=> this.changeOrientation()}>
                        Change Orientation
                    </li>
                    <li id='changetheme' onClick={() => this.props.changeTheme()}>
                        Change Theme
                    </li>
                </ul>
           </div>
        )
    }
}

export default Settings;