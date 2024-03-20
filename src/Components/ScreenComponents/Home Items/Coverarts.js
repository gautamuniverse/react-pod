import React from "react";

class CoverArts extends React.Component {
  constructor() {
    super();
    this.state = {
      carouselInterval: null,
      currentIndex: 0
    };
  }

  componentDidMount() {
    const { images } = this.props;
    //After every two seconds we change the current index, essentially marking the index image visible
    const interval = setInterval(() => {
      this.setState(prevState => ({
        currentIndex: (prevState.currentIndex + 1) % images.length
      }));
    }, 3000);
    
    //Setting the current interval
    this.setState({
      carouselInterval: interval
    });
    document.getElementsByClassName('styled-home-container')[0].classList.add('hidden');
  }

  componentDidUpdate(){
  }
  componentWillUnmount() {
    // Clear the ongoing interval before the component unmounts
    clearInterval(this.state.carouselInterval);
    document.getElementsByClassName('styled-home-container')[0].classList.remove('hidden');
    
  }

  render() {
    const { images } = this.props;
    const { currentIndex } = this.state;

    return (
      <div className="coverart-container">
        {images.map((item, index) => (
          <img
            key={index}
            className={`coverart-img ${index === currentIndex ? 'show' : ''}`}
            src={item}
            alt="cover-art"
          />
        ))}
      </div>
    );
  }
}

export default CoverArts;
