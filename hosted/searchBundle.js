"use strict";

var HandleSearch = function HandleSearch(e) {
  e.preventDefault();
  $("#popupMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#searchTerm").val() == '') {
    handleError("Please enter a search term");
    return false;
  }

  sendAjax('GET', $("#searchForm").attr("action"), $("#searchForm").serialize(), function (data) {
    if (data) {
      console.log(data);
    }

    ReactDOM.render( /*#__PURE__*/React.createElement(ResultList, {
      pieces: data.pieces
    }), document.querySelector("#resultPreviews"));
  });
  return false;
};

var SearchForm = function SearchForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "searchForm",
    onSubmit: HandleSearch,
    name: "searchForm",
    action: "/searchPieces",
    method: "GET",
    className: "searchForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "searchTerm"
  }, "Search Term: "), /*#__PURE__*/React.createElement("input", {
    id: "searchTerm",
    type: "text",
    name: "searchTerm",
    placeholder: "Please only enter one search term at a time"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "searchType"
  }, "Type: "), /*#__PURE__*/React.createElement("select", {
    id: "type",
    name: "searchType"
  }, /*#__PURE__*/React.createElement("option", {
    value: "title"
  }, "title"), /*#__PURE__*/React.createElement("option", {
    value: "tag"
  }, "tag")), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "searchSubmit",
    type: "submit",
    value: "Search Pieces"
  }));
};

var ResultList = function ResultList(props) {
  if (props.pieces.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pieceList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyPiece"
    }, "There are no pieces that match your search."));
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
  }); //console.log(pieceNodes);

  return /*#__PURE__*/React.createElement("div", {
    className: "pieceList"
  }, pieceNodes);
};

$(document).ready(function () {
  sendAjax('GET', '/getToken', null, function (result) {
    ReactDOM.render( /*#__PURE__*/React.createElement(SearchForm, {
      csrf: result.csrfToken
    }), document.querySelector("#search"));
    ReactDOM.render( /*#__PURE__*/React.createElement(ResultList, {
      pieces: []
    }), document.querySelector("#resultPreviews"));
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
