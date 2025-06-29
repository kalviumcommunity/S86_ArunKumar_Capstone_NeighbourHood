import Header from './components/Header';
import PostList from './components/PostList';
import Footer from './components/Footer';

function App() {
  const posts = [
    { id: 1, title: 'Need help with groceries', description: 'Looking for someone to help with groceries.' },
    { id: 2, title: 'Offering free yoga classes', description: 'Join my yoga sessions every morning at the park.' },
  ];

  return (
    <div>
      <Header />
      <main style={{ padding: '20px' }}>
        <PostList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
