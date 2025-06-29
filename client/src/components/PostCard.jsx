function PostCard({ post }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </div>
  );
}

export default PostCard;
