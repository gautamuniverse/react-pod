import { Component } from "react";
import Wheel from "./Components/ScreenComponents/Wheel";
import Screen from "./Components/Screen";

// ------Importing Songs----
import euphoria from "./static/songs/euphoria.mp3";
import diamondsnroses from "./static/songs/diamondsnroses.mp3";
import fainted from "./static/songs/fainted.mp3";
import interlinked from "./static/songs/interlinked.mp3";
import liveanotherday from "./static/songs/liveanotherday.mp3";
import metamorphosistwo from "./static/songs/metamorphosistwo.mp3";
import simpsonwave from "./static/songs/simpsonwave.mp3";
import wedonttalkanymore from "./static/songs/wedonttalkanymore.mp3";

// -----Importing cover art for songs-----
import euphoriaImg from "./static/images/coverart/euphoria.jpg";
import diamondsnrosesImg from "./static/images/coverart/diamondsnroses.jpg";
import faintedImg from "./static/images/coverart/fainted.jpg";
import interlinkedImg from "./static/images/coverart/interlinked.jpg";
import liveanotherdayImg from "./static/images/coverart/liveanotherday.jpg";
import metamorphosistwoImg from "./static/images/coverart/metamorphosistwo.jpg";
import simpsonwaveImg from "./static/images/coverart/simpsonwave.jpg";
import wedonttalkanymoreImg from "./static/images/coverart/wedonttalkanymore.jpg";

// -----Importing Wallpapers------
import dallemoon from "./static/images/dallemoon.png";
import futuristic from "./static/images/futuristic.png";
import gta5 from "./static/images/gta5.jpg";
import scenery from "./static/images/scenery.png";

// -------Importing Games Wallpaper--------
import games from "./static/images/games.jpg";

