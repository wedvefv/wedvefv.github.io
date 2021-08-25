+++
title="Elasticsearch总结"
categories=["ES"] 
tags=["ES"] 
date="2020-11-21 20:10:00+0800"
toc=true
+++



# 常见操作
### 以下操作都是在kibana可视化工具中执行的。
### 创建索引，并设置字段类型(mapping)
- mapping 可以单独设置，必须是创建index之后，设置了就不能修改了。
```json
POST /city_index/_mapping
{
	properties"{
	...
	}
}
```
- 也可以创建索引时，一并设置， 如下
### 城市信息索引 city_index

```json
# book 索引，novel是类型
# number_of_replicas 备份数
# number_of_shards 分片
# index true 是当前字段可以检索，store是额外存储，一般false<center></center>
# analyzer 指定分词器
// mapping 相当于创建mysql的表字段以及类型，分词器等。
PUT /city_index
{
  "settings": {
    "number_of_replicas": 1,
    "number_of_shards": 1
  },
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
      },
	  "cityid": {
	  	"type": "long"
	  }
  }
}
```

###  添加数据

```json
PUT /city_index/create
{
	".... 自动生成id"
}

PUT /city_index/_create/1?pretty
{
  "name": "北京市",
  "cityid": "1"
}
// put 会覆盖id=1的数据
```

### 更新数据7.x

``` json
POST /city_index/_update/1
{
  "doc":{
    "name": "北京市1"
  }
}
也可以
POST /city_index/_doc/1/_update ，会提示_doc类型以后会被删除。
其他版本 这么写
POST /book/type/1/_update
```

### 删除文档

```json
DELETE /city_index/_doc/1
```

### 删除索引

```json
DELETE /city_index
```

### 搜索

#### match
- 默认分词器，比如汉字他会拆分成单个汉字，这样就会匹配出很多，比较宽松。
- 通常中文需要ik分词器，不用默认的分词器。
- 如果ik分词器，搜索城市信息: **北京**， match会查出包含北京的这个词的信息: 
  - match是按元素匹配的，此时他会按北京这个词匹配
  - 北京植物园
  - 北京市
  - 北京动物园
- 如果不用ik分词器，输入北京，他会拆分出北和京，匹配取很多包含北和京的信息。

#### trem
- 是整个完全比配。
- 比如match匹配出了 输入关键字， 宫旅： 
  - 默认分词器会匹配出包含**宫**和**旅**的内容
  - 如果用ik分词器，也只会分出两个字，宫和旅，这样 match可以匹配出包含两个字的内容
  - **宫旅** 他本身不是词，所以分词器列表没有这个元素，所以term找不到和宫旅相同的分词，就查不出东西。
  - 比如输入 **京北第一草原** ik分词如下：
```json
{
  "tokens" : [
    {
      "token" : "京",
      "start_offset" : 0,
      "end_offset" : 1,
      "type" : "CN_CHAR",
      "position" : 0
    },
    {
      "token" : "北",
      "start_offset" : 1,
      "end_offset" : 2,
      "type" : "CN_CHAR",
      "position" : 1
    },
    {
      "token" : "第一",
      "start_offset" : 2,
      "end_offset" : 4,
      "type" : "CN_WORD",
      "position" : 2
    },
    {
      "token" : "一草",
      "start_offset" : 3,
      "end_offset" : 5,
      "type" : "CN_WORD",
      "position" : 3
    },
    {
      "token" : "一",
      "start_offset" : 3,
      "end_offset" : 4,
      "type" : "TYPE_CNUM",
      "position" : 4
    },
    {
      "token" : "草原",
      "start_offset" : 4,
      "end_offset" : 6,
      "type" : "CN_WORD",
      "position" : 5
    }
  ]
}
```

 - 这样使用name.ik分词属性的字段，使用match匹配京，就可以查出 京北第一草原
 - 同样使用term也能完全匹配 京这个分词。
 - 查出了 京北第一草原、卡缅斯克-沙赫京斯基
 ```json
 POST /city_index/_search
 {
	"query": {
		"bool": {
			"must": [{
				"term": {
					"name.ik": "京"
				}
			}],
			"must_not": [],
			"should": []
		}
	},
	"from": 0,
	"size": 1000,
	"sort": [],
	"aggs": {}
}
 ```
 - 但是京不会匹配出 **北京，京东** ，这些词，他们不会被ik拆分。ik_max_word 虽然是最细划分，但是尽可能组成词。实在不是词，才可能拆除单字， 这是由ik的分词算法决定的。
 - 总结就是match是依据分词个体来匹配，term需要搜索词和分词个体相等。
