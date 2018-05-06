const request = require('request');

hexo.extend.tag.register('fetch', function(args) {
  return new Promise(resolve => {
    request.post('https://www.shurado.com/api/parse', {
      json: true,
      body: { url: args[0] }
    }, (err, res, body) => {
      resolve(body);
    });
  }).then(body => {
    return `<a class="fetch-card" href="${body.url}" target="_balnk" ref="nofollow noreferrer">
      <div class="info">
        <h2>${body.title}</h2>
        <p class="content">${body.desc}</p>
        <span>${decodeURIComponent(body.url)}</span>
      </div>
      ${body.image_url && `<div class="img" style="background-image: url(${body.image_url})" />`}
      </a>`;
  });
  
}, { async: true });
