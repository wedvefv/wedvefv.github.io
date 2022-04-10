(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{446:function(s,a,t){"use strict";t.r(a);var r=t(56),e=Object(r.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#加密"}},[s._v("#")]),s._v(" 加密")]),s._v(" "),t("h1",[t("center",[s._v("公钥加密的工作原理")])],1),s._v("\n## 对称加密：\n"),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("* 加密密钥和解密密钥是一样的。\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"非对称加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#非对称加密"}},[s._v("#")]),s._v(" 非对称加密：")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("\t"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("也叫公钥加密"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" 两个密钥在加密和解密中配合使用，密钥对具有特殊的互补关系，密钥对在数学上存在特殊关系。\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("br"),s._v(" "),t("h2",{attrs:{id:"邮件的电子签名过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#邮件的电子签名过程"}},[s._v("#")]),s._v(" 邮件的电子签名过程：")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" 捕获邮件正文"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("计算邮件哈希值"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("检索发件人私钥"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("用发件人私钥加密哈希值"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("附加到邮件底部"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("明文签名"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("与原始邮件组合成二进制附件"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("不透明签名"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("发送mail\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("私钥只有发件人才唯一拥有，公钥仅仅与一个私钥关联，所以可以用公钥唯一识别一个私钥。\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("br"),s._v(" "),t("h3",{attrs:{id:"验证邮件签名的过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#验证邮件签名的过程"}},[s._v("#")]),s._v(" 验证邮件签名的过程：")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" 接收邮件"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("检索加密的哈希值"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("检索邮件正文"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("用正文计算邮件哈希值"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("检索发件人的公钥"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("用发件人公钥解密签名"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("加密的哈希值"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("和计算的哈希值对比"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("验证签名邮件\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("文件内容不变，计算的哈希值就不会变。\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("私钥加密的东西，需要对应的公钥解密。\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("如果哈希值一致，说明公钥对应的私钥是对的，私钥只有发件人知道，所以确定发件人属实。\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("br"),s._v(" "),t("h2",{attrs:{id:"邮件内容的加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#邮件内容的加密"}},[s._v("#")]),s._v(" 邮件内容的加密")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" 对称密钥加密的话，需要"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"密钥协商"')]),s._v("，必须协商出一个双方都知道的密钥。\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" 非对称密钥加密的话，没有协商过程，因为一个公钥，可以很多人拥有，私钥是只有一个人有。\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" 由于非对称"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("公钥加密"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("密钥加密使用密钥对，加密和解密是一个昂贵的计算过程，速度慢。所以这么做呗"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("br"),s._v(" "),t("h3",{attrs:{id:"send加密mail内容"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#send加密mail内容"}},[s._v("#")]),s._v(" send加密mail内容")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.")]),s._v("找到邮件正文"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.")]),s._v("检索收件人公钥"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.")]),s._v("生成一次性的会话密钥"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("这个是对称密钥"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4.")]),s._v("用会话密钥加密正文"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5.")]),s._v("用收件人公钥加密会话密钥，并附到邮件"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("6.")]),s._v("发送邮件\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("br"),s._v(" "),t("h3",{attrs:{id:"recv解密mail内容"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#recv解密mail内容"}},[s._v("#")]),s._v(" recv解密mail内容")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.")]),s._v("接收邮件"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.")]),s._v("检索加密邮件正文和会话密钥"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("->")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.")]),s._v("检索收件人私钥解密会话密钥"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("->")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4.")]),s._v("用解密的会话密钥解密正文"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("->")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5.")]),s._v("解密邮件返回给收件人\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("br"),s._v(" "),t("h3",{attrs:{id:"同时使用签名和邮件内容加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#同时使用签名和邮件内容加密"}},[s._v("#")]),s._v(" 同时使用签名和邮件内容加密")]),s._v(" "),t("br"),s._v(" "),t("h3",{attrs:{id:"同时使用签名和邮件内容加密后的解密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#同时使用签名和邮件内容加密后的解密"}},[s._v("#")]),s._v(" 同时使用签名和邮件内容加密后的解密")]),s._v(" "),t("h3",{attrs:{id:"功能和所需的密钥表"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#功能和所需的密钥表"}},[s._v("#")]),s._v(" 功能和所需的密钥表")])])}),[],!1,null,null,null);a.default=e.exports}}]);