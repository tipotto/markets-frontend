import React, { Component } from "react";
import { connect } from "react-redux";
import { requestFetch, requestDelete } from "../actions";

class ShowTodo extends Component {
  componentDidMount() {
    this.props.requestFetch();
  }

  render() {
    const datas = this.props.todoText.fetchTodoData.todoText;
    return (
        
    //   <div>
    //     {datas.map(data => {
    //       return (
    //         <div key={data.id}>
    //           {data.text}
    //           <span
    //             Style="margin-left: 20px; color: red;"
    //             onClick={() => this.props.requestDelete(data.id)}
    //           >
    //             x
    //           </span>
    //         </div>
    //       );
    //     })}
    //   </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  requestFetch: () => dispatch(requestFetch()),
  requestDelete: data => dispatch(requestDelete(data))
});
const mapStateToProps = state => ({
  todoText: state
});
export default connect(mapStateToProps, mapDispatchToProps)(ShowTodo);
