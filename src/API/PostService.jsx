import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export default class PostService {

  static getAll() {
    return new Promise((resolve, reject) => {
      api.get('/posts')
        .then(response => resolve(response.data))
        .catch(error => {
          console.error('Error fetching posts:', error);
          reject(error);
        });
    });
  }

  static getComById(id) {
    return new Promise((resolve, reject) => {
      api.get(`/posts/${id}/comments`)
        .then(response => resolve(response.data))
        .catch(error => {
          console.error('Error fetching comments:', error);
          reject(error);
        });
    });
  }

  static deletePost(id) {
    return new Promise((resolve, reject) => {
      api.delete(`posts/${id}`)
        .then(response => {
          resolve(response.data); 
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