```json
POST /city_index/_analyze
{
		"text": "北京市",
		"analyzer": "standard"
}
```
-  分词结果如下
```json
{
	  "tokens" : [
		{
		  "token" : "北",
		  "start_offset" : 0,
		  "end_offset" : 1,
		  "type" : "<IDEOGRAPHIC>",
		  "position" : 0
		},
		{
		  "token" : "京",
		  "start_offset" : 1,
		  "end_offset" : 2,
		  "type" : "<IDEOGRAPHIC>",
		  "position" : 1
		},
		{
		  "token" : "市",
		  "start_offset" : 2,
		  "end_offset" : 3,
		  "type" : "<IDEOGRAPHIC>",
		  "position" : 2
		}
	  ]
}
```

#### query_string 
- 也是按分词器分出来的个体一一匹配的, 但是查询词可以用通配符 *京* 可以匹配分词北京，东京， 基本包含京的词都能查出来， 和默认分词器 + match一样。
- 同样：查出了 京北第一草原、卡缅斯克-沙赫京斯基
```json
{
	"query": {
		"bool": {
			"must": [{
				"query_string": {
					"default_field": "name.ik",
					"query": "京"
				}
			}],
			"must_not": [],
			"should": []
		}
	},
	"from": 0,
	"size": 1000,
	"sort": [],
	"aggs": {}
}
```

#### range  范围查询

```json
POST  /city_index/_search
{
	"query": {
		"bool": {
			"must": [{
				"range": {
					"gid": {
						"gt": "100",
						"lt": "200000"
					}
				}
			}],
			"must_not": [],
			"should": []
		}
	},
	"from": 0,
	"size": 5000,
	"sort": [],
	"aggs": {}
}
```

#### wildcard 通配符匹配
- 同样也是根据字段设置的分词器决定的，如果没设置，都是standard默认分词器， 汉字都会拆成单字。
- 比如搜索词汇是 ***北京***，默认分词器会拆成***北***和***京***， 这样wildcard 就匹配不到***北京***, 就查不到。
- 如果是ik分词器ik_max_word，北京 分词出来还是北京， 所以wildcard统配北京，就能查到包含***北京***的信息
- 如果搜索词汇是***京***呢？ 能被ik分词器分出一个京的词汇很少(像京北第一草原)，像北京，东京，南京等词汇都被ik拆分的。
- 如果搜索词汇是 \*京\*, wildcard 会认为像北京、东京、南京、京、京东等都可能是关键词，包含这些词的都会查出

#### prefix 前缀匹配
- 默认分词器， 比如 **河北** 会成为 ["河", "北"]，词组中在词组中找不到河北，所以匹配不出结果。
- 如果pinyin分词器，河北拼音分词包含hebei， 所以匹配拼音前缀是hebei的，可以找到
- 河北省、河北天下第一城 等信息

#### missing 判断不存在的字段

- 查询name为null的字段
- must_not 改为must就是查询存在name的数据
```json
GET /city_index/_search
{
  "query": {
    "bool": {
      "must": [],
      "must_not": [
        {
          "exists": {
            "field": "name"
          }
        }
      ],
      "should": [
        {
          "match_all": {}
        }
      ]
    }
  },
  "from": 0,
  "size": 250,
  "sort": [],
  "aggs": {}
}
```

#### fuzzy 是为了纠错的模糊查询
- 比如你查sky，输入错误了ski
- fuzziness是允许输错的字母个数。

```json
PUT fuzzyindex/_doc/1
{
  "content": "I like blue sky"
}


GET fuzzyindex/_search
{
  "query": {
    "match": {
      "content": {
        "query": "ski",
        "fuzziness": "1"
      }
    }
  }
}
```

#### 分词器测试 pinyin分词

