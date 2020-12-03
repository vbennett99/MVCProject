const HandleSearch = (e) => {
  e.preventDefault();
  
  $("#popupMessage").animate({width:'hide'}, 350);
  
  if($("#searchTerm").val() == ''){
    handleError("Please enter a search term");
    return false;
  }
  
  sendAjax('GET', $("#searchForm").attr("action"), $("#searchForm").serialize(), (data) => {
      if(data){
        console.log(data); 
      }
     ReactDOM.render(
      <ResultList pieces={data.pieces} />, document.querySelector("#resultPreviews")
    );
  });
  
  return false;
};

const SearchForm = (props) => {
  return (
    <form id="searchForm"
          onSubmit={HandleSearch}
          name="searchForm"
          action="/searchPieces"
          method="GET"
          className="searchForm"
    >
      <label htmlFor="searchTerm">Search Term: </label>
      <input id="searchTerm" type="text" name="searchTerm" placeholder="Please only enter one search term at a time"/>
      <label htmlFor="searchType">Type: </label>
      <select id="type" name="searchType">
        <option value="title">title</option>
        <option value="tag">tag</option>
      </select>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="searchSubmit" type="submit" value="Search Pieces"/>
    </form>
  );
};

const ResultList = (props) => {
  if(props.pieces.length === 0){
    return(
      <div className="pieceList">
        <h3 className="emptyPiece">There are no pieces that match your search.</h3>
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

$(document).ready(function() {
  sendAjax('GET', '/getToken', null, (result) => {
    ReactDOM.render(
      <SearchForm csrf={result.csrfToken} />, document.querySelector("#search")
    );
    
    ReactDOM.render(
      <ResultList pieces={[]} />, document.querySelector("#resultPreviews")
    );
  });
});