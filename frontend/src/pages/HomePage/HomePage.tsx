
// import PostFeed from "../../components/Posts/PostFeed";
// import { useGetPostsQuery } from "../../redux/postSlice";


// const HomePage = () => {
//   const { data: posts = [] } = useGetPostsQuery();

//   const handleLike = (postId: string) => {
//     console.log("Liked post:", postId);
//     // dispatch(toggleLike(postId))
//   };

//   return (
//     <div>
//       <h1>HomePage</h1>
//       <PostFeed posts={posts} handleLike={handleLike} />
//     </div>
//   );
// };
// export default HomePage;
// HomePage.tsx

// HomePage.tsx



const HomePage = () => {
//   const posts: IPost[] = [
//   {
//     _id: "68dc41cdaff33559d5ca869f",
//     author: {
//       _id: "68dc4189aff33559d5ca869c",
//       name: "MAX",
//       email: "max@example.com",       // додаємо обов’язкове поле
//       fullName: "Maximus Test",       // додаємо обов’язкове поле
//       profileImage:
//         "https://res.cloudinary.com/dsti4smn3/image/upload/v1758816996/avatars/1758816996011-404c9f22522987a02212b04e8a017811.jpg.jpg",
//     },
//     description: "Мій перший пост з фото",
//     image:
//       "https://res.cloudinary.com/dsti4smn3/image/upload/v1759265228/posts/1759227496562-daffodil-7143756_640.jpg.jpg",
//     likes: [],
//     comments: [],
//   },
// ];
//   const handleLike = (postId: string) => {
//     console.log("Liked post:", postId);
//   };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h1>HomePage</h1>
      
    </div>
  );
};

export default HomePage;