```json
POST /city_index/_analyze
{
  "text":" 河北",
  "analyzer": "pinyin_analyzer"
}
```
- 结果如下
```json
{
  "tokens" : [
    {
      "token" : "b",
      "start_offset" : 0,
      "end_offset" : 0,
      "type" : "word",
      "position" : 0
    },
    {
      "token" : "bei",
      "start_offset" : 0,
      "end_offset" : 0,
      "type" : "word",
      "position" : 0
    },
    {
      "token" : "北京市",
      "start_offset" : 0,
      "end_offset" : 0,
      "type" : "word",
      "position" : 0
    },
    {
      "token" : "bjs",
      "start_offset" : 0,
      "end_offset" : 0,
      "type" : "word",
      "position" : 0
    },
    {
      "token" : "j",
      "start_offset" : 0,
      "end_offset" : 0,
      "type" : "word",
      "position" : 1
    },
    {
      "token" : "jing",
      "start_offset" : 0,
      "end_offset" : 0,
      "type" : "word",
      "position" : 1
    },
    {
      "token" : "s",
      "start_offset" : 0,
      "end_offset" : 0,
      "type" : "word",
      "position" : 2
    },
    {
      "token" : "shi",
      "start_offset" : 0,
      "end_offset" : 0,
      "type" : "word",
      "position" : 2
    }
  ]
}
```

#### 分词器测试 keyword
- keyword 不可分词，text可以分词。

```json
POST /city_index/_analyze
{
  "text":"北京市",
  "analyzer":"keyword"  // keyword 不可分词
  
}
```
-- 结果如下
```json
{
  "tokens" : [
    {
      "token" : "北京市",
      "start_offset" : 0,
      "end_offset" : 3,
      "type" : "word",
      "position" : 0
    }
  ]
}

```

#### 分词器测试 ik_max_word

```json
POST /city_index/_analyze
{
  "text":"北京市动物园",
  "analyzer": "ik_max_word" 
  
}
```
- 结果如下
```json
{
  "tokens" : [
    {
      "token" : "北京市",
      "start_offset" : 0,
      "end_offset" : 3,
      "type" : "CN_WORD",
      "position" : 0
    },
    {
      "token" : "北京",
      "start_offset" : 0,
      "end_offset" : 2,
      "type" : "CN_WORD",
      "position" : 1
    },
    {
      "token" : "市",
      "start_offset" : 2,
      "end_offset" : 3,
      "type" : "CN_CHAR",
      "position" : 2
    },
    {
      "token" : "动物园",
      "start_offset" : 3,
      "end_offset" : 6,
      "type" : "CN_WORD",
      "position" : 3
    },
    {
      "token" : "动物",
      "start_offset" : 3,
      "end_offset" : 5,
      "type" : "CN_WORD",
      "position" : 4
    },
    {
      "token" : "园",
      "start_offset" : 5,
      "end_offset" : 6,
      "type" : "CN_CHAR",
      "position" : 5
    }
  ]
}
```

#### 分词器测试 ik_smart

```json
POST /city_index/_analyze
{
  "text":"北京市动物园",
  "analyzer": "ik_smart"
}
```
- 结果如下
```json
{
  "tokens" : [
    {
      "token" : "北京市",
      "start_offset" : 0,
      "end_offset" : 3,
      "type" : "CN_WORD",
      "position" : 0
    },
    {
      "token" : "动物园",
      "start_offset" : 3,
      "end_offset" : 6,
      "type" : "CN_WORD",
      "position" : 1
    }
  ]
}
```

#### 分词器测试 standard (es默认分词)
```json
POST /city_index/_analyze
{
  "text":"北京市动物园",
  "analyzer": "standard" 
}
```
- 结果如下
```json
{
  "tokens" : [
    {
      "token" : "北",
      "start_offset" : 0,
      "end_offset" : 1,
      "type" : "<IDEOGRAPHIC>",
      "position" : 0
    },
    {
      "token" : "京",
      "start_offset" : 1,
      "end_offset" : 2,
      "type" : "<IDEOGRAPHIC>",
      "position" : 1
    },
    {
      "token" : "市",
      "start_offset" : 2,
      "end_offset" : 3,
      "type" : "<IDEOGRAPHIC>",
      "position" : 2
    },
    {
      "token" : "动",
      "start_offset" : 3,
      "end_offset" : 4,
      "type" : "<IDEOGRAPHIC>",
      "position" : 3
    },
    {
      "token" : "物",
      "start_offset" : 4,
      "end_offset" : 5,
      "type" : "<IDEOGRAPHIC>",
      "position" : 4
    },
    {
      "token" : "园",
      "start_offset" : 5,
      "end_offset" : 6,
      "type" : "<IDEOGRAPHIC>",
      "position" : 5
    }
  ]
}
```