"use strict";

var ProfileInfo = function ProfileInfo(props) {
  var createdDate = props.accInfo.info.createdDate;
  createdDate = createdDate.substr(0, 10); //Just get the date part

  return /*#__PURE__*/React.createElement("div", {
    className: "userInfo"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "usernameDisplay"
  }, props.accInfo.info.username, "'s Pieces"), /*#__PURE__*/React.createElement("p", {
    className: "joinDate"
  }, "Joined: ", createdDate));
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
    }, piece.body), /*#__PURE__*/React.createElement("hr", null));
  }); //console.log(pieceNodes);

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
};

var loadAccInfo = function loadAccInfo() {
  sendAjax('GET', '/getAccInfo', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ProfileInfo, {
      accInfo: data
    }), document.querySelector("#profileInfo"));
  });
};

$(document).ready(function () {
  sendAjax('GET', '/getToken', null, function (result) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PieceList, {
      pieces: []
    }), document.querySelector("#piecePreviews"));
    loadAccInfo();
    loadPiecesFromServer();
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
