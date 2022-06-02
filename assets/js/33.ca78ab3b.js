(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{427:function(s,e,a){"use strict";a.r(e);var n=a(56),t=Object(n.a)({},(function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"插件安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#插件安装"}},[s._v("#")]),s._v(" 插件安装")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.9.3/elasticsearch-analysis-ik-7.9.3.zip\n\n\n./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-pinyin/releases/download/v7.9.3/elasticsearch-analysis-pinyin-7.9.3.zip\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("h2",{attrs:{id:"pinyin插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pinyin插件"}},[s._v("#")]),s._v(" pinyin插件")]),s._v(" "),a("ul",[a("li",[s._v("keep_first_letter  选项默认true，刘德华-> ldh")]),s._v(" "),a("li",[s._v("keep_separate_first_letter  选项默认fasle ，  刘德华 -> l,d,h")]),s._v(" "),a("li",[s._v("limit_first_letter_length 首字母默认长度 16")]),s._v(" "),a("li",[s._v("keep_full_pinyin  默认true， 刘德华 -> [liu, de, hua]")]),s._v(" "),a("li",[s._v("keep_joined_full_pinyin 默认false 刘德华-> [liudehua]")]),s._v(" "),a("li",[s._v("keep_none_chinese 默认true， 保持非中问的字符或数字")]),s._v(" "),a("li",[s._v("keep_none_chinese_together  需要keep_none_chinese=true； DJ音乐家")]),s._v(" "),a("li",[s._v("keep_none_chinese_in_first_letter  默认true    eg: 刘德华AT2016->ldhat2016")]),s._v(" "),a("li",[s._v("keep_none_chinese_in_joined_full_pinyin  默认false 刘德华2016->liudehua2016, default: false")]),s._v(" "),a("li",[s._v("none_chinese_pinyin_tokenize 默认true 拆分字符为中文拼音 eg: liudehuaalibaba13zhuanghan -> liu,de,hua,a,li,ba,ba,13,zhuang,han")]),s._v(" "),a("li",[s._v("keep_none_chinese and keep_none_chinese_together 需要先打开。")]),s._v(" "),a("li",[s._v("keep_original  默认false")]),s._v(" "),a("li",[s._v("lowercase  小写， 默认true")]),s._v(" "),a("li",[s._v("trim_whitespace  默认true")]),s._v(" "),a("li",[s._v("remove_duplicated_term  删除重复的索引， de的-> de")]),s._v(" "),a("li",[s._v("ignore_pinyin_offset 6.0offset is strictly constrained, 默认true")])]),s._v(" "),a("h3",{attrs:{id:"创建索引3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建索引3"}},[s._v("#")]),s._v(" 创建索引3")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('curl -X PUT  -H "Content-Type: application/json" \'http://localhost:9200/medcl3/\' -d \'\n{\n   "settings" : {\n       "analysis" : {\n           "analyzer" : {\n               "pinyin_analyzer" : {\n                   "tokenizer" : "my_pinyin"\n                   }\n           },\n           "tokenizer" : {\n               "my_pinyin" : {\n                   "type" : "pinyin",\n                   "keep_first_letter":true,\n                   "keep_separate_first_letter" : true,\n                   "keep_full_pinyin" : true,\n                   "keep_original" : false,\n                   "limit_first_letter_length" : 16,\n                   "lowercase" : true\n               }\n           }\n       }\n   }\n}\'\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br")])]),a("h3",{attrs:{id:"创建mapping"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建mapping"}},[s._v("#")]),s._v(" 创建mapping")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('curl -X POST  -H "Content-Type: application/json" \'http://localhost:9200/medcl3/_mapping \' -d \'\n{\n  "properties": {\n      "name": {\n          "type": "keyword",\n          "fields": {\n              "pinyin": {\n                  "type": "text",\n                  "store": false,\n                  "term_vector": "with_offsets",\n                  "analyzer": "pinyin_analyzer",\n                  "boost": 10\n              },\n              "ik": {\n\t              "type":"text",\n\t\t\t\t  "analyzer": "ik_max_word"\n              },\n\t\t\t  "my_wildcard": {\n\t              "type":"wildcard",\n\t              "store":false\n              }\n          }\n      }\n  }\n}\'\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br")])]),a("ul",[a("li",[s._v("指定了pinyin属性，ik分词属性，wildcard统配属性，这些相当于给name字段添加了方法一眼。")]),s._v(" "),a("li",[s._v('操作时["name.ik"="刘德华"] 当做name的拼音分词； ["name.my_wildcard" = "'),a("em",[s._v("aaa")]),s._v('"] 可以通配包含aaa的text文本。')]),s._v(" "),a("li",[s._v("前提是my_wildcard, 必须是wildcard 类型，这是7.x版本为匹配大的text文本所提供的类型，是text，keword之外的第三种类型。")])]),s._v(" "),a("h3",{attrs:{id:"添加数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#添加数据"}},[s._v("#")]),s._v(" 添加数据")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('curl -X POST  -H "Content-Type: application/json" \'http://localhost:9200/medcl3/_create/andy\' -d \'{"name":"刘德华"}\'\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"可以测试汉字拼音分词效果"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#可以测试汉字拼音分词效果"}},[s._v("#")]),s._v(" 可以测试汉字拼音分词效果")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('curl -X GET  -H "Content-Type: application/json" \'http://localhost:9200/medcl/_analyze\' -d \'\n{\n  "text": "刘德华",\n  "analyzer": "pinyin_analyzer"\n}\'\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("h3",{attrs:{id:"查询数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查询数据"}},[s._v("#")]),s._v(" 查询数据")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('curl -X POST -H "Content-Type: application/json" \'http://localhost:9200/medcl3/_search\' -d \'{\n "query": {"match_phrase": {\n   "name.pinyin": "刘德h"\n }}\n}\'\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("h2",{attrs:{id:"查询错误"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查询错误"}},[s._v("#")]),s._v(" 查询错误")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('{"error":{"root_cause":[{"type":"circuit_breaking_exception","reason":"[fielddata] Data too large, data for [name.raw] would be [5112378110/4.7gb], which is larger than the limit of [5112122572/4.7gb]","bytes_wanted":5112378110,"bytes_limit":5112122572}\n\n是内存问题，修改配置文件：\nelasticsearch.yml 增加配置\n\nindices.fielddata.cache.size: 20%\nindices.breaker.total.use_real_memory: false\n# fielddata 断路器默认设置堆的 60% 作为 fielddata 大小的上限。\nindices.breaker.fielddata.limit: 40%\n# request 断路器估算需要完成其他请求部分的结构大小，例如创建一个聚合桶，默认限制是堆内存的 40%。\nindices.breaker.request.limit: 40%\n# total 揉合 request 和 fielddata 断路器保证两者组合起来不会使用超过堆内存的 70%(默认值)。\nindices.breaker.total.limit: 95%\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])])])}),[],!1,null,null,null);e.default=t.exports}}]);