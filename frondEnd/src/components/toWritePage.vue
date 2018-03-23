<template>
    <div class="wrapper">
        <div :class="{'main1':isYejian,'main':!isYejian}">
                <el-row :class="{'styleman':isYejian}">
                    <el-col :span="24">
                        <el-form ref="articleCreate" :model="article" :rules="createRules" >
                            <el-row style="margin-top:20px">
                                <el-col :span='10' :push="1">
                                    <el-form-item label="文章标题" label-width="90px" prop="title" id="wenzhang">
                                        <el-input v-focus v-model="article.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :push="3" >
                                    <el-form-item label="所属分类" label-width="90px" prop="classify"  >
                                    <el-select v-model="article.classify" placeholder="请选择分类">
                                        <el-option v-for="item in classifyList" :label="item.classify" :value="item.classify"
                                             :key="item.classify"></el-option>
                                    </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row style="margin-top:20px">
                                <el-col :span='12'>
                                    <!-- 编辑区 -->
                                    <el-form-item class="show1" prop="content" >
                                    <el-input type="textarea"  v-model="article.content" :rows="25"  placeholder="请在此处编辑文章"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='12'>
                                    <!-- 展示区 -->
                                    <div :class="{'showArea1':isYejian,'showArea':!isYejian}" v-html="markedToHtml"></div>
                                </el-col>
                            </el-row>
                            <el-form-item style="padding:20px 20px 0 0 " >
                                <el-button type="primary" style="float:right;" size='small' @click="createArticle" :loading="load">{{btnText}}</el-button>
                                <el-button style="float:right;margin-right:10px" size='small' @click="cancel" :loading="load">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

        </div>
    </div>
</template>
<script>
import api from "../api/api.js";
import marked from "marked";
import hlj from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
export default {
  data() {
    return {
      article: {
        classify: ["生活琐事1", "技术文章1", "个人心得1"],
        title: "",
        content: ""
      },
      classifyList: [
        { classify: "生活琐事" },
        { classify: "技术文章" },
        { classify: "个人心得" }
      ],
      createRules: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        classify: [{ required: true, message: "请选择分类", trigger: "change" }]
      },
      load: false,
      btnText: "立即发布"
    };
  },
  methods: {
    createArticle() {
      this.$refs.articleCreate.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗?", "提示", {})
            .then(() => {
              this.load = true;
              this.btnText = "发布中";
              api
                .createArticle({
                  name: this.$store.state.message,
                  contentToMark: this.markedToHtml,
                  ...this.article
                })
                .then(({ data: { code, message } }) => {
                  this.btnText = "立即发布";
                  this.load = false;
                  if (code == 200) {
                    console.log("文章发布成功");
                    this.$router.push({ path: "/" });
                  } else if (code == 401) {
                    console.log("文章发生错误(去登录)");
                    setTimeout(() => {
                      this.$router.push({ path: "/login" });
                    }, 500);
                    return false;
                  }
                });
            })
            .catch(error => {
              //* console.log('文章发生错误,'+error);
            });
        }
      });
    },
    cancel() {
      this.$router.push({ path: "/toWritePage" });
    }
  },
  computed: {
    markedToHtml() {
      marked.setOptions({
        highlight: function(code) {
          return hlj.highlightAuto(code).value;
        }
      });
      return marked(this.article.content);
    },
    isYejian() {
      return this.$store.state.dangqian === "夜间模式";
    }
  }
};
</script>
<style>
.el-textarea__inner {
  /*覆盖element内置样式*/
  display: block;
  resize: vertical;
  padding: 5px 7px;
  line-height: 1.5;
  width: 100%;
  color: #1f2d3d;
  background-color: #fff;
  background-image: none;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  min-height: 56px;
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .main {
    width: 100%;
  }
  .main1 {
    width: 100%;
    background-color: darkgray;
  }
  .wrapper {
    margin: 0 auto;
    padding-top: 10px;
    text-align: center;
  }
}

@media only screen and (min-width: 1029px) {
  .main {
    width: 1000px;
  }
  .main1 {
    width: 1000px;
    background-color: darkgray;
  }
  .wrapper {
    grid-column: 2/span 1;
    grid-row: 2/span 1;
    margin: 0 auto;
    padding-top: 10px;
    text-align: center;
  }
}

.styleman input {
  background: #eee;
}
.styleman textarea {
  background: #eee;
}
.styleman div {
}

.wenzhang {
  color: #fff;
}
.show1 {
  margin: 11px;
  width: 100%;
  padding: 0;
  margin: 0;
}
.showArea {
  background: #fff;
  margin: 0 0 0 20px;
  height: 526px;
  overflow-y: auto;
  border: 1px solid #aaa;
}
.showArea1 {
  background-color: #eee;
  margin: 0 0 0 20px;
  height: 526px;
  overflow-y: auto;
  border: 1px solid #aaa;
}

.showArea pre code {
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
.showArea1 pre code {
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
</style>