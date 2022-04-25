import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'
const create = todo_object => {
  return axios.post(baseUrl, todo_object)
}

const getAll = () => {
  return axios.get(baseUrl)
}


const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const delete_person = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}



export default { 
    getAll: getAll, 
    create: create, 
    update: update,
    delete: delete_person
}
