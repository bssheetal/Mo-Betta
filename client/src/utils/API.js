import axios from 'axios';

export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (username, email, password) => {
    return axios.post('api/signup', { username: username, email: email, password: password });
  },

  facialRecognition: (imagedata) => {
    return axios.post('/api/faceplusplus/faceanalyze', imagedata);
  },

  spotify: (mood) => {
    return axios.get('/api/music', {params: {mood: mood}});
  },

  scrapeNews: (parent) => {
    return axios.get('/news', {params: {q: parent}});
  },

  stocks:(stockname)=>{
      return axios.get('/api/mobetta/searchstock/'+stockname);
  },
  
  stockscharts:(stockname)=>{
    return axios.get(`/api/mobetta/searchstock/${stockname}/charts`);
  },
  
  video: (search, numOfResults)=> {
    console.log(search);
    return axios.get('/api/video', {params: {q: search, maxResults: numOfResults}})
  }
};

