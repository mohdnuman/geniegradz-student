import React, { Component } from "react";
import "../chat.css";
import io from "socket.io-client";

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [], // {content: 'some message', self: true}
			typedMessage: "",
		};

		this.socket = io.connect("http://192.168.1.37:5000");
		this.userEmail = "numan@gmail.com";

		 if (this.userEmail) {
			this.setupConnection();
		} 
	}


	setupConnection = () => {
		const socketConnection = this.socket;
		const self = this;
		this.socket.on("connection", function () {
			console.log("Connection Established!");
			socketConnection.emit("join_room", {
				//for establishing a connextion between the user and the chat server
				user_email: this.userEmail,
				chatroom: self.props.id
			});

			socketConnection.on("user_joined", function (
				data //server sends a message that user has joined
			) {
				console.log("New user Joined!", data);
			});
		});

		this.socket.on("receive_message", function (data) {
			//add message to state
			const { messages } = self.state;
			const messageObject = {};
			messageObject.content = data.message;

			if (data.user_email === self.userEmail) {
				messageObject.self = true;
			} else {
				messageObject.self = false;
			}
			self.setState({
				messages: [...messages, messageObject],
				typedMessage: ""
			});
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { typedMessage } = this.state;
		if (typedMessage && this.userEmail) {
			this.socket.emit("send_message", {
				message: typedMessage,
				user_email: this.userEmail,
				chatroom: this.props.id
			});
		}
	};


	render() {
		const { typedMessage, messages } = this.state;
		const resolved=this.props.resolved;

		return (
			<div className="chat-container">
				<div className="chat-header">
					Chat
					<img
						src="https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1642333057~hmac=ae65171088cb3d34393817f0ce9e9130"
						alt=""
						height={17}
						onClick={this.handleMinimize}
					/>
				</div>
				<div className="chat-messages">
					{messages.map((message, index) => (
						<div
							className={
								message.self
									? "chat-bubble self-chat"
									: "chat-bubble other-chat"
							}
							key={index}
						>
							{message.content}
						</div>
					))}
				</div>
				<div className="chat-footer">
					{!resolved &&
					<input
						type="text"
						value={typedMessage}
						onChange={(event) =>
							this.setState({ typedMessage: event.target.value })
						}
					/>}
					{resolved && <div id="chat-resolved">Doubt is resolved. ✔</div>}
					<button onClick={this.handleSubmit}>
						Send
					</button>
	
				</div>
			</div>
		);
	}
}


export default Chat;