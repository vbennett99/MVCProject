const handleProfile = (e) => {
  e.preventDefault();
  $("#popupMessage").animate({width:'hide'}, 350);
  return false;
};

//const PieceForm = (props) => {
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

const ProfileInfo = (props) => {
  return (
    <div className="userInfo">
      <h1 className="usernameDisplay">Username's Pieces</h1>
      <p className="joinDate">Joined: 11/14/2020</p>
    </div>
  );
};

const PieceList = function(props){
  if(props.pieces.length === 0){
    return(
      <div className="pieceList">
        <h3 className="emptyPiece">You haven't uploaded any pieces yet.</h3>
      </div>
    );
  }
  
  const pieceNodes = props.pieces.map(function(piece){
    return(
      <div key={piece._id} className="piece">
        <h2 className="pieceTitle">{piece.title}</h2>
        <h3 className="pieceTags">Tags: {piece.tags}</h3>
        <p className="pieceBody">{piece.body}</p>
      </div>
    );
  });
  
  return(
    <div className="pieceList">
      {pieceNodes}
    </div>
  );
};

const loadPiecesFromServer = () => {
  sendAjax('GET', '/getPieces', null, (data) => {
    ReactDOM.render(
      <PieceList pieces={data.pieces} />, document.querySelector("#piecePreviews")
    );
  });
};

//Rendering Functions
const createProfileInfo = (csrf) => {
  ReactDOM.render(
    <ProfileInfo />, document.querySelector("#profileInfo")
  );
};

const createPieceList = (csrf) => {
  ReactDOM.render(
    <PieceList pieces={data.pieces} />, document.querySelector("#piecePreviews")
  );
};

//const createPieceForm = (csrf) => {
//  ReactDOM.render(
//    <PieceForm csrf={csrf} />, document.querySelector("#piecePreviews")
//  );
//};

const setup = (csrf) => {
  //Default view items
  createProfileInfo(csrf);
  createPieceList(csrf);
  
//  //If the upload button is clicked, switch from piece previews to upload form
//  const uploadButton = document.querySelector("#uploadNewButton");
//  uploadButton.addEventListener("click", (e) => {
//    e.preventDefault();
//    createPieceForm(csrf);
//    return false;
//  });
  
  loadPiecesFromServer();
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});