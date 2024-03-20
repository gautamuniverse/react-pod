import React from "react";
import AllSongs from "../Music Items/Allsongs";
import Albums from "../Music Items/Albums";
import Artists from "../Music Items/Artists";

class Music extends React.Component {
  constructor() {
    super();
    this.lastNavigationStackItem = null;
    this.prevProps = null;
  }

renderAllSongs(){
    return <AllSongs prop={this.props.prop} />
}

renderAlbums(){
  return <Albums images={this.props.prop.coverArts} />
}

renderArtists(){
  return <Artists images={this.props.prop.artists} />
}


renderMusicMenu(){
  return (
    <ul className="homeMenuItemsUL" id="musicMenuItemsUL">
    {/* Lesson: Dont pass prop function directly to onClick, because react
    doesn't allow state change directly while rendering transition. the function should
    be called only after the rendering is finished. */}
    <li id="allsongs" onClick={() => this.props.prop.handleSelect('allsongs')}>All Songs</li>
    <li id="artists" onClick={() => this.props.prop.handleSelect('artists')}>Artists</li>
    <li id="albums" onClick={() => this.props.prop.handleSelect('albums')}>Albums</li>
  </ul>
  )
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

  //Write the functionality to highlight the currently focused menu item
  const focusedMenu = this.props.prop.currentFocusMenu
    ? this.props.prop.currentFocusMenu
    : this.props.prop.navigationStack[this.props.prop.navigationStack.length - 1];

  //get the element which is focused
  if (focusedMenu !== "home") {
    let currentElement = document.getElementById(focusedMenu);
    currentElement?.classList.add("focused-menu");
  }
}

handleRenders() {
  const {
    navigationStack,
  } = this.getProps();
  this.updateLastNavigationStackItem(navigationStack);
  if (navigationStack[navigationStack.length - 1] === "music") {
    return this.renderMusicMenu();
  } else if (navigationStack[navigationStack.length - 1] === "allsongs") {
    return this.renderAllSongs();
  } else if (navigationStack[navigationStack.length - 1] === "artists") {
    return this.renderArtists();
  } else if (navigationStack[navigationStack.length - 1] === "albums") {
    return this.renderAlbums();
  }
}

updateLastNavigationStackItem(navigationStack) {
  this.lastNavigationStackItem = navigationStack[navigationStack.length - 1];
}

  render() {
    const { navigationStack } = this.props.prop;
    {
      if (
        navigationStack[navigationStack.length - 1] !==
          this.lastNavigationStackItem ||
        this.prevProps.prop !== this.props.prop
      ) {
        return (
          <div className="handle-renders-container" >{this.handleRenders()}</div>
        );
      }
    }
  }
}

export default Music;
