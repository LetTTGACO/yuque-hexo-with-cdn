'use strict';

const config = require('../config');
// 获取md链接的正则表达式
const urlRegExp = /\[(.*?)]\((.*?)\)/mg;

/**
 * 文章链接替换
 * @param article
 */
function urlReplace(article) {
  const matchUrlList = article.body.match(urlRegExp);
  matchUrlList && matchUrlList.forEach(url => {
    if (url.indexOf(config.urlReplace.originalUrl) !== -1) {
      const originalUrl = url;
      url = url.replace(config.urlReplace.originalUrl, config.urlReplace.replaceUrl);
      article.body = article.body.replace(originalUrl, url);
    }
  });
  return article;

}

module.exports = urlReplace;
