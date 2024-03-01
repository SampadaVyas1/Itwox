// export const fetchPosts = async (pageParam: any) => {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch posts");
//   }
//   return response.json();
// };

export const fetchPosts = async (pageParam: any) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const allPosts = await response.json();
  const startIndex = (pageParam - 1) * 10;
  const endIndex = startIndex + 10; // Calculate the end index for the current page
  const posts = allPosts.slice(startIndex, endIndex); // Get the posts for the current page
  return { posts, allPosts };
};

export const fetchComments = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
