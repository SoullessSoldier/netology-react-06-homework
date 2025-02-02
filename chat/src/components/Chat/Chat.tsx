import backendUrl from "@/backend_url";
import { TMessage } from "@/types/message";
import getUserId from "@/utils/getId";
import axios from "axios";
import React, { createRef } from "react";
import "./chat.css";

interface IState {
  messages: TMessage[];
  newMessage: string;
  lastMessageId: number;
  userId: string;
}

class Chat2 extends React.Component<object, IState> {
  timeout: number | undefined = undefined;

  private lastMessageRef = createRef<HTMLDivElement>();

  constructor(props: object) {
    super(props);
    const userId = getUserId();
    const savedLastMessageId = localStorage.getItem("lastMessageId");
    const lastMessageId = savedLastMessageId ? parseInt(savedLastMessageId) : 0;

    this.state = {
      messages: [],
      newMessage: "",
      lastMessageId,
      userId,
    };

    this.timeout = undefined;
  }

  componentDidMount(): void {
    console.log("i did mount");
    this.fetchData();
  }

  componentDidUpdate(): void {
    this.lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  componentWillUnmount(): void {
    console.log("i will unmount");
    window.clearTimeout(this.timeout);
    localStorage.setItem("lastMessageId", this.state.lastMessageId.toString());
    this.setState({messages: []})
  }

  fetchData = async () => {
    console.log("fetch data", new Date());
    setTimeout(async () => {
      const params = new URLSearchParams();
      params.append("from", this.state.lastMessageId.toString());
      const response = await axios.get(backendUrl, { params });
      const data = response.status === 200 ? response.data : [];

      if (data.length > 0) {
        this.setState((prevState) => {
          const updatedMessages = [...prevState.messages.filter(message => message.id !== 0), ...data];
          return {
            messages: updatedMessages,
            lastMessageId: data[data.length - 1].id,
          };
        });
      }

      this.timeout = window.setTimeout(this.fetchData, 4 * 1000);
    }, 1000);
  };

  sendMessage = async () => {
    if (!this.state.newMessage.trim()) return;

    const message: TMessage = {
      id: 0,
      userId: this.state.userId,
      content: this.state.newMessage,
    };

    this.setState((prevState) => {
      const updatedMessages = [...prevState.messages, message];
      return {
        messages: updatedMessages,
        newMessage: "",
      };
    });

    try {
      const response = await axios.post(backendUrl, message);
      if (response.status === 200) {
        this.fetchData();
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newMessage: event.target.value });
  };

  render() {
    return (
      <div className="chat-container">
        <div className="messages">
          {this.state.messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${
                msg.userId === this.state.userId
                  ? "own-message"
                  : "other-message"
              }`}
              style={{
                backgroundColor: `#${parseInt(msg.userId, 36)
                  .toString(16)
                  .substr(0, 6)}`,
              }}
            >
              {msg.content}
            </div>
          ))}
          <div ref={this.lastMessageRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={this.state.newMessage}
            onChange={this.handleInputChange}
          />
          <button onClick={this.sendMessage}>Добавить</button>
        </div>
      </div>
    );
  }
}

export default Chat2;
