const picturePage = (req, res) => {
  res.render('picture', { csrfToken: req.csrfToken() });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.picturePage = picturePage;
module.exports.getToken = getToken;
