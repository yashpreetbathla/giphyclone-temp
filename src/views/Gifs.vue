<template>
  <section id="app" class="section container">
    <div class="container-fluid">
      <h2 class="title">Search</h2>

      <input
        type="text"
        class="input"
        name="query1"
        v-model="query"
        @keyup="searchGifs"
      />
    </div>
    <!-- If no results found. -->

    <div class="nores" v-if="CheckIfNoResultSearch">
      <kbd> No results found , try again </kbd>
    </div>

    <!-- Results End -->

    <!-- Search -->

    <div class="container-fluid">
      <div class="card-columns">
        <div v-if="searchedGifs && contextSwitch === 'search'">
          <div v-for="gif in searchedGifs" :key="gif">
            <div class="card">
              <a :href="gif.url + '/fullscreen'" target="_blank">
                <img
                  class="card-img-top"
                  :src="gif.images.original.url"
                  :height="gif.images.original.height"
                  :width="gif.images.original.width"
                />
              </a>
              <!-- <a 
            class="gif-user" 
            v-if="gif.user" 
            :href="gif.user.profile_url"
            target="_blank">
              <img :src="gif.user.avatar_url" height="40" width="40">
              {{ gif.user.display_name }}
          </a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Search End. -->

    <!-- Trending Section -->

    <div class="container-fluid">
      <div
        class="trendingtext"
        v-if="trendingGifs && contextSwitch === 'trending'"
      >
        <kbd> Trending </kbd>
      </div>

      <div style="display: flex; flex-direction: row; min-width: 100%">
        <div
          v-for="gifGridView in gifGrid"
          :key="gifGridView"
        >
          <div v-for="gif in gifGridView" :key="gif" style="width: 100%; padding: 3px;margin:1px;">
            <a :href="gif.url + '/fullscreen'" target="_blank">
              <img style="width: 100%; border: 2px solid grey; padding: 2px;margin:2px;"
                :src="gif.images.original.url"
                :height="gif.images.original.height"
                :width="gif.images.original.width"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Trending Section Ends.  -->
    <div v-if="!isLoading && HaveYouSearchedYet && contextSwitch === 'search'">
      <div class="trendingtext">
        <kbd>
          <span class="spinner-border spinner-border-sm"></span>
          Loading...
        </kbd>
      </div>
    </div>

    <!-- Loading...  -->
    <div v-if="CheckIfFetchingTrending && contextSwitch === 'trending'">
      <div class="trendingtext">
        <kbd>
          <span class="spinner-border spinner-border-sm"></span>
          Loading...
        </kbd>
      </div>
    </div>
  </section>
</template>

<script>
// const staticName = 'staticCache';
export default {
  data() {
    return {
      apiUrl: "https://api.giphy.com/v1/gifs",
      apiKey: "gg3g9zjzjBHKW5bokVjFJ8Qc7GfTh546",
      searchedGifs: [],
      trendingGifs: [],
      isLoading: false,
      query: "",
      SearchOffset: 0,
      TrendingOffset: 0,
      HaveYouSearchedYet: false,
      totalCountSearch: 0,
      totalCountTrending: 0,
      CheckIfNoResultSearch: false,
      CheckIfFetchingTrending: true,
      contextSwitch: "",
      justChecking: [],
      temptoPush: [],
      gifGrid: [],
      columns: 4,
    };
  },
  methods: {
    onScrollDownTrending() {
      this.searchfalse = true;
      const url = `${this.apiUrl}/trending?api_key=${this.apiKey}&limit=8&offset=${this.TrendingOffset}`;

      // console.log('Hi in scroll down' + url);

      this.isLoading = false;
      this.CheckIfFetchingTrending = true;
      this.fetchHandler(url)
        .then((data) => {
          this.trendingGifs.push(...data.data);
          let updatedData = data.data;
          let x = 0;
          for (let i = 0; i < this.columns; i++) {
            this.gifGrid[i].push(
              ...updatedData.slice(x, x + updatedData.length / this.columns)
            );
            x += updatedData.length / this.columns;
          }
          console.log(this.gifGrid);
          // console.log(this.trendingGifs.length, this.trendingGifs);
          // console.log(data.data);
          this.isLoading = true;
          this.TrendingOffset += 8;
          this.CheckIfFetchingTrending = false;

          window.localStorage.removeItem("trendingGifslocal");

          window.localStorage.setItem(
            "trendingGifslocal",
            JSON.stringify(this.trendingGifs)
          );

          this.temptoPush = data.data;
          this.justChecking.push(Object.assign({}, this.temptoPush));
          console.log("checking", this.justChecking);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async fetchTrendingGifs() {
      this.queried = true;
      this.searchfalse = true;
      const url = `${this.apiUrl}/trending?api_key=${this.apiKey}&limit=16`;
      // console.log(url);
      this.isLoading = false;
      this.contextSwitch = "trending";
      let data = await this.fetchCacher(url);

      console.log(data);
      // data = data[0];
      this.totalCountTrending = data.pagination.total_count;
      this.trendingGifs = data.data;
      let x = 0;
      for (let i = 0; i < this.columns; i++) {
        this.gifGrid.push(
          this.trendingGifs.slice(
            x,
            x + this.trendingGifs.length / this.columns
          )
        );
        x += this.trendingGifs.length / this.columns;
      }
      this.isLoading = true;
      this.TrendingOffset += 16;

      this.temptoPush = data.data;
      this.justChecking.push(Object.assign({}, this.temptoPush));
      console.log("checking", this.justChecking);
      window.localStorage.setItem(
        "trendingGifslocal",
        JSON.stringify(this.trendingGifs)
      );
    },
    async fetchCacher(url) {
      let data = await this.fetchHandler(url);
      data && window.localStorage.setItem(url, JSON.stringify(data));
      return data;
    },
    async fetchHandler(url) {
      if (window.localStorage.getItem(url))
        return JSON.parse(window.localStorage.getItem(url));
      let res = await fetch(url);
      res = await res.json();
      return res;
    },
    onScrollDownSearch() {
      this.searchfalse = true;
      const url = `${this.apiUrl}/search?api_key=${this.apiKey}&q=${this.query}&limit=8&offset=${this.SearchOffset}`;


      this.isLoading = false;
      this.HaveYouSearchedYet = true;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.searchedGifs.push(...data.data);
          this.isLoading = true;
          this.SearchOffset += 8;
          this.HaveYouSearchedYet = false;

          window.localStorage.removeItem("trendingGifslocal");
          window.localStorage.setItem(
            "searchedGifslocal",
            JSON.stringify(this.searchedGifs)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    searchGifs: function () {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        // your action

        this.queried = true;
        const url = `${this.apiUrl}/search?api_key=${this.apiKey}&q=${this.query}&limit=16`;
        // console.log(url);
        if (this.query.trim() === "") {
          this.searchfalse = false;
          return;
        }
        this.contextSwitch = "search";

        this.isLoading = false;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            this.totalCountSearch = data.pagination.total_count;
            this.searchedGifs = data.data;
            this.isLoading = true;
            this.HaveYouSearchedYet = false;
            this.SearchOffset += 16;
            if (this.searchedGifs)
              window.localStorage.setItem(
                "searchedGifslocal",
                JSON.stringify(this.searchedGifs)
              );
            if (this.searchedGifs.length === 0) {
              this.CheckIfNoResultSearch = true;
            } else {
              this.CheckIfNoResultSearch = false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, 600);
    },
    scroll() {
      window.onscroll = () => {
        if (
          (window.innerHeight + window.scrollY) / document.body.offsetHeight >=
            0.93 &&
          this.isLoading
        ) {
          if (
            this.SearchOffset < this.totalCountSearch &&
            this.contextSwitch === "search"
          )
            this.onScrollDownSearch();
          if (this.contextSwitch === "trending") this.onScrollDownTrending();
        }
      };
    },
  },
  watch: {
    searchedGifs() {
      if (this.searchedGifs.length === 0) {
        this.contextSwitch = "trending";
      }
    },
  },
  created() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 640) this.columns = 2;
    else this.columns = 4;

    this.fetchTrendingGifs();
  },
  mounted() {
    this.scroll();
  },
};
</script>
<style>
@media (min-width: 701px) {
  .card-columns {
    column-count: 4;
  }
}

@media screen and (min-width: 300px) and (max-width: 700px) {
  .card-columns {
    margin: 0.5rem;
    column-count: 1;
  }
}
.firtest {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 4px;
}

.first_0 {
  flex: 25%;
  max-width: 25%;
  padding: 0 4px;
}

.first_0 a img {
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
}

.nores {
  margin-bottom: 100px;
}
.inner-container {
  display: flex;
  flex-direction: column;
  margin: 5px;
}
input[name="query1"] {
  margin-bottom: 30px;
}
.gif-box {
  position: relative;
  background: #333;
}
.gif-user {
  display: flex;
  align-items: center;
  position: absolute;
  left: 15px;
  bottom: 15px;
}
.gif-user img {
  margin-right: 8px;
}
.trendingtext {
  margin-bottom: 20px;
}
</style>