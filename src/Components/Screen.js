import React, { Component } from "react";
import NavbarClass from "./ScreenComponents/Navbar";
import Lockscreen from "./ScreenComponents/Lockscreen";
import styled from "styled-components";
import Home from "./ScreenComponents/Home";

//Why need the background image conditional? Because when there is a transition effect for the cover art images, then the wallpaper appears for a fraction of second, which doesn't look good. There fore we temporarily remove the wallpaper from DOM.

// Define a styled component for Home
const StyledHome = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  position: ${(props) => props.position};
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-size: ${(props) => props.backgroundSize};
  background-position: ${(props) => props.backgroundPosition};
  background-repeat: ${(props) => props.backgroundRepeat};
  border-bottom-left-radius: ${(props) => props.borderBottomLeftRadius};
  border-bottom-right-radius: ${(props) => props.borderBottomRightRadius};
  position: absolute;
`;

class Screen extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      currentMainMenu,
      currentSubMenu,
      navigationStack,
      wallpapers,
      currentWallpaper,
      songItems,
      currentSong,
      songNames,
      coverArts,
      currentCoverArt,
      handleSelect,
      handleMenuButton,
      games,
      artists,
      changeTheme,
      changeWallpaper,
      currentFocusMenu
    } = this.props;
    return (
      <div className="screen-container">
        <NavbarClass />
        {currentMainMenu === "lockScreen" ? (
          <Lockscreen />
        ) : (
          <div
            className="styled-home-container"
            style={{
              position: "relative",
              height: "100%",
              width: "100%",
            }}
          >
            <StyledHome
              height="91.4%"
              width="100%"
              position="relative"
              backgroundImage={wallpapers[currentWallpaper]}
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              borderBottomLeftRadius="0.5rem"
              borderBottomRightRadius="0.5rem"
              currentSubMenu={currentSubMenu}
            >
              {/* Pass other necessary props to Home component */}
              <Home
                navigationStack={navigationStack}
                wallpapers={wallpapers}
                currentWallpaper={currentWallpaper}
                songItems={songItems}
                currentSong={currentSong}
                songNames={songNames}
                coverArts={coverArts}
                currentCoverArt={currentCoverArt}
                handleSelect={handleSelect}
                handleMenuButton={handleMenuButton}
                currentSubMenu={currentSubMenu}
                currentMainMenu={currentMainMenu}
                games={games}
                artists={artists}
                changeTheme={changeTheme}
                changeWallpaper={changeWallpaper}
                currentFocusMenu={currentFocusMenu}
              />
            </StyledHome>
          </div>
        )}
      </div>
    );
  }
}

export default Screen;
