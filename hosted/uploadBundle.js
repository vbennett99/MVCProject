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

  sendAjax('POST', $("#pieceForm").attr("action"), $("#pieceForm").serialize(), redirect);
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
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "Tags"
  }, "Tags: "), /*#__PURE__*/React.createElement("input", {
    id: "pieceTags",
    type: "text",
    name: "tags",
    placeholder: "Romance, Comedy, ..."
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "body"
  }, "Body: "), /*#__PURE__*/React.createElement("input", {
    id: "pieceBody",
    type: "text",
    name: "body",
    placeholder: "Your writing goes here"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "uploadPieceSubmit",
    type: "submit",
    value: "Upload Piece"
  }));
};

$(document).ready(function () {
  sendAjax('GET', '/getToken', null, function (result) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PieceForm, {
      csrf: result.csrfToken
    }), document.querySelector("#uploadPiece"));
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
