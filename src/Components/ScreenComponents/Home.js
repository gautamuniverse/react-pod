import React from "react";
import Nowplaying from "./Home Items/Nowplaying";
import Music from "./Home Items/Music";
import CoverArts from "./Home Items/Coverarts";
import Games from "./Home Items/Games";
import Settings from "./Home Items/Settings";

class Home extends React.Component {
  constructor() {
    super();
    this.lastNavigationStackItem = null;
    this.prevProps = null;
  }

  componentDidMount() {
    this.prevProps = this.props;
  }

  getProps() {
    return this.props;
  }

  renderNowPlaying() {
    return <Nowplaying prop={this.props} />;
  }

  renderMusic() {
    return <Music prop={this.props} />;
  }

  renderCoverArt() {
    return <CoverArts images={this.props.coverArts} />;
  }

  renderSettings() {
    return (
      <Settings
        changeTheme={this.props.changeTheme}
        changeWallpaper={this.props.changeWallpaper}
        prop={this.props}
      />
    );
  }
  renderGames() {
    return <Games games={this.props.games} />;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentFocusMenu !== this.props.currentFocusMenu) {
      const prevElement = document.getElementById(prevProps.currentFocusMenu);
      //Unfocus the previously focused menu by removing the css class
      if (prevElement) {
        prevElement.classList.remove("focused-menu");
      }
    }

    //Write the functionality to highlight the currently focused menu item
    const focusedMenu = this.props.currentFocusMenu
      ? this.props.currentFocusMenu
      : this.props.navigationStack[this.props.navigationStack.length - 1];

    //get the element which is focused
    if (focusedMenu !== "home") {
      let currentElement = document.getElementById(focusedMenu);
      currentElement?.classList.add("focused-menu");
    }
  }

  

  componentWillUnmount(prevProps) {}

  renderHomeMenu() {
    return (
      <ul className="homeMenuItemsUL" id="homeMenuItemsUL">
        {/* Lesson: Dont pass prop function directly to onClick, because react
        doesn't allow state change directly while rendering transition. the function should
        be called only after the rendering is finished. */}
        <li
          id="nowplaying"
          onClick={() => this.props.handleSelect("nowplaying")}
        >
          Now Playing
        </li>
        <li id="music" onClick={() => this.props.handleSelect("music")}>
          Music
        </li>
        <li id="coverart" onClick={() => this.props.handleSelect("coverart")}>
          Cover Art
        </li>
        <li id="games" onClick={() => this.props.handleSelect("games")}>
          Games
        </li>
        <li id="settings" onClick={() => this.props.handleSelect("settings")}>
          Settings
        </li>
      </ul>
    );
  }

  handleRenders() {
    const {
      navigationStack,
    } = this.getProps();
    this.updateLastNavigationStackItem(navigationStack);
    if (navigationStack[navigationStack.length - 1] === "home") {
      return this.renderHomeMenu();
    } else if (navigationStack[navigationStack.length - 1] === "nowplaying") {
      return this.renderNowPlaying();
    } else if (
      navigationStack[navigationStack.length - 1] === "music" ||
      navigationStack[navigationStack.length - 1] === "allsongs" ||
      navigationStack[navigationStack.length - 1] === "albums" ||
      navigationStack[navigationStack.length - 1] === "artists"
    ) {
      return this.renderMusic();
    } else if (navigationStack[navigationStack.length - 1] === "games") {
      return this.renderGames();
    } else if (navigationStack[navigationStack.length - 1] === "coverart") {
      return this.renderCoverArt();
    } else if (navigationStack[navigationStack.length - 1] === "settings") {
      return this.renderSettings();
    }
  }

  updateLastNavigationStackItem(navigationStack) {
    this.lastNavigationStackItem = navigationStack[navigationStack.length - 1];
  }

  render() {
    const { navigationStack } = this.props;
    {
      if (
        navigationStack[navigationStack.length - 1] !==
          this.lastNavigationStackItem ||
        this.prevProps !== this.props
      ) {
        return (
          <div className="handle-renders-container">{this.handleRenders()}</div>
        );
      }
    }
  }
}

export default Home;
