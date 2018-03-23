<template>
    <div class="wrapperUser">
                <button type="button" class="showButton" ref="showButton" @click="show=!show">{{show?'展示你要的文章列表':'收起文章列表'}}</button>
                    <div :class="{'wrapperArticle':show,'wrapperArticle1':!show}">
                            <article v-for='item in articleLists'>
                                <header>
                                    <div>
                                        <router-link :to="{path:'/article',params:item._id}|urlFormat" :class="{'home_title':!isYejian,'home_title1':isYejian}">
                                        {{item.title}}
                                        </router-link>
                                    </div>
                                    <div class="wrapNameClassify">
                                        <div class="articleClassify" >{{item.classify}}</div>
                                        <div class="ArticleName"> Created by &mdash;&raquo; {{item.name}}</div>
                                    </div>
                                    <div>
                                        <p class="home_creatAt">{{item.created_at}}</p>
                                    </div>
                                </header>
                                <section :class="{'home_main':!isYejian,'home_main1':isYejian}">{{sliceContent(item.content)}}</section>
                                <footer>
                                    <router-link class="home_readMore" :to="{path:'/article',params:item._id}|urlFormat">阅读全文>></router-link>
                                </footer>
                            </article>

                            <p v-if="tishi" class="xingmu">{{tishi}}</p>
                            <p  class="xingmu">该条查询记录创建于{{baoliu}}</p> 
                            
            </div>
    </div>
</template>
<script>
import api from "../api/api.js";
export default {
  data() {
    return {
      show: true,
      tishi: null,
      loadingFlag: true,
      baoliu: null
    };
  },
  computed: {
    isYejian() {
      return this.$store.state.dangqian === "夜间模式";
    },
    articleLists() {
      var articleLists = this.$store.state.classify_articles;
      if (articleLists) {
        let classify = articleLists[0].classify;
        this.tishi = `有关${classify}标签的文章搜索完毕`;
        return articleLists;
      } else {
        this.tishi = "没有数据可以展示";
        return null;
      }
    }
  },
  methods: {
    sliceContent(content) {
      if (content.length < 135) {
        return content;
      }
      return content.slice(0, 135) + "....";
    }
  },
  mounted() {
    // this.baoliu = new Date().toUTCString();UTC时间快8小时
    this.baoliu = new Date().toLocaleString(); //本地化
  }
};
</script>

<style >
.wrapperUser article {
  padding-bottom: 1rem;
  border-bottom: 1px solid #d2d2d2;
  margin-bottom: 2rem;
}
.loadCircle {
  margin-top: 30px;
}
.showButton {
  width: 300px;
  height: 30px;
  border: 1px solid #aaa;
  border-radius: 5px;
  background-color: #aaa;
  box-shadow: 5px 5px 5px black;
  color: #fff;
  cursor: pointer;
  outline: none;
}
.xingmu {
  border: 1px dashed red;
  margin-top: 26px;
  margin-bottom: 20px;
}
.wrapperArticle {
  visibility: hidden;
}
.wrapperArticle1 {
  visibility: show;
}
.wrapNameClassify {
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.ArticleName {
  width: 137px;
  font-weight: 400;
  color: #aaa;
  padding: 0.8rem 0;
  margin-right: 1.6rem;
}
.articleClassify {
  cursor: pointer;
  width: 137px;
  font-weight: 400;
  color: #aaa;
  padding: 0.5rem 0;
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .main {
    width: 100%;
  }
  .wrapperUser {
    grid-row: 2/span 1;
    margin: 0 auto;
    padding-top: 10px;
    text-align: center;
  }
}

@media only screen and (min-width: 321px) and (max-width: 1024px) {
}

@media only screen and (min-width: 1029px) {
  .main {
  }
  .wrapperUser {
    grid-column: 2/span 1;
    grid-row: 2/span 1;
    padding-top: 10px;
    text-align: center;
  }
}

h2,
h4 {
  margin: 0;
}
.home_wrapper {
  margin: auto;
  list-style: none;
}
.home_wrapper article {
  padding-bottom: 1rem;
  border-bottom: 1px solid #d2d2d2;
  margin-bottom: 2rem;
}
.home_title {
  display: block;
  font-size: 2.6rem;
  font-weight: 400;
  color: #404040;
  padding: 0.8rem 0;
}
.home_title:hover {
  opacity: 0.5;
}
.home_title1 {
  display: block;
  font-size: 2.6rem;
  font-weight: 400;
  color: #aaa;
  padding: 0.8rem 0;
}
.home_title1:hover {
  opacity: 0.5;
}
.home_creatAt {
  font-family: "Comic Sans MS", curslve, sans-serif;
  padding: 0.6rem 0;
  font-size: 1.6rem;
  color: #7f8c8d;
}
.home_main {
  font-size: 1.6rem;
  color: #34495e;
  line-height: 1.6em;
  padding: 0.6rem 0;
  overflow: auto;
  height: 200px;
}
.home_main1 {
  font-size: 1.6rem;
  color: #aaa;
  line-height: 1.6em;
  padding: 0.6rem 0;
  overflow: auto;
  height: 200px;
}
footer {
  text-align: right;
}

.home_readMore:hover {
  opacity: 0.6;
}
@media screen and (max-width: 786px) {
  .home_title {
    font-size: 2.2rem;
  }
  .home_creatAt {
    font-size: 1.6rem;
  }
}
@media screen and (max-width: 480px) {
  .home_main {
    font-size: 1.4rem;
  }
  .home_main1 {
    font-size: 1.4rem;
  }
}

pre {
  white-space: pre-wrap;
}
pre code {
  color: #8492a6;
  display: block;
  background: #23241f;
  font: 16px Consolas, "Liberation Mono", Menlo, Courier, monospace;
  border-radius: 5px;
  max-width: 100%;
  line-height: 1.5em;
  padding: 0.4rem 0.6rem;
  overflow-x: auto;
  overflow-y: auto;
}
</style>