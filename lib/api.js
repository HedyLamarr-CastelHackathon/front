const getAPIURL = (path) => `${process.env.API_URL}${path}`;

exports.get = async (path) => {
  const options = {
    method: 'GET',
    headers: { 'Content-type': 'application/json;charset=UTF-8' },
  };
  const res = await fetch(getAPIURL(path), options);
  const json = await res.json();
  return json;
};

exports.post = async (path, data) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  };
  const res = await fetch(getAPIURL(path), options);
  const json = await res.json();
  return json;
};
