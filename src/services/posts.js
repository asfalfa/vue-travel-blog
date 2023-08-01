import axios from "axios";

async function getPosts() {
  const res = await axios.get('http://localhost:3030/posts').then(response => {
    return response
  })

  return res
}

const allPostsData = await getPosts();

export function getSortedPostsData() {
  return (allPostsData.data).sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// export function getAllPostIds() {
//   return (allPostsData.data).map((post) => {
//     return {
//       params: {
//         id: post.id,
//       },
//     };
//   });
// }

export async function getPostData(id) {
  const res = await axios.post('http://localhost:3030/posts', {
    id: id,
  }).then(response => {
    return response
  })
  
  return res
}
  