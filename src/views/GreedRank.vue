<template>
  <div>
    <Title title="挨拶ランク" :showBackBtn='true' ></Title>
    <div class="wrap">
      <div class="item" v-for='item of 8' :key='item'>
        <div class="name"></div>
        <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fd1f5hsy4d47upe.cloudfront.net%2F45%2F450e4db04fd0a279c25f65f5853f6f79_t.jpeg&imgrefurl=https%3A%2F%2Fwww.photo-ac.com%2Fmain%2Fsearch%3Fq%3D%25E9%25A3%25B2%25E9%25A3%259F%25E5%25BA%2597%26srt%3Ddlrank&tbnid=cRAbHgr8q1DKoM&vet=12ahUKEwiZhK6t8crsAhXNAaYKHcBmD7sQMygAegUIARChAQ..i&docid=mZHVj0dj6rHgzM&w=449&h=340&q=%E5%BA%97%20%E3%83%95%E3%83%AA%E3%83%BC%E7%94%BB%E5%83%8F&ved=2ahUKEwiZhK6t8crsAhXNAaYKHcBmD7sQMygAegUIARChAQ" alt="" class="icon">
        <div class="count">挨拶回数　5 回</div>
        <div class="note">次の挨拶ランクまで後5回</div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>
</template>

<script>
import Title from '../components/Title'

export default {
  name: 'GreedRank',
  components: {Title},
}
</script>

<style>

</style>