import { TWatchProps } from "@/types/watch";
import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import "./watch.css";

dayjs.extend(utc);

interface WatchState {
  date: dayjs.Dayjs;
}

class Watch extends React.Component<TWatchProps, WatchState> {
  timeout: number | undefined;
  constructor(props: TWatchProps) {
    super(props);
    this.state = {
      date: dayjs().utcOffset(props.data.offset),
    };
    this.timeout = undefined;
  }

  componentDidMount(): void {
    console.log("i am mounted!");
    this.setDate();
  }

  componentWillUnmount(): void {
    console.log("i will be removed");
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  setDate = () => {
    const date = dayjs().utcOffset(this.props.data.offset);
    this.setState({ date });
    this.timeout = window.setTimeout(this.setDate, 1000);
  };

  handleRemoveClick = (): void => {
    this.props.onRemove();
  };

  render() {
    return (
      <div className="watch">
        <h5 className="watch-title">{this.props.data.city}</h5>
        <h5 className="watch-title">{`UTC${
          this.props.data.offset < 0
            ? this.props.data.offset.toString().padStart(2, "0")
            : "+" + this.props.data.offset.toString().padStart(2, "0")
        }`}</h5>
        <div className="watch-wrapper">
          <div className="watch-button-close" onClick={this.handleRemoveClick}>
            X
          </div>
          <div className="icon-large icon-clock">
            <div className="clock">
              <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ol>
              <div
                id="hour"
                style={{
                  transform: `rotate(${
                    (this.state.date.hour() * 360) / 12
                  }deg)`,
                }}
              ></div>
              <div
                id="minute"
                style={{
                  transform: `rotate(${this.state.date.minute() * 6}deg)`,
                }}
              ></div>
              <div
                id="second"
                style={{
                  transform: `rotate(${this.state.date.second() * 6}deg)`,
                }}
              ></div>
            </div>
            <b className="clocktable-dot clocktable-dot-big">
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
            </b>
            <b className="clocktable-dot clocktable-dot-big">
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
            </b>
            <b className="clocktable-dot clocktable-dot-big">
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
            </b>
            <b className="clocktable-dot clocktable-dot-big">
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
            </b>
            <b className="clocktable-dot clocktable-dot-big">
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
            </b>
            <b className="clocktable-dot clocktable-dot-big">
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
              <i className="clocktable-dot clocktable-dot-small"></i>
            </b>
          </div>
        </div>
      </div>
    );
  }
}

export default Watch;
