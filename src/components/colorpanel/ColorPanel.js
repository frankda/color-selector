import React, {Component} from 'react';
import './ColorPanel.scss';
import LockIcon from './LockIcon';
import {CSSTransition} from 'react-transition-group'

class ColorPanel extends Component {
  constructor () {
    super ();
    this.state = {
      isLocked: false,
      rgb: {},
      windowHeight: 0,
      windowWidth: 0,
      showNotification: false
    }
  }

  fetchWindowDimension = () => {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }

  initColor = () =>{
    this.setState({
      rgb: {
        r: Math.round(255 * Math.random()),
        g: Math.round(255 * Math.random()),
        b: Math.round(255 * Math.random())
      },
    });
  }

  componentDidMount() {
    this.initColor();
    this.fetchWindowDimension();
    window.addEventListener('resize', this.fetchWindowDimension);
    this.colorChange();
  }

  colorChange = () => {
    window.addEventListener('mousemove', event => {
      const factor = Math.atan(event.y / event.x) / (Math.PI / 2);
      if (this.state.isLocked) {
        return
      }
      this.setState({
        rgb: {
          r: Math.round(255 * event.x / this.state.windowWidth),
          g: Math.round(255 * event.y / this.state.windowHeight),
          b: Math.round(255 * factor)
        }
      });
    });
  }

  handleClick = (event) => {
    if (this.state.isLocked) {
      return
    }

    this.setState({
        isLocked: true,
        showNotification: true  // Start notification animation
      });

    setTimeout(() => {
      this.setState({showNotification: false})
    }, 2000);

    // Hightlight color when clicked
    const p = document.querySelector('.color-value');
    const selection = window.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(p);
    selection.addRange(range);
  }

  unlock = (event) => {
    this.setState({
      isLocked: false,
      showNotification: false
    })
  } 
  
  render() {
    const {rgb, isLocked} = this.state;

    // Color properties
    const backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b})`;
    const textColor = `rgba(${255 - rgb.r + 30},${255 - rgb.g + 30},${255 - rgb.b + 30})`;
    const hex = '#' + (parseInt(rgb.r)).toString(16) + (parseInt(rgb.g)).toString(16) + (parseInt(rgb.b)).toString(16)

    return (
      <main 
        style={{backgroundColor: backgroundColor}}
        onClick={this.handleClick}
      >

        <CSSTransition
          in={this.state.showNotification}
          timeout={500}
          classNames="notification"
          unmountOnExit
        >
          <div className="notification">
            Press Ctrl + C to copy color code
          </div>
        </CSSTransition>

        {isLocked
        ? <LockIcon width={20} fill={"#777"} onClick={this.unlock} />
        : null
        }

        <p style={{color: textColor}} className="color-value">
          {hex}
          {/* <br />
          rgba({rgb.r}, {rgb.g}, {rgb.b}) */}
        </p>
      </main>
    );
  }
}

export default ColorPanel