import { query } from "@solidjs/router";

const sample = {
  id: 1,
  title: "His mother had always taught him",
  body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
  tags: ["history", "american", "crime"],
  reactions: { likes: 192, dislikes: 25 },
  views: 305,
  userId: 121,
};
const posts = {
  posts: [sample],
};

type Posts = typeof sample;
type AllPosts = typeof posts;
export const getPosts = query(async (id: string) => {
  "use server";
  const response = await fetch(`https://dummyjson.com/posts/${id}`);
  return (await response.json()) as Posts;
}, "getPosts");

export const getAllPosts = query(async () => {
  "use server";
  const response = await fetch(`https://dummyjson.com/posts`);
  return await response.json();
}, "getAllPosts");
