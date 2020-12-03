const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  // force cast to strings to cover some security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/profile' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match, please try again' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/profile' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

const changePassword = (request, response) => {
  const req = request;
  const res = response;
  
  // cast to strings to cover up some security flaws
  req.body.newPass1 = `${req.body.newPass1}`;
  req.body.newPass2 = `${req.body.newPass2}`;
  
  if (req.body.newPass1 !== req.body.newPass2) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }
  
  const filter = { _id: req.session.account._id };
  
  return Account.AccountModel.generateHash(req.body.newPass1, (salt, hash) => {
    const newPassData = {
      salt,
      password: hash,
    };
    
    Account.AccountModel.findOneAndUpdate(filter, newPassData, {new: true}, (err, data) => {
      if(err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occured' });
      }
      
      return res.json({data, status: true, redirect: '/profile'});
    });
  });
};

const getAccountInfo = (req, res) => {
  const { account } = req.session;
  Account.AccountModel.findByUsername(account.username, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    const accountInfo = { // More will be added later, like if there's a subscription
      username: data.username,
      createdDate: data.createdDate,
      subscribed: data.subscribed,
    };

    return res.json({ info: accountInfo });
  });
};

const subscribe = (req, res) => {
  const filter = { _id: req.session.account._id };
  const update = { subscribed: true };

  Account.AccountModel.findOneAndUpdate(filter, update, { new: true }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ data, status: true });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getAccInfo = getAccountInfo;
module.exports.subscribe = subscribe;
module.exports.getToken = getToken;
