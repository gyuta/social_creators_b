<template>
  <div>
    <div class="main">
      <div class="title">
        僕の人生はゴボウが全てだった
      </div>
      <div class="date">
        2020/8/25 9:19
      </div>
      <div class="body">
        {{ body }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Story',
  data() {
    return {
      body: `
        大袈裟な、と思った方もいるかもしれない。

Kれど、大袈裟でもなく、冗談でもなく、ゴボウは僕の人生の全てだった、と店主のごぼりんさんは語った。

幼少期の彼は大の野菜嫌い。

彼の野菜嫌いにはご両親も手を焼いたという。
あの手この手で野菜を食べさせようとしたが、どうしても食べられなかった。

そんな「僕が今、こうして八百屋をしているんだから、人生わからない揉んだよね」とごぼりんさんは笑う。

彼の転機は小学５年生の時。

・・・・・・・・・・・・・・・・`
    }
  }
}
</script>

<style lang='scss' scoped>
.main {
  padding: 20px;

  .title {
    border-bottom: black solid 1px;
    font-size: 20px;
  }

  .date {
    text-align: right;
    font-size: 13px;
  }

  .body {
    white-space: pre-line;
  }
}
</style>