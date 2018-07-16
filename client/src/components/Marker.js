import React from "react";

class Marker extends React.Component {
  render() {
    return <div className="marker">{this.props.mag}</div>;
  }
}

export default Marker;

// render() {
//   let classes = "marker";
//   if (this.props.selected) {
//     classes += " selected";
//   }
//   return <div className={classes}>{this.props.mag}</div>;
// }
