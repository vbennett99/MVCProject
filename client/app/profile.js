const ProfileInfo = () => {
  return (
    <div className="userInfo">
      <h1 className="usernameDisplay">Username's Pieces</h1>
      <p className="joinDate">Joined: 11/14/2020</p>
    </div>
  );
};

const PieceList = (props) => {
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
        <hr/>
      </div>
    );
  });
  
  //console.log(pieceNodes);
  return(
    <div className="pieceList">
      {pieceNodes}
    </div>
  );
};

const loadPiecesFromServer = () => {
  console.log("Pieces are being loaded from server");
  sendAjax('GET', '/getPieces', null, (data) => {
    console.log(data.pieces);
    ReactDOM.render(
      <PieceList pieces={data.pieces} />, document.querySelector("#piecePreviews")
    );     
  });
};

$(document).ready(function() {
  sendAjax('GET', '/getToken', null, (result) => {
    //setup(result.csrfToken);
    ReactDOM.render(
      <ProfileInfo />, document.querySelector("#profileInfo")
    );
    
    ReactDOM.render(
      <PieceList pieces={[]} />, document.querySelector("#piecePreviews")
    );
    
    loadPiecesFromServer();
  });
});