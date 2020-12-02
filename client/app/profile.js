const ProfileInfo = (props) => {
  let createdDate = props.accInfo.info.createdDate;
  createdDate = createdDate.substr(0,10); //Just get the date part
  return (
      <div className="userInfo">
        <h1 className="usernameDisplay">{props.accInfo.info.username}'s Pieces</h1>
        <p className="joinDate">Joined: {createdDate}</p>
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
  sendAjax('GET', '/getPieces', null, (data) => {
    ReactDOM.render(
      <PieceList pieces={data.pieces} />, document.querySelector("#piecePreviews")
    );     
  });
};

const loadAccInfo = () => {
  sendAjax('GET', '/getAccInfo', null, (data) => {
    ReactDOM.render(
      <ProfileInfo accInfo={data} />, document.querySelector("#profileInfo")
    );   
  });
};

$(document).ready(function() {
  sendAjax('GET', '/getToken', null, (result) => {
    ReactDOM.render(
      <PieceList pieces={[]} />, document.querySelector("#piecePreviews")
    );
    
    loadAccInfo();
    loadPiecesFromServer();
  });
});