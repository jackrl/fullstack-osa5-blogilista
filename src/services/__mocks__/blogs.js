import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const blogs = [
  {
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com/",
    "likes": 10,
    "user": {
      "_id": "5a92eafd4afdad272a1d1c4c",
      "username": "testuser",
      "name": "Test User"
    },
    "id": "5a422a851b54a676234d17f7"
  },
  {
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    "likes": 5,
    "user": {
      "_id": "5a92eafd4afdad272a1d1c4c",
      "username": "testuser",
      "name": "Test User"
    },
    "id": "5a422aa71b54a676234d17f8"
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }