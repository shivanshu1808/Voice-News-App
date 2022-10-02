import axios from "axios";
export  function getNews(category ='General') {
  const API_KEY =`e3c1bcc9b5924576bdafd87a42afb078`;
  const API_Endpoint = ` https://newsapi.org/v2/top-headlines?country=in&category=${category}`;

   return axios.get(`${API_Endpoint}&apiKey=${API_KEY}`)
  

}
