async function getPosts() {
  const res = await fetch('http://localhost:3000/api/posts')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
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

export function getAllPostIds() {
  return (allPostsData.data).map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}

export async function getPostData(id) {
  const res = await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    body: JSON.stringify({id}),
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}
