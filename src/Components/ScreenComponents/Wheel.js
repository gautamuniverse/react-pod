import React, { Component } from "react";
import ZingTouch from "zingtouch";

class Wheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touchStartX: null,
      touchStartY: null,
    };
  }

  componentDidMount() {
    const wheel = document.getElementById("wheel");
    const activeRegion = new ZingTouch.Region(wheel);
    activeRegion.bind(wheel, "rotate", this.handleRotate);
  }

  handleRotate = (e) => {
    const {changeCurrentFocusMenu, navigationStack } = this.props;
    if (navigationStack[navigationStack.length-1] !== 'lockScreen') {
      //rotation in the home menu
      if(navigationStack[navigationStack.length-1] === 'home')
      { const currentSubMenuItems = this.getCurrentSubMenuItems();
        const angle = e.detail.angle;
					if (angle >= 0 && angle <= 72) {
						changeCurrentFocusMenu(currentSubMenuItems[0]);
					} else if (angle > 72 && angle <= 144) {
						changeCurrentFocusMenu(currentSubMenuItems[4]);
					} else if (angle > 144 && angle <= 216) {
						changeCurrentFocusMenu(currentSubMenuItems[3]);
					} else if (angle > 216 && angle <= 288) {
            changeCurrentFocusMenu(currentSubMenuItems[2]);
					}else if(angle > 288 && angle <= 360) 
          {changeCurrentFocusMenu(currentSubMenuItems[1]);}
          else if (angle >= -72 && angle < 0) {
						changeCurrentFocusMenu(currentSubMenuItems[4]);
					} else if (angle >= -144 && angle < -72) {
						changeCurrentFocusMenu(currentSubMenuItems[3]);
					} else if (angle >=-216  && angle < -144) {
						changeCurrentFocusMenu(currentSubMenuItems[2]);
					} else if (angle >= -288 && angle < -216) {
            changeCurrentFocusMenu(currentSubMenuItems[1]);
					}else if(angle >= -360 && angle < 288) 
          {changeCurrentFocusMenu(currentSubMenuItems[0]);}
          else{}
      }

      //Rotation for Music Menu
      if(navigationStack[navigationStack.length-1] === 'music')
      {
        const currentSubMenuItems = this.getCurrentSubMenuItems();
        const angle = e.detail.angle;
        if(angle >= 0 && angle <= 120)
        {
          changeCurrentFocusMenu(currentSubMenuItems[0]);
        }
        else if(angle > 120 && angle <= 240)
        {
          changeCurrentFocusMenu(currentSubMenuItems[2]);
        }
        else if(angle > 240 && angle <= 360)
        {
          changeCurrentFocusMenu(currentSubMenuItems[1]);
        }
        else if(angle >= -120 && angle < 0)
        {
          changeCurrentFocusMenu(currentSubMenuItems[2]);
        }
        else if(angle >= -240 && angle < -120)
        {
          changeCurrentFocusMenu(currentSubMenuItems[1]);
        }
        else if(angle >= -360 && angle < -240)
        {
          changeCurrentFocusMenu(currentSubMenuItems[0]);
        }
        else{}
      }

      //Rotation for settings menu
      //Rotation for Music Menu
      if(navigationStack[navigationStack.length-1] === 'settings')
      {
        const currentSubMenuItems = this.getCurrentSubMenuItems();
        const angle = e.detail.angle;
        if(angle >= 0 && angle <= 120)
        {
          changeCurrentFocusMenu(currentSubMenuItems[0]);
        }
        else if(angle > 120 && angle <= 240)
        {
          changeCurrentFocusMenu(currentSubMenuItems[2]);
        }
        else if(angle > 240 && angle <= 360)
        {
          changeCurrentFocusMenu(currentSubMenuItems[1]);
        }
        else if(angle >= -120 && angle < 0)
        {
          changeCurrentFocusMenu(currentSubMenuItems[2]);
        }
        else if(angle >= -240 && angle < -120)
        {
          changeCurrentFocusMenu(currentSubMenuItems[1]);
        }
        else if(angle >= -360 && angle < -240)
        {
          changeCurrentFocusMenu(currentSubMenuItems[0]);
        }
        else{}
      }
     
    }
  };
  
  
  getCurrentSubMenuItems = () => {
    const { homeMenuItems, musicItems, settingsItems, navigationStack } = this.props;
    switch (navigationStack[navigationStack.length - 1]) {
      case "home":
        return homeMenuItems;
      case "music":
        return musicItems;
      case "settings":
        return settingsItems;
      default:
        return [];
    }
  };

  handleMenuButtonTouchStart = (event) => {
    const touchStartX = event.touches[0].clientX;
    const touchStartY = event.touches[0].clientY;

    this.setState({
      touchStartX,
      touchStartY,
    });
  };

  handleMenuButtonTouchEnd = () => {
    const { touchStartX, touchStartY } = this.state;
    const touchEndX = this.touchEndX;
    const touchEndY = this.touchEndY;

    if (
      Math.abs(touchEndX - touchStartX) < 10 &&
      Math.abs(touchEndY - touchStartY) < 10
    ) {
      // Trigger the menu button action
      this.props.handleMenuButton();
    }

    // Reset touch-related state
    this.setState({
      touchStartX: null,
      touchStartY: null,
    });
  };

  handleTouchMove = (event) => {
    this.touchEndX = event.changedTouches[0].clientX;
    this.touchEndY = event.changedTouches[0].clientY;
  };
  render() {
    return (
      <div className="wheel-container" id="wheelcontainer">
        <div className="wheel" id="wheel">
          <div className="menu" id="menu" onClick={this.props.handleMenuButton}
           onTouchStart={this.handleMenuButtonTouchStart}
           onTouchEnd={this.handleMenuButtonTouchEnd}
           onTouchMove={this.handleTouchMove}
          >
            Menu
          </div>
          <div className="next" id="next" onClick={this.props.handleNextButton} onTouchStart={this.props.handleNextButton}>
            <i className="fa-solid fa-forward-fast"></i>
          </div>
          <div className="previous" id="previous" onClick={this.props.handlePreviousButton} onTouchStart={this.props.handlePreviousButton}>
            <i className="fa-solid fa-backward-fast"></i>
          </div>
          <div className="play-pause" id="playpause">
            <i className="fa-solid fa-play"></i>
            &nbsp;
            <i className="fa-solid fa-pause"></i>
          </div>
          <div
            className="select"
            id="select"
            onClick={() => this.props.handleSelect(this.props.navigationStack.length>0?this.props.currentFocusMenu:'')}
            onTouchStart={() => this.props.handleSelect(this.props.navigationStack.length>0?this.props.currentFocusMenu:'')}
          ></div>
        </div>
      </div>
    );
  }
}

export default Wheel;
