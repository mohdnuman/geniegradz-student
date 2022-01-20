import React, { Component } from "react";
import { Chat } from "./index";
import { createDoubt, resolveDoubt } from "../actions/doubt";
import { connect } from "react-redux";

class CreateDoubtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "recursion",
      description: "",
      user: "Mohd Numan",
      created: false,
      activeDoubt:this.props.doubt
    };
  }

//   componentDidUpdate(prevProps, prevState) {
//       this.setState({activeDoubt:this.props.doubt});
//       console.log(this.state);
//   }
  
  
  handleChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleCreate = () => {
    this.props.dispatch(
      createDoubt(this.state.topic, this.state.user, this.state.description)
    );
    this.setState({ created: true });
  };

  hanldeResolve=()=>{
      console.log(this.props);
    this.props.dispatch(resolveDoubt(this.props.doubt._id));

  }
  render() {
    return (
      <div>
        <div id="side-panel">
          <div id="upper-side-panel">
            <div id="create-doubt-heading">Create A Doubt</div>
            <textarea
              placeholder="Describe your doubt..."
              id="create-doubt-input"
              onChange={this.handleChange}
            />
            {!this.state.created  && (
              <button id="create-doubt-button" onClick={this.handleCreate}>
                Create
              </button>
            )}
          </div>
          <div id="lower-side-panel">
            {this.state.created && (
              <div><div id="doubt-created-heading">Doubt created ✔️</div><button id="create-doubt-button" onClick={this.hanldeResolve}>Resolve</button></div>
            )}

          </div>
        </div>

        {this.state.created  && (
          <Chat id={this.props.doubt.id} />
        )}
      </div>
    );
  }
}
function mapstatetoprops(state) {
  return {
    doubt: state.doubt,
  };
}

export default connect(mapstatetoprops)(CreateDoubtPage);