// -----------Importing Artists------------
import charlieputh from "./static/images/artists/charlieputh.jpg";
import interworld from "./static/images/artists/interworld.jpg";
import kordhell from "./static/images/artists/kordhell.jpg";
import voj from "./static/images/artists/voj.jpg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      homeMenuItems: ["nowplaying", "music", "coverart", "games", "settings"],
      musicItems: ["allsongs", "artists", "albums"],
      settingsItems: ["changewallpaper", "changeorientation", "changetheme"],
      currentFocusMenu: "", //this will be highlighted menu based on the wheel rotation, we are going to use this variable to handle the highlighting of the menu items.
      currentMainMenu: "lockScreen",
      currentSubMenu: "",
      navigationStack: [],
      wallpapers: [dallemoon, futuristic, gta5, scenery],
      currentWallpaper: 0,
      songItems: [
        euphoria,
        diamondsnroses,
        fainted,
        interlinked,
        liveanotherday,
        metamorphosistwo,
        simpsonwave,
        wedonttalkanymore,
      ],
      currentSong: 0,
      songNames: [
        "Euphoria",
        "Diamonds n roses",
        "Fainted",
        "Interlinked",
        "Live Another Day",
        "Metamorphosis 2",
        "Simpsonwave",
        "We Dont't Talk Anymore",
      ],
      coverArts: [
        euphoriaImg,
        diamondsnrosesImg,
        faintedImg,
        interlinkedImg,
        liveanotherdayImg,
        metamorphosistwoImg,
        simpsonwaveImg,
        wedonttalkanymoreImg,
      ],
      currentCoverArt: 0,
      games: games,
      artists: [charlieputh, interworld, kordhell, voj],
      currentArtist: 0,
    };

    // Bind the functions here
  this.changeCurrentFocusMenu = this.changeCurrentFocusMenu.bind(this);
  }
  //handle the select button
  handleSelect = (menuOption) => {

    let newNavigationStack = this.state.navigationStack;
    //If currently we are on lock screen then we want to unlock using the select button
    if (this.state.currentMainMenu === "lockScreen") {
      newNavigationStack.push("home");
      this.setState({
        currentMainMenu: "home",
        navigationStack: newNavigationStack,
      });
    }
    //whatever the menuOption we will add that into the stack
    if (menuOption) {
      
      //Explicitly handle the settings options
      if(this.state.navigationStack[this.state.navigationStack.length - 1] === 'settings')
      {
        if(this.state.currentFocusMenu === 'changewallpaper')
        return this.changeWallpaper();
        else if(this.state.currentFocusMenu === 'changetheme')
        return this.changeTheme();
        else return this.changeOrientation();
      }
      newNavigationStack.push(menuOption);
      this.setState({
        currentSubMenu: menuOption,
        navigationStack: newNavigationStack,
      });
    }
  };

  //Handle the menu button function, it is used for going back
  handleMenuButton = () => {
    //we will go back with the menu button
    let newNavigationStack = this.state.navigationStack;
    //if it's not empty and length is greater than 1 that means we are  in some where else so just pop one item from stack to update the submenu
    if (newNavigationStack.length > 1) {
      newNavigationStack.pop();
      this.setState({
        currentSubMenu: newNavigationStack[newNavigationStack.length - 1],
        navigationStack: newNavigationStack,
      });
    } else {
      //if the length is 1 that means we are on home screen, therefore we will go to the lock screen now
      //and now we will change the mainMenu and make the subMenu empty
      if (newNavigationStack.length === 1) {
        newNavigationStack.pop();
        this.setState({
          currentMainMenu: "lockScreen",
          currentSubMenu: "",
          navigationStack: newNavigationStack,
        });
      } else {
        //the navigation stack is empty and we are on the lock screen therefore we do nothing.
      }
    }
  };

  //Next/Forward button handler
  handleNextButton = () => {
    //the next button will only work in NowPlaying and All Songs Screen
    if (
      this.state.currentSubMenu === "nowplaying" ||
      this.state.currentSubMenu === "allsongs"
    ) {
      //in this case the forward button will set the currentSong index to next index
      this.setState((previous) => ({
        currentSong: (previous.currentSong + 1) % this.state.songItems.length,
      }));
    }
  };

  //Previous button handler
  handlePreviousButton = () => {
    //the previous button will only work in NowPlaying and All Songs Screen
    if (
      this.state.currentSubMenu === "nowplaying" ||
      this.state.currentSubMenu === "allsongs"
    ) {
      //in this case the forward button will set the currentSong index to next index
      this.setState((previous) => ({
        currentSong:
          previous.currentSong - 1 < 0
            ? this.state.songItems.length - 1
            : previous.currentSong - 1,
      }));
    }
  };

  //Change theme function, handled using the Change Theme option in the settings menu
  changeTheme = () => {
    if (
      document
        .getElementById("componentsContainer")
        .classList.contains("components-container")
    ) {
      document
        .getElementById("componentsContainer")
        .classList.replace(
          "components-container",
          "components-container-theme"
        );
      document.getElementsByTagName("body")[0].style.backgroundColor = "black";
    } else {
      document
        .getElementById("componentsContainer")
        .classList.replace(
          "components-container-theme",
          "components-container"
        );
      document.getElementsByTagName("body")[0].style.backgroundColor = "white";
    }
  };
  //Function to change the current wallpaper being displayed on the home page
  changeWallpaper = () => {
    this.setState((previous) => ({
      currentWallpaper:
        (previous.currentWallpaper + 1) % this.state.wallpapers.length,
    }));
  };

  //Function to change the orientation
  changeOrientation = ()=>{
    alert('This feature will be released soon!');
}

  // Function to change the currentFocusMenu
  changeCurrentFocusMenu = (newMenu) => {
    this.setState({currentFocusMenu: newMenu})
  }

  render() {
    return (
      <div className="components-container" id="componentsContainer">
        <Screen
          currentMainMenu={this.state.currentMainMenu}
          currentSubMenu={this.state.currentSubMenu}
          navigationStack={this.state.navigationStack}
          wallpapers={this.state.wallpapers}
          currentWallpaper={this.state.currentWallpaper}
          songItems={this.state.songItems}
          currentSong={this.state.currentSong}
          songNames={this.state.songNames}
          coverArts={this.state.coverArts}
          currentCoverArt={this.state.currentCoverArt}
          handleSelect={this.handleSelect}
          handleMenuButton={this.handleMenuButton}
          games={this.state.games}
          artists={this.state.artists}
          changeTheme={this.changeTheme}
          changeWallpaper={this.changeWallpaper}
          currentFocusMenu={this.state.currentFocusMenu}
        />
        <Wheel
          handleSelect={this.handleSelect}
          handleMenuButton={this.handleMenuButton}
          handleNextButton={this.handleNextButton}
          handlePreviousButton={this.handlePreviousButton}
          homeMenuItems={this.state.homeMenuItems}
          musicItems={this.state.musicItems}
          settingsItems={this.state.settingsItems}
          currentMainMenu={this.state.currentMainMenu}
          currentSubMenu={this.state.currentSubMenu}
          changeCurrentFocusMenu={this.changeCurrentFocusMenu}
          navigationStack={this.state.navigationStack}
          currentFocusMenu={this.state.currentFocusMenu}
        />
      </div>
    );
  }
}

export default App