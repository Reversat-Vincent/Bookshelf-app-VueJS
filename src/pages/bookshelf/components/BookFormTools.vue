<script>
export default {
  name: 'BookFormTools',
  props: {
    book: { required: true, type: Object },
    optionalTools: { default: () => [], type: Array },
  },
  emits: ['delChildToBook'],
  data() {
    return {
      deletable: false,
    }
  },
  mounted() {
    this.deletable = this.book.childs ? !this.book.childs.length : true
  },
  watch: {},
  methods: {},
  computed: {},
}
</script>

<template>
  <div class="book-tools">
    <app-btn
      v-if="this.$route.params.id !== undefined"
      icon="delete"
      @click="$emit('delChildToBook', book)"
      :disabled="!deletable"
    >
      <app-tooltip v-if="!deletable"> This book has related books </app-tooltip>
      <app-tooltip v-else> Delete </app-tooltip>
    </app-btn>
    <app-btn
      v-if="optionalTools.includes('open') && book.id != null"
      icon="open_in_new"
      :to="{ name: 'book', params: { id: book.id } }"
    >
      <app-tooltip> Open </app-tooltip>
    </app-btn>
  </div>
</template>

<style scoped>
.book-tools > .app-btn {
  min-width: fit-content;
}
</style>
