<template>
    <v-container fluid class="text-center mt-15 py-12">
      <v-avatar
        size="250"
      >
        <v-img sizes="250" src="https://tistory3.daumcdn.net/tistory/3932093/attach/011129f3c339412f95e66b56125cb452" />
      </v-avatar>
        <p id="explain">
          프론트엔드 샘플입니다
        </p>
      <div />
    </v-container>
</template>

<script>
  export default {
    name: 'Home',
  }
</script>

<style>
  #explain{
    font-size: 25px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color:#439FCC
}
</style>
