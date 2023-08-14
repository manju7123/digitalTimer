import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerStart: false,
    timeInSeconds: 0,
    timeInMinutes: 25,
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes + 1,
    }))
  }

  onDecrement = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
    }
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      isTimerStart: false,
      timeInSeconds: 0,
      timeInMinutes: 25,
    })
  }

  onStart = () => {
    const {isTimerStart, timeInMinutes, timeInSeconds} = this.state
    const resTime = timeInMinutes * 60 === timeInSeconds
    if (resTime) {
      this.setState({timeInSeconds: 0})
    }

    if (!isTimerStart) {
      this.timerId = setInterval(this.timer, 1000)
      this.setState(prevState => ({
        isTimerStart: !prevState.isTimerStart,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState(prevState => ({
        isTimerStart: !prevState.isTimerStart,
      }))
    }
  }

  timer = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const resTime = timeInMinutes * 60 === timeInSeconds
    if (resTime) {
      clearInterval(this.timerId)
      this.setState({isTimerStart: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  getTime = () => {
    const {timeInSeconds, timeInMinutes} = this.state
    const getRemainingSeconds = timeInMinutes * 60 - timeInSeconds
    const remMinutes = Math.floor(getRemainingSeconds / 60)
    const remSeconds = Math.floor(getRemainingSeconds % 60)

    const reqMinutes = remMinutes > 9 ? remMinutes : `0${remMinutes}`
    const reqSeconds = remSeconds > 9 ? remSeconds : `0${remSeconds}`

    return `${reqMinutes}:${reqSeconds}`
  }

  render() {
    const {isTimerStart, timeInMinutes} = this.state
    const runningOrPaused = isTimerStart ? 'Running' : 'Paused'
    const startOrPaused = isTimerStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altName = isTimerStart ? 'pause icon' : 'play icon'
    const resetImage =
      'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'

    const startOrPauseElement = isTimerStart ? 'Pause' : 'Start'
    return (
      <div className="bg-container">
        <h1 className="heading"> Digital Timer </h1>
        <div className="card">
          <div className="image-card">
            <div className="image-inner-card">
              <h1 className="time">{this.getTime()}</h1>
              <p className="time-status"> {runningOrPaused}</p>
            </div>
          </div>
          <div className="settings-card">
            <div className="settings-inner-card">
              <button
                className="start-or-pause-btn"
                id="startOrPauseId"
                type="button"
                onClick={this.onStart}
              >
                <img
                  className="start-or-pause-image"
                  src={startOrPaused}
                  alt={altName}
                />

                <p className="start-or-pause"> {startOrPauseElement} </p>
              </button>

              <button
                className="reset-btn"
                id="resetId"
                type="button"
                onClick={this.onReset}
              >
                <img
                  className="reset-image"
                  src={resetImage}
                  alt="reset icon"
                />

                <p className="reset"> Reset </p>
              </button>
            </div>
            <p className="paragraph"> Set Timer Limit </p>
            <div className="time-set-up-card">
              <button
                className="increment-btn"
                disabled={isTimerStart}
                type="button"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="time-in-minutes"> {timeInMinutes} </p>
              <button
                className="decrement-btn"
                disabled={isTimerStart}
                type="button"
                onClick={this.onIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
