const HandlePiece = (e) => {
  e.preventDefault();
  
  $("#popupMessage").animate({width:'hide'}, 350);
  
  if($("#pieceTitle").val() == '' || $("#pieceBody").val() == ''){
    handleError("Each piece must at least have a title and a body");
    return false;
  }
  
  sendAjax('POST', $("#pieceForm").attr("action"), $("#pieceForm").serialize());
  
  return false;
};

const PieceForm = (props) => {
  return (
    <form id="pieceForm"
          onSubmit={HandlePiece}
          name="pieceForm"
          action="/upload"
          method="POST"
          className="pieceForm"
    >
      <label htmlFor="Title">Title: </label>
      <input id="pieceTitle" type="text" name="title" placeholder="Piece title"/>
      <label htmlFor="Tags">Tags: </label>
      <input id="pieceTags" type="text" name="tags" placeholder="Romance, Comedy, ..."/>
      <label htmlFor="body">Body: </label>
      <input id="pieceBody" type="text" name="body" placeholder="Your writing goes here"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="uploadPieceSubmit" type="submit" value="Upload Piece"/>
    </form>
  );
};

const setup = function(csrf) {
  ReactDOM.render(
    <PieceForm csrf={csrf} />, document.querySelector("#uploadPiece")
  );
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});