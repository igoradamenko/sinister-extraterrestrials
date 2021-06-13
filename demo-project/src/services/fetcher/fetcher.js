const STATUS = {
  OK: 'ok',
  WRONG_CREDENTIALS: 'wrong_credentials',
  WRONG_SESSION_ID: 'wrong_session_id',
}

const FAKE_CREDENTIALS = {
  email: 'peterparker@stark.com',
  password: 'thegreatestavenger',
};

function getAuth() {
  return fakeResponse(null, STATUS.WRONG_SESSION_ID);
}

function postAuth({ email, password }) {
  if (email === FAKE_CREDENTIALS.email && password === FAKE_CREDENTIALS.password) {
    return fakeResponse(null);
  }

  return fakeResponse(null, STATUS.WRONG_CREDENTIALS);
}

function resetPassword({ email }) {
  return fakeResponse(null);
}

export {
  STATUS,
  getAuth, 
  postAuth,
  resetPassword,
};

function fakeResponse(res, errorStatus) {
  return new Promise((resolve) => {
    const timeout = Math.random() * 1000;

    setTimeout(() => {
      if (errorStatus) {
        resolve({ status: errorStatus });
      } else {
        resolve({ status: STATUS.OK, ...(res ? { data: res } : {}) });
      }
    }, timeout);
  });
}
