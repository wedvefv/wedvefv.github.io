(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{428:function(a,e,s){"use strict";s.r(e);var t=s(56),n=Object(t.a)({},(function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"cmake用法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cmake用法"}},[a._v("#")]),a._v(" cmake用法")]),a._v(" "),s("ol",[s("li",[s("p",[a._v("指定最小的cmake版本")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("cmake_minmum_required(VERSION 2.8)\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("设置项目名称")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("project(main)\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("默认定义两个变量main_BINARY_DIR 和main_SOURCE_DIR 等价于PROJECT_BINARY_DIR、PROJECT_SOURCE_DIR")])]),a._v(" "),s("li",[s("p",[a._v("设置编译类型")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("add_executable(main main.c)\nadd_library(add_a STATIC add.c) // 生成静态库 add_library(add_so SHARED add.c)// 生成动态库\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("add_library默认是生成静态库的")])]),a._v(" "),s("li",[s("p",[a._v("搜索子目录下全部cpp文件")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("aux_source_directory(. SRC_LIST)\nadd_library(main ${SRC_LIST})\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])])])])])}),[],!1,null,null,null);e.default=n.exports}}]);