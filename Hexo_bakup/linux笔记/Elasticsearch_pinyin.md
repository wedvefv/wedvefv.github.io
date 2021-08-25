+++
title="Elasticsearch pinyin插件"
categories=["ES"] 
tags=["ES"] 
date="2020-11-17 23:10:00+0800"
toc=true
+++



## 插件安装

```
./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.9.3/elasticsearch-analysis-ik-7.9.3.zip


./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-pinyin/releases/download/v7.9.3/elasticsearch-analysis-pinyin-7.9.3.zip

```

## pinyin插件
- keep_first_letter  选项默认true，刘德华-> ldh
- keep_separate_first_letter  选项默认fasle ，  刘德华 -> l,d,h
- limit_first_letter_length 首字母默认长度 16
- keep_full_pinyin  默认true， 刘德华 -> [liu, de, hua]
- keep_joined_full_pinyin 默认false 刘德华-> [liudehua]
- keep_none_chinese 默认true， 保持非中问的字符或数字
- keep_none_chinese_together  需要keep_none_chinese=true； DJ音乐家
- keep_none_chinese_in_first_letter  默认true    eg: 刘德华AT2016->ldhat2016
- keep_none_chinese_in_joined_full_pinyin  默认false 刘德华2016->liudehua2016, default: false
- none_chinese_pinyin_tokenize 默认true 拆分字符为中文拼音 eg: liudehuaalibaba13zhuanghan -> liu,de,hua,a,li,ba,ba,13,zhuang,han
 - keep_none_chinese and keep_none_chinese_together 需要先打开。
- keep_original  默认false
- lowercase  小写， 默认true
- trim_whitespace  默认true
- remove_duplicated_term  删除重复的索引， de的-> de
- ignore_pinyin_offset 6.0offset is strictly constrained, 默认true




### 创建索引3

```
curl -X PUT  -H "Content-Type: application/json" 'http://localhost:9200/medcl3/' -d '
{
   "settings" : {
       "analysis" : {
           "analyzer" : {
               "pinyin_analyzer" : {
                   "tokenizer" : "my_pinyin"
                   }
           },
           "tokenizer" : {
               "my_pinyin" : {
                   "type" : "pinyin",
                   "keep_first_letter":true,
                   "keep_separate_first_letter" : true,
                   "keep_full_pinyin" : true,
                   "keep_original" : false,
                   "limit_first_letter_length" : 16,
                   "lowercase" : true
               }
           }
       }
   }
}'
```

### 创建mapping

```
curl -X POST  -H "Content-Type: application/json" 'http://localhost:9200/medcl3/_mapping ' -d '
{
  "properties": {
      "name": {
          "type": "keyword",
          "fields": {
              "pinyin": {
                  "type": "text",
                  "store": false,
                  "term_vector": "with_offsets",
                  "analyzer": "pinyin_analyzer",
                  "boost": 10
              },
              "ik": {
	              "type":"text",
				  "analyzer": "ik_max_word"
              },
			  "my_wildcard": {
	              "type":"wildcard",
	              "store":false
              }
          }
      }
  }
}'
```
- 指定了pinyin属性，ik分词属性，wildcard统配属性，这些相当于给name字段添加了方法一眼。
- 操作时["name.ik"="刘德华"] 当做name的拼音分词； ["name.my_wildcard" = "*aaa*"] 可以通配包含aaa的text文本。
- 前提是my_wildcard, 必须是wildcard 类型，这是7.x版本为匹配大的text文本所提供的类型，是text，keword之外的第三种类型。

### 添加数据

```
curl -X POST  -H "Content-Type: application/json" 'http://localhost:9200/medcl3/_create/andy' -d '{"name":"刘德华"}'
```
### 可以测试汉字拼音分词效果

```
curl -X GET  -H "Content-Type: application/json" 'http://localhost:9200/medcl/_analyze' -d '
{
  "text": "刘德华",
  "analyzer": "pinyin_analyzer"
}'
```


### 查询数据

```
curl -X POST -H "Content-Type: application/json" 'http://localhost:9200/medcl3/_search' -d '{
 "query": {"match_phrase": {
   "name.pinyin": "刘德h"
 }}
}'
```

## 查询错误

```
{"error":{"root_cause":[{"type":"circuit_breaking_exception","reason":"[fielddata] Data too large, data for [name.raw] would be [5112378110/4.7gb], which is larger than the limit of [5112122572/4.7gb]","bytes_wanted":5112378110,"bytes_limit":5112122572}

是内存问题，修改配置文件：
elasticsearch.yml 增加配置

indices.fielddata.cache.size: 20%
indices.breaker.total.use_real_memory: false
# fielddata 断路器默认设置堆的 60% 作为 fielddata 大小的上限。
indices.breaker.fielddata.limit: 40%
# request 断路器估算需要完成其他请求部分的结构大小，例如创建一个聚合桶，默认限制是堆内存的 40%。
indices.breaker.request.limit: 40%
# total 揉合 request 和 fielddata 断路器保证两者组合起来不会使用超过堆内存的 70%(默认值)。
indices.breaker.total.limit: 95%
```