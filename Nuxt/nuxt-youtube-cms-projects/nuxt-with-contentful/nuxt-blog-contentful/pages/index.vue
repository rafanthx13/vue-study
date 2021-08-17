<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-offset-2 is-8">
          <h1 class="title is-2">Latest Posts</h1>
          <hr>
          <h2
            v-for="(post, index) in posts"
              :key="index" class="title is-4">
            <nuxt-link :to="post.fields.slug">
              {{ post.fields.titile }}
            </nuxt-link>
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import client from '~/plugins/contentful';
export default {
  asyncData({ params }) {
    return client
      .getEntries({
        content_type: 'title', // CONTENT TYPE ID
        order: '-sys.createdAt',
      })
      .then(entries => {
        return { posts: entries.items };
      })
      .catch(e => console.error(e));
  },
  head: {
    title: 'Latest Posts',
  },
};
</script>
