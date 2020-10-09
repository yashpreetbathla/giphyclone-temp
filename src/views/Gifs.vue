<template>
  <section id="app" class="section container">

    <div class="container-fluid">
        <h2 class="title">Search</h2>

        <input type="text" class="input" name="query1" v-model="query" @keyup="searchGifs">
        </div> 
      <!-- If no results found. -->

         <div class = "nores" v-if="CheckIfNoResultSearch">
            <kbd>
              No results found , try again
            </kbd>
        </div>
        
          <!-- Results End -->

       <!-- Search -->
   
  <div class="container-fluid">
        <div class="card-columns">
        
     <div  v-if="searchedGifs  && contextSwitch === 'search'">
      <div v-for="gif in searchedGifs" :key="gif">
        <div class="card">
          <a :href="gif.url+'/fullscreen'" target="_blank">
            <img class="card-img-top" :src="gif.images.original.url"
             :height="gif.images.original.height" :width="gif.images.original.width">
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

 <div class="container-fluid ">
  <div class="trendingtext" v-if="trendingGifs  && contextSwitch === 'trending'">
      <kbd>
      Trending
    </kbd>
      </div>

        
   
    <div v-if="trendingGifs  && contextSwitch === 'trending'">
       

      <div class="container-fluid ">
        <div class="card-columns">
      <div class="card" v-for="gif in trendingGifs" :key="gif">
        <!-- <div class="card" > -->
          <a :href="gif.url+'/fullscreen'"  target="_blank" >
            <img  class="lazyload" :src="gif.images.original.url"
             :height="gif.images.original.height" :width="gif.images.original.width">
          </a>
          <!-- <a 
            class="gif-user" 
            v-if="gif.user" 
            :href="gif.user.profile_url"
            target="_blank">
              <img :src="gif.user.avatar_url" height="40" width="40">
              {{ gif.user.display_name }}
          </a> -->
        <!-- </div> -->
      </div>
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
    <div v-if="CheckIfFetchingTrending  && contextSwitch === 'trending'">
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

  data(){
   return{
        apiUrl : 'https://api.giphy.com/v1/gifs',
        apiKey:'gg3g9zjzjBHKW5bokVjFJ8Qc7GfTh546',
        searchedGifs: [],
        trendingGifs: [],
        isLoading : false,
        query: '',
        SearchOffset: 0,
        TrendingOffset : 0,
        HaveYouSearchedYet : false,
        totalCountSearch : 0 ,
        totalCountTrending : 0 ,
        CheckIfNoResultSearch : false,
        CheckIfFetchingTrending : true,
        contextSwitch : ''
   };
  },
  methods:{

     onScrollDownTrending()
       {
          this.searchfalse = true;
          const url = `${this.apiUrl}/trending?api_key=${this.apiKey}&limit=8&offset=${this.TrendingOffset}`;

          // console.log('Hi in scroll down' + url);
           
         this.isLoading=false;
          this.CheckIfFetchingTrending = true;
         fetch(url)
            .then(response => response.json())
            .then(data => {
            this.trendingGifs.push(...data.data);
              // console.log(this.trendingGifs.length, this.trendingGifs);     
              // console.log(data.data);       
              this.isLoading=true;
              this.TrendingOffset += 8;
               this.CheckIfFetchingTrending = false;

                window.localStorage.removeItem('trendingGifslocal');
                
                window.localStorage.setItem('trendingGifslocal', JSON.stringify(this.trendingGifs));

              }).catch((error)=>{
              console.log(error);
            });
        
        
        },


      fetchTrendingGifs(){

           this.queried = true;
          this.searchfalse = true;
          const url = `${this.apiUrl}/trending?api_key=${this.apiKey}&limit=16`;
          // console.log(url);           
         this.isLoading = false;
         this.contextSwitch = "trending";
         fetch(url)
            .then(response => response.json())
            .then(data => {
               this.totalCountTrending = data.pagination.total_count;
              this.trendingGifs = data.data;
              this.isLoading=true;
              // console.log(data.data); 
              //  this.HaveYouSearchedYet = false;
              this.TrendingOffset += 16;

                //  caches.open(staticName).then((cache)=>{
                //   //  console.log('done in trending!');
                //     // cache.addAll(this.trendingGifs);
                //   })

                window.localStorage.setItem('trendingGifslocal', JSON.stringify(this.trendingGifs));

              }).catch((error)=>{
              console.log(error);
            });
        

      },


      onScrollDownSearch()
       {
          this.searchfalse = true;
          const url = `${this.apiUrl}/search?api_key=${this.apiKey}&q=${this.query}&limit=8&offset=${this.SearchOffset}`;

          // console.log('Hi in scroll down' + url);
           
         this.isLoading=false;
          this.HaveYouSearchedYet = true;
         fetch(url)
            .then(response => response.json())
            .then(data => {
            this.searchedGifs.push(...data.data);
              // console.log(this.searchedGifs.length, this.searchedGifs);     
              // console.log(data.data);       
              this.isLoading=true;
              this.SearchOffset += 8;
               this.HaveYouSearchedYet = false;
                
                window.localStorage.removeItem('trendingGifslocal');
                window.localStorage.setItem('searchedGifslocal', JSON.stringify(this.searchedGifs));
              
              }).catch((error)=>{
              console.log(error);
            });
        
        
        },

      searchGifs: function(){
        if (this.timeout) clearTimeout(this.timeout); 
   this.timeout = setTimeout(() => {
     // your action

          this.queried = true;
          const url = `${this.apiUrl}/search?api_key=${this.apiKey}&q=${this.query}&limit=16`;
          // console.log(url);
          if(this.query.trim()==='')
            {
                this.searchfalse = false;
                  return;
           }
           this.contextSwitch = "search";


         this.isLoading = false;
       
         fetch(url)
            .then(response => response.json())
            .then(data => {
               this.totalCountSearch = data.pagination.total_count;
              this.searchedGifs = data.data;
              this.isLoading=true;
               this.HaveYouSearchedYet = false;
              this.SearchOffset += 16;
                  if(this.searchedGifs)
                      window.localStorage.setItem('searchedGifslocal', JSON.stringify(this.searchedGifs));
              if(this.searchedGifs.length === 0){
                this.CheckIfNoResultSearch = true;
              }
              else{
                this.CheckIfNoResultSearch = false;
              }
              }).catch((error)=>{
              console.log(error);
            });
        
   }, 600);

      }
      ,
    scroll() {
      window.onscroll = () => {
        // console.log(window.innerHeight + window.scrollY ,  document.body.offsetHeight);
        // console.log(this.contextSwitch);
        if ((window.innerHeight + window.scrollY) / document.body.offsetHeight >= 0.93 && this.isLoading ) {
          if(this.SearchOffset < this.totalCountSearch && this.contextSwitch === 'search')
             this.onScrollDownSearch(); 
          if(this.contextSwitch === 'trending')
          this.onScrollDownTrending();
       }

      }
    }
  },
  watch:{
    searchedGifs(){
      if(this.searchedGifs.length === 0){
          this.contextSwitch = "trending";
      }
    }
  },
  created(){
    this.fetchTrendingGifs();
    },
      mounted() {
        this.scroll();  
}
}
</script>
<style>

@media (min-width: 701px){
  .card-columns{
    
  column-count: 4;
  }
} 

@media screen and (min-width: 300px) and (max-width: 700px) {
 
  .card-columns{
    margin: 0.5rem;
  column-count: 1;
  }
}




.nores{
  margin-bottom: 100px;
}

input[name=query1] {
      margin-bottom: 30px;
    }
  .gif-box {
      position: relative;
      background: #333;
    }
    .gif-user   {
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