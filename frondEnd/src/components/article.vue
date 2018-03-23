<template lang="html">
    <div class="articleWrapper">
        <el-button type="primary" class="el-icon-arrow-left" @click="toHome" plain></el-button>
        <div class="articleArea">
            <article v-loading.fullscreen.lock="loading3"  element-loading-text="加载中" >
                <header class="header">
                    <div :class="{'home_title':!isYejian,'home_title1':isYejian}">{{oneArticle.title}}</div>
                    <div class="wrapNameClassify">
                          <div class="articleClassify"  @click="getArticleListByClassify(oneArticle.classify)">{{oneArticle.classify}}</div>
                          <div class="ArticleName"> Created by &mdash;&raquo; {{oneArticle.name}}</div>
                    </div>
                    <div>
                        <p class="home_creatAt">{{oneArticle.created_at}}</p>
                    </div>
                </header>
                <section v-html="oneArticle.contentToMark" :class="{'home_main_article':!isYejian,'home_main1_article':isYejian}"></section>
            </article>
        </div>
       <el-button v-if="isTheCreator" type="primary"  size="small"class="editBtn el-icon-edit" @click="toEdit" plain></el-button>
       <el-button v-if="isTheCreator" type="primary" size="small" class="deleteBtn el-icon-delete" :loading="load" @click="toDelete" plain></el-button>
        
        <div class="commitArea">
            <h1 style="margin:20px 0px 20px 0px;">请输入评论:</h1>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入评论"
                v-model="commitContent">
            </el-input>
            <el-button type="primary" size="small" style="margin:20px 0px 20px 0px;" :loading="isLoading" @click="sendCommit">发送评论</el-button>
        </div>
        <div v-if="!haveCommit" class="haveCommitTip">
            <p>{{message}}</p>
        </div>
        <div class="showCommit" v-if="haveCommit" >
            <ul>
                <li v-for="commit in commits" >
                    <p>
                        {{commit.commitName}}   :
                    </p>
                    <p>
                        {{commit.content}}
                    </p>
                    <p>
                        {{commit.commitTime}}
                    </p>
                </li>
            </ul>
        </div>
        <!--
         <editBtn></editBtn> -->
    </div>
</template>
<script>
import api from "../api/api.js";
// import backBtn from './backBtn.vue'
// import editBtn from './editBtn.vue'
export default {
  data() {
    return {
      oneArticle: {},
      loading3: true,
      creator: "",
      load: false,

      isLoading: false,
      commits: [],
      commitContent: "",
      message: "",
      haveCommit: false
    };
  },
  computed: {
    isYejian() {
      return this.$store.state.dangqian === "夜间模式";
    },
    isTheCreator() {
      return this.creator == this.$store.state.message;
    }
  },
  mounted() {
    api
      .getOneArticle({ id: this.$route.params.id })
      .then(({ data: { code, oneArticle } }) => {
        if (code === 200) {
          setTimeout(() => {
            this.loading3 = false;
            this.oneArticle = oneArticle;
            this.$store.dispatch("CURRENT_ARTICLE", oneArticle);
            this.creator = oneArticle.name;
          }, 500);
        } else {
          console.log("未查询到文章");
        }
      })
      .catch(err => {
        console.log(`文章详情页请求服务端发生错误:${err}`);
      });
    this.getCommits();
  },
  methods: {
    toEdit() {
      this.$router.push({ path: "/toRewritePage" });
    },
    toHome() {
      this.$router.push({ path: "/" });
    },
    toDelete() {
      let currentArticle = this.$store.state.current_article;
      let id = currentArticle._id;
      this.$confirm("确认删除吗?", "友情提示", {})
        .then(() => {
          this.load = true;
          api
            .deleteArticle({ id: id })
            .then(({ data: { code, message } }) => {
              this.load = false;
              if (code == 200) {
                console.log("文章删除完成");
                this.$router.push({ path: "/" });
              }
            })
            .catch(error => {});
        })
        .catch(error => {
          console.log("这是element(confirm)的error信息");
        });
    },
    getArticleListByClassify(classifyName) {
      if (classifyName) {
        return api
          .getArticleListByClassify({ classifyName })
          .then(({ data: { code, articleLists } }) => {
            if (code == 200) {
              this.$store.dispatch("CLASSIFY_ARTICLES", articleLists);
              this.$router.push({ path: "/show" });
            } else {
              console.log("getByClassify error");
            }
          })
          .catch(error => {
            console.log("error happen " + error);
          });
      }
    },
    sendCommit() {
      if (!this.commitContent) {
        this.$notify({
          title: "提示",
          message: "评论不得为空",
          offset: 400,
          duration: 2000
        });
        return false;
      }
      this.isLoading = true;
      let commitTime = new Date().toLocaleString();
      api
        .sendCommit({
          commitName: this.$store.state.message,
          content: this.commitContent,
          commitTime: commitTime,
          relatedArticle: this.$route.params.id
        })
        .then(({ data: { code, message } }) => {
          this.isLoading = false;
          if (code == 200) {
            // console.log('发送评论成功'+message);
            this.$alert(message, "提示", {
              confirmButtonText: "确定"
            });
          } else {
            this.$notify.error({
              title: "提示",
              message: message,
              duration: 2000,
              offset: 100
            });
          }
        })
        .catch(err => {
          console.log("sendCommit happend error:", err.toString());
        });
    },
    getCommits() {
      let articleId = this.$route.params.id;
      if (!articleId) {
        return false;
      }
      return api
        .getCommit({ articleId: articleId })
        .then(({ data: { code, message } }) => {
          if (code == 200) {
            this.haveCommit = true;
            this.commits = this.commits.concat(message);
          } else {
            this.haveCommit = false;
            this.message = message;
            console.log("getCommit error " + message);
          }
        })
        .catch(err => {
          console.log("getCommit happend error", err.toString());
        });
    }
  }
};
</script>

<style>
pre {
  white-space: pre-wrap;
}
p code {
  color: #8492a6;
  background: #23241f;
  font: 16px Consolas, "Liberation Mono", Menlo, Courier, monospace;
  border-radius: 5px;
  line-height: 1.5em;
  padding: 0.4rem 0.6rem;
  overflow-x: auto;
}

article pre code {
  color: #8492a6;
  display: block;
  background: #23241f;
  font: 16px Consolas, "Liberation Mono", Menlo, Courier, monospace;
  border-radius: 5px;
  max-width: 100%;
  line-height: 1.5em;
  padding: 0.4rem 0.6rem;
  overflow-x: auto;
}

.commitArea {
  margin-top: 220px;
}
.showCommit li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.showCommit li {
  list-style: none;
  border: 1px dashed red;
  margin: 10px 0px 10px 0px;
}
.showCommit p:nth-child(2) {
  text-indent: 30px;
}
.showCommit p:nth-child(3) {
  align-self: flex-end;
}
.haveCommitTip {
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #777;
}
.articleWrapper {
  user-select: none;
  grid-row: 2/span 1;
  margin: 0 auto;
  padding-top: 10px;
}
.header {
  text-align: center;
  display: flex;
  flex-direction: column;
}
.ArticleName {
  align-self: flex-end;
  font-weight: 400;
  color: #aaa;
  padding: 0.8rem 0;
  margin-right: 1.6rem;
}
.wrapNameClassify {
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.articleClassify {
  cursor: pointer;
  width: 137px;
  font-weight: 400;
  color: #aaa;
  padding: 0.5rem 0;
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .articleWrapper {
    width: 100%;
    margin-top: 56px;
    flex-direction: row;
    justify-content: space-around;
  }
  .backBtn {
    display: none;
  }
}

@media only screen and (min-width: 1029px) {
  .articleWrapper {
    width: 1000px;
    margin-left: 260px;
  }
  .backBtn {
    width: 100px;
    height: 50px;
  }
}

.articleArea {
  flex: 1;
}

.editBtn {
  width: 55px;
  height: 45px;
}

.deleteBtn {
  width: 55px;
  height: 45px;
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

.home_main_article {
  text-indent: 1.6rem;
  font-size: 1.6rem;
  color: #34495e;
  line-height: 1.6em;
  padding: 5rem 0;
}
.home_main1_article {
  text-indent: 1.6rem;
  font-size: 1.6rem;
  color: #aaa;
  line-height: 1.6em;
  padding: 5rem 0;
}
</style>