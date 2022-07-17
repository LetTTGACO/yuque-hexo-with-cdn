'use strict';

const { formatRaw } = require('../util');
const { img2Cdn } = require('../util/img2cdn');
const config = require('../config');
const urlReplace = require('../util/urlReplace');
const out = require('../lib/out');

/**
 * markdown 文章生产适配器
 *
 * @param {Object} post 文章
 * @return {String} text
 */
module.exports = async function(post) {
  // 语雀img转成自己的cdn图片
  if (config.imgCdn.enabled) {
    post = await img2Cdn(post);
  }
  // 链接替换
  if (config.urlReplace.enabled) {
    if (config.urlReplace.originalUrl) {
      post = await urlReplace(post);
    } else {
      out.warn('配置错误：urlReplace.originalUrl不能为空');
    }
  }
  const { body } = post;
  const raw = formatRaw(body);
  return raw;
};
