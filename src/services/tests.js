import axios from "axios";

export async function fileUpload(data){
  const res = await axios.post('http://localhost:3030/tests', data, {
  }).then(res => {
      return res
  })
  
  return res
}