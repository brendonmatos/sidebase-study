<script setup lang="ts">
const { $client } = useNuxtApp()

const hello = await $client.hello.useQuery({ text: 'client' })

const posts = await $client.getPosts.useQuery()

const newPost = reactive({
  content: ''
})

const createPost = async () => {
  await $client.createPost.useQuery({
    content: newPost.content
  })
  newPost.content = ''

  await posts.refresh()
}

</script>

<template>
  <div>
    <div>
      <!-- As `superjson` is already pre-configured, we can use `time` as a `Date` object without further deserialization 🎉 -->
      tRPC Data: "{{ hello.data.value?.greeting }}" send at "{{ hello.data.value?.time.toLocaleDateString('en-EN') }}".
    </div>

    <div>
      <div v-for="post of posts.data.value?.items" :key="post.id">
        <p>{{ post.content }}</p>
      </div>

      <div>
        <textarea v-model="newPost.content" />
        <button @click="createPost()">
          Criar
        </button>
      </div>
    </div>
  </div>
</template>
