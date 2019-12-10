<template>
  <div class="searchPage">
    <div class="page">
      <img
        src="../assets/img/svg-icons/返回.svg"
        @click="onBackPage"
        class="back"
      />
      <input type="text" placeholder="请输入搜索内容" />
      <button size="mini">搜索</button>
    </div>
    <div class="history">
      <div class="top">
        <h3>历史搜索</h3>
        <img src="../assets/img/svg-icons/垃圾箱.svg" alt="" class="laji" />
      </div>
      <div class="notes">
        <div class="font">
          <div class="left" v-for="(item, index) in notesList" :key="index">
            <a href="/goodsList" class="zao">{{ item }}</a>
            <label>|</label>
          </div>
        </div>
        <div class="right">
          <a
            href=""
            v-for="(item, index) in notesList1"
            :key="index"
            class="zao"
            >{{ item }}</a
          >
          <a href="" class="last">查看更多历史></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      notesList: [
        "汽配商城",
        "汽配人网百度快照",
        "跃进汽配图片-最新高清跃进汽配图片大全-汽配人图片网",
        "汽配图片、汽配素材、汽配模板等",
        "汽配图片",
        "汽配素材",
        "汽配模板"
      ],

      notesList1: [
        "汽配商城",
        "汽配人网百度快照",
        "跃进汽配图片-最新高清跃进汽配图片大全-汽配人图片网",
        "汽配图片、汽配素材、汽配模板等",
        "汽配图片",
        "汽配素材"
      ]
    };
  },
  methods: {
    onBackPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.searchPage {
  width: 100%;
  height: 60px;
  border: 1px solid;
}
.page {
  width: 100%;
  height: 60px;
  border-bottom: 1px soldi #eee;
  position: relative;
}
.back {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  left: 5px;
}
input {
  position: absolute;
  top: 5px;
  left: 70px;
  width: 500px;
  border: 1px solid #888;
  height: 45px;
  border-radius: 10px;
  font-size: 24px;
  text-indent: 10px;
}
.history {
  width: 100%;
  height: 400px;
}
.top {
  height: 55px;
  margin-top: 10px;
  position: relative;
}
h3 {
  font-size: 40px;
  position: absolute;
  bottom: 10px;
  font-weight: bold;
}
.laji {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 10px;
  bottom: 5px;
}
.notes {
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: row;
  column-count: 2;
  word-break: break-all;
}
.font {
  width: 50%;
  height: 350px;

  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.left {
  position: relative;
}
.zao {
  font-size: 30px;
  color: #000;
  text-decoration: none;
  padding: 10px;

  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
label {
  font-size: 22px;
  position: absolute;
  right: 0;
  top: 15px;
  color: #888;
}
.right {
  width: 50%;
}
.last {
  font-size: 32px;
  color: #888;
  text-decoration: none;
  padding: 10px;
}
a:hover {
  color: #f40;
}
button {
  position: absolute;
  right: 80px;
  width: 90px;
  height: 46px;
  top: 6px;
  font-size: 24px;
}
</style>
