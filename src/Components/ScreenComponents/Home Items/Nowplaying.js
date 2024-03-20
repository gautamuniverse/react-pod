import React from "react";
import styled from "styled-components";

class Nowplaying extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef(); // Create a ref for the audio element
    this.state = {
      currentTime: 0,
      currentlyPlaying: true, //initially the song is playing automatically, this will help handle the play-pause button functionality
    };
  }

  componentDidMount() {
    // Add event listener for time update
    this.audioRef.current.addEventListener("timeupdate", this.handleTimeUpdate);
    // Add event listener for when the song ends
    this.audioRef.current.addEventListener("ended", this.handleSongEnd);

    // Store the play-pause button element in a class property
    this.playPauseButton = document.getElementById("playpause");

    // Add event listener to the play-pause button
    this.playPauseButton.addEventListener("click", this.handlePlayPause);
    this.playPauseButton.addEventListener("touchstart", this.handlePlayPause);

}

  handlePlayPause = () => {
    if (this.state.currentlyPlaying) {
        this.audioRef.current.pause();
    } else {
        this.audioRef.current.play();
    }

    this.setState((prev) => ({
        currentlyPlaying: !prev.currentlyPlaying,
    }));
};

  componentWillUnmount() {
    // Remove event listeners when component unmounts
    this.audioRef.current.removeEventListener(
        "timeupdate",
        this.handleTimeUpdate
    );
    this.audioRef.current.removeEventListener(
        "ended",
        this.handleSongEnd
    );
    // Remove event listener from the play-pause button
    this.playPauseButton.removeEventListener("click", this.handlePlayPause);
    this.playPauseButton.removeEventListener("touchstart", this.handlePlayPause);
}

  handleTimeUpdate = () => {
    // Update currentTime in state when time updates
    this.setState({ currentTime: this.audioRef.current.currentTime });
  };

  handleSeek = (e) => {
    // Seek to the specified time when user interacts with seek bar
    const seekTime = e.target.value;
    this.setState({ currentTime: seekTime });
    this.audioRef.current.currentTime = seekTime;
  };

  handleSongEnd = () => {
    // Reset the current time of the audio to replay the song
    this.setState({ currentTime: 0 });
    this.audioRef.current.currentTime = 0;
    this.audioRef.current.play(); // Start playing the song again
  };

  render() {
    const { prop } = this.props;
    const { currentTime } = this.state;
    return (
      <div className="now-playing-container">
        <NowPlaying coverarts={prop.coverArts} currentsong={prop.currentSong}>
          <input
            className="nowplaying-seek"
            type="range"
            value={currentTime}
            max={this.audioRef.current ? this.audioRef.current.duration : 0}
            onChange={this.handleSeek}
          />
          <audio
            ref={this.audioRef}
            src={prop.songItems[prop.currentSong]}
            autoPlay
          >
            Your browser does not support the audio element.
          </audio>
        </NowPlaying>
        <p className="nowplaying-headline">
          {prop.songNames[prop.currentSong]}
        </p>
      </div>
    );
  }
}

// ------Styles for the Background image-----
const NowPlaying = styled.div`
  width: 100%;
  height: 90%;
  background-image: url(${(props) => props.coverarts[props.currentsong]});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default Nowplaying;
