let url;

const hostname = window && window.location && window.location.hostname;

if (/^localhost/.test(hostname)) {
  url = `http://localhost:3000/registrant`;
} else {
  url = 'https://mule-demo.herokuapp.com/registrant'
}

export const URL = url
