(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{485:function(s,n,t){"use strict";t.r(n);var e=t(56),a=Object(e.a)({},(function(){var s=this,n=s.$createElement,t=s._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"免费证书申请"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#免费证书申请"}},[s._v("#")]),s._v(" 免费证书申请")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("wget https://dl.eff.org/certbot-auto\nchmod   a主机记录：_acme-challenge\n记录类型： TXT\n记录值： foRfz_Vr2vLVGw3U8WsFc4ohMWfk4oETX89vCi-0Lx4 （这个随机生成的，看你自己的是多少）\n\n填写完保存，然后回到终端按下 回车键。\n \n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("h2",{attrs:{id:"修改nginx-的配置文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#修改nginx-的配置文件"}},[s._v("#")]),s._v(" 修改nginx 的配置文件")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("    listen 80;  //.  后面添加下面的内容\n\n\tlisten 443;\n    ssl on;\n    ssl_certificate /etc/letsencrypt/live/xxx.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/xxxx.com/privkey.pem;\n    ssl_session_timeout 5m;\n\n    #ssl_protocols  SSLv2 SSLv3 TLSv1;\n    ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;\n    ssl_ciphers  ALL:!ADH:!EXPORT56:RC4```\n\nreload nginx， 就可以用http方式访问域名了。")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br")])])])}),[],!1,null,null,null);n.default=a.exports}}]);