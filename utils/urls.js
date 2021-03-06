export const absoluteUrl = (req, setLocalhost) => {
  var protocol = 'https:';
  var host = req
    ? req.headers['x-forwarded-host'] || req.headers['host']
    : window.location.host;
  if (host.indexOf('localhost') > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = 'http:';
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + '//' + host,
  };
};

export const getProtocol = () => {
  return process.env.NODE_ENV === 'production' ? 'https' : 'http';
};

export const getQueryString = (obj) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) =>
      value
        ? acc.length > 0
          ? `${acc}&${key}=${value}`
          : `${key}=${value}`
        : acc,
    ''
  );
