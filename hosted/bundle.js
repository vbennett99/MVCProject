"use strict";

var ProfileInfo = function ProfileInfo() {
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
    var pieceTitle = piece.title;
    var pieceTags = piece.tags;
    var pieceBody = piece.body;
    return /*#__PURE__*/React.createElement("div", {
      key: piece._id,
      className: "piece"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "pieceTitle"
    }, pieceTitle), /*#__PURE__*/React.createElement("h3", {
      className: "pieceTags"
    }, "Tags: ", pieceTags), /*#__PURE__*/React.createElement("p", {
      className: "pieceBody"
    }, pieceBody), /*#__PURE__*/React.createElement("hr", null));
  }); //console.log(pieceNodes);

  return /*#__PURE__*/React.createElement("div", {
    className: "pieceList"
  }, pieceNodes);
};

$(document).ready(function () {
  sendAjax('GET', '/getToken', null, function (result) {
    //setup(result.csrfToken);
    ReactDOM.render( /*#__PURE__*/React.createElement(ProfileInfo, null), document.querySelector("#profileInfo"));
    ReactDOM.render( /*#__PURE__*/React.createElement(PieceList, {
      pieces: []
    }), document.querySelector("#piecePreviews"));
  });
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
