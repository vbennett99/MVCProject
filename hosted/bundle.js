"use strict";

var handleProfile = function handleProfile(e) {
  e.preventDefault();
  $("#popupMessage").animate({
    width: 'hide'
  }, 350);
  return false;
}; //const PieceForm = (props) => {
//  return (
//    <form id="pieceForm"
//          onSubmit={HandleProfile}
//          name="pieceForm"
//          action="/upload"
//          method="POST"
//          className="pieceForm"
//    >
//      <label htmlFor="Title">Title: </label>
//      <input id="pieceTitle" type="text" name="title" placeholder="Piece title"/>
//      <label htmlFor="Tags">Tags: </label>
//      <input id="pieceTags" type="text" name="tags" placeholder="Romance, Comedy, ..."/>
//      <label htmlFor="body">Body: </label>
//      <input id="pieceBody" type="text" name="body" placeholder="Your writing goes here"/>
//      <input type="hidden" name="_csrf" value={props.csrf}/>
//      <input className="uploadPieceSubmit" type="submit" value="Upload Piece"/>
//    </form>
//  );
//};


var ProfileInfo = function ProfileInfo(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "userInfo"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "usernameDisplay"
  }, "Username's Pieces"), /*#__PURE__*/React.createElement("p", {
    className: "joinDate"
  }, "Joined: 11/14/2020"));
};

var PieceList = function PieceList(props) {
  if (props.pieces.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pieceList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyPiece"
    }, "You haven't uploaded any pieces yet."));
  }

  var pieceNodes = props.pieces.map(function (piece) {
    return /*#__PURE__*/React.createElement("div", {
      key: piece._id,
      className: "piece"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "pieceTitle"
    }, piece.title), /*#__PURE__*/React.createElement("h3", {
      className: "pieceTags"
    }, "Tags: ", piece.tags), /*#__PURE__*/React.createElement("p", {
      className: "pieceBody"
    }, piece.body));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "pieceList"
  }, pieceNodes);
};

var loadPiecesFromServer = function loadPiecesFromServer() {
  sendAjax('GET', '/getPieces', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PieceList, {
      pieces: data.pieces
    }), document.querySelector("#piecePreviews"));
  });
}; //Rendering Functions


var createProfileInfo = function createProfileInfo(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ProfileInfo, null), document.querySelector("#profileInfo"));
};

var createPieceList = function createPieceList(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PieceList, {
    pieces: data.pieces
  }), document.querySelector("#piecePreviews"));
}; //const createPieceForm = (csrf) => {
//  ReactDOM.render(
//    <PieceForm csrf={csrf} />, document.querySelector("#piecePreviews")
//  );
//};


var setup = function setup(csrf) {
  //Default view items
  createProfileInfo(csrf);
  createPieceList(csrf); //  //If the upload button is clicked, switch from piece previews to upload form
  //  const uploadButton = document.querySelector("#uploadNewButton");
  //  uploadButton.addEventListener("click", (e) => {
  //    e.preventDefault();
  //    createPieceForm(csrf);
  //    return false;
  //  });

  loadPiecesFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var HandlePiece = function HandlePiece(e) {
  e.preventDefault();
  $("#popupMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#pieceTitle").val() == '' || $("#pieceBody").val() == '') {
    handleError("Each piece must at least have a title and a body");
    return false;
  }

  sendAjax('POST', $("#pieceForm").attr("action"), $("#pieceForm").serialize());
  return false;
};

var PieceForm = function PieceForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "pieceForm",
    onSubmit: HandlePiece,
    name: "pieceForm",
    action: "/upload",
    method: "POST",
    className: "pieceForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "Title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "pieceTitle",
    type: "text",
    name: "title",
    placeholder: "Piece title"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "Tags"
  }, "Tags: "), /*#__PURE__*/React.createElement("input", {
    id: "pieceTags",
    type: "text",
    name: "tags",
    placeholder: "Romance, Comedy, ..."
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "body"
  }, "Body: "), /*#__PURE__*/React.createElement("input", {
    id: "pieceBody",
    type: "text",
    name: "body",
    placeholder: "Your writing goes here"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "uploadPieceSubmit",
    type: "submit",
    value: "Upload Piece"
  }));
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PieceForm, {
    csrf: csrf
  }), document.querySelector("#uploadPiece"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#popupMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#popupMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
