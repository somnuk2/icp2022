<template>
  <div class="row justify-center items-center q-ma-xs">
    <h6 class="q-ma-xs">Individualized Career Planning (ICP)</h6>
  </div>
  <div class="row justify-center items-center q-ma-xs">
    <h5 class="q-ma-xs">การวางแผนอาชีพเฉพาะบุคคล</h5>
  </div>
  <div class="row justify-center items-center q-ma-sm">
    <q-img
      v-if="$store.getters.myAuthenticate && $store.getters.myStatus == 'user'"
      placeholder-src="~assets/images/pics_topic_103.jpg"
      src="~assets/images/user.jpg"
      spinner-color="white"
      :ratio="16 / 9"
      style="height: fit-content"
    ></q-img>
    <q-img
      v-if="$store.getters.myAuthenticate && $store.getters.myStatus == 'admin'"
      placeholder-src="~assets/images/pics_topic_103.jpg"
      src="~assets/images/admin.jpg"
      spinner-color="white"
      :ratio="16 / 9"
      style="height: fit-content"
    ></q-img>
    <q-img
      v-if="$store.getters.myAuthenticate && $store.getters.myStatus == 'suser'"
      placeholder-src="~assets/images/pics_topic_103.jpg"
      src="~assets/images/suser.jpg"
      spinner-color="white"
      :ratio="16 / 9"
      style="height: fit-content"
    ></q-img>
    <q-img
      v-if="!$store.getters.myAuthenticate"
      placeholder-src="~assets/images/pics_topic_103.jpg"
      src="~assets/images/pics_topic_103.jpg"
      spinner-color="white"
      :ratio="16 / 9"
    ></q-img>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<style></style>
