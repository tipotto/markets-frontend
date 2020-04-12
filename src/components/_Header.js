// import React from "react";

// class Header extends React.Component {
//   render() {
//     return (
//       <div className="header">
//         <div className="header-logo">
//           <img
//             src="https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/character_logo.svg"
//             alt=""
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default Header;

import React, { Component } from "react";
import AppBar from "material-ui/AppBar";

class Header extends Component {
  render() {
    return (
      <AppBar
        title="React Example"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  }
}

export default Header;
