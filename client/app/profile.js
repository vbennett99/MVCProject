const ProfileInfo = (props) => {
  let createdDate = props.accInfo.info.createdDate;
  createdDate = createdDate.substr(0,10); //Just get the date part
  
  //If someone is already subscribed
  if(props.accInfo.info.subscribed){
    return (
        <div className="userInfo">
          <h1 className="usernameDisplay">{props.accInfo.info.username}'s Pieces</h1>
          <img className="subscriptionStar" src="/assets/img/star.png" alt="A yellow star" title="You're a member! Thank you!"/>
          <p className="joinDate">joined: {createdDate}</p>
        </div>
    );
  };
  //If someone isn't subscribed
  return (
      <div className="userInfo">
        <h1 className="usernameDisplay">{props.accInfo.info.username}'s Pieces</h1>
        <a id="subscribeButton" onClick={(e) => handleSubscribe(e, props.csrfToken)}>
          <img className="subscriptionStar" src="/assets/img/empty_star.png" alt="An empty yellow star"
              title="Click here to subscribe and remove ads!"/>
        </a>
        <p className="joinDate">joined: {createdDate}</p>
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

const handleSubscribe = (e, csrf) => {
  e.preventDefault();
  
  let data = `_csrf=${csrf}`;
  
  sendAjax('POST', '/subscribe', data, function(data){
    if(!data.status){
      handleError("An error occured");
    }
    else
    {
      handleError("Thanks for subscribing!");
      setup();
    };
  })
};

const LoadAds = () => {
  return (
    <a target="_blank" href="https://xkcd.com/993/"><img src="/assets/img/fake_ad.png" alt="A fake advertisement. It takes you to an xkcd comic if you click it." /></a>
  );
};

const loadPiecesFromServer = () => {
  sendAjax('GET', '/getPieces', null, (data) => {
    ReactDOM.render(
      <PieceList pieces={data.pieces} />, document.querySelector("#piecePreviews")
    );     
  });
};

const loadAccInfo = (csrf) => {
  sendAjax('GET', '/getAccInfo', null, (data) => {
    ReactDOM.render(
      <ProfileInfo accInfo={data} csrfToken={csrf} />, document.querySelector("#profileInfo")
    );
    
    if(!data.info.subscribed){
      ReactDOM.render(
        <LoadAds />, document.querySelector("#leftAd")
      );
      
      ReactDOM.render(
        <LoadAds />, document.querySelector("#rightAd")
      );
    }
  });
};

const setup = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    loadAccInfo(result.csrfToken);
    loadPiecesFromServer();
  })
};

$(document).ready(function() {
  setup();
});