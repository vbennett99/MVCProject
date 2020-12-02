const HandlePiece = (e) => {
  e.preventDefault();
  
  $("#popupMessage").animate({width:'hide'}, 350);
  
  if($("#pieceTitle").val() == '' || $("#pieceBody").val() == ''){
    handleError("Each piece must at least have a title and a body");
    return false;
  }
  
  sendAjax('POST', $("#pieceForm").attr("action"), $("#pieceForm").serialize(), redirect);
  
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
      <input id="pieceTitle" type="text" name="title" placeholder="Piece title"/><br />
      <label htmlFor="Tags">Tags: </label>
      <input id="pieceTags" type="text" name="tags" placeholder="Romance, Comedy, ..."/><br />
      <label htmlFor="body">Body: </label>
      <input id="pieceBody" type="text" name="body" placeholder="Your writing goes here"/><br /><br/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="uploadPieceSubmit" type="submit" value="Upload Piece"/>
    </form>
  );
};

$(document).ready(function() {
  sendAjax('GET', '/getToken', null, (result) => {
    ReactDOM.render(
      <PieceForm csrf={result.csrfToken} />, document.querySelector("#uploadPiece")
    );
  });
});