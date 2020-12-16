function getToken(request) {
    return request.post('/login')
      .send({ "user": 'usuario' })
      .set('Accept', 'application/json')
      .then(response => response.body.message.token);
}

function requestWrapper(request, token) {
  const base = (method, url) => {
      return request[method](url).set('Authorization', 'Bearer ' + token);
  };

  return {
      get: function (url) {
          return base('get', url);
      },
      post: function (url) {
          return o.base('post', url);
      },
      delete: function (url) {
          return o.base('delete', url);
      },
      patch: function (url) {
          return o.base('patch', url);
      },
      put: function (url) {
          return o.base('put', url);
      }
  };
}

module.exports = { getToken, requestWrapper };