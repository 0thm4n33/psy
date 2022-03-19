import './App.css';
import Layout from './components/Layout';
import BlogPage from './pages/Blog';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AuthenticationPage from './pages/Authentication';
import ConntactUsPage from './pages/ConnatactUs';
import ArticlePage from './pages/Article';
import AddPost from './pages/AddPost';
import RequiredAuth from './components/requiredAuth';
import PostAdmin from './admin/page/Posts';
import service from './services';

function App() {
  return (
    <div className="App">
      <Router>
          <Layout>
              <Routes>
                <Route path='/' element={<BlogPage />} />
                    <Route path="/blog" element={<BlogPage/>}/>
                    <Route path="/admin/connexion" element={<AuthenticationPage service={service} />}/>
                    <Route path="/conntactez-nous" element={<ConntactUsPage />}/>
                    <Route path="/blog/:category/:title" element={<ArticlePage />}/>
                    <Route path="/:category/:title" element={<ArticlePage />}/>
                    <Route path='/admin/post' element={
                      <RequiredAuth service={service}>
                          <AddPost/>
                        </RequiredAuth>
                      }/>
                    <Route path="/admin/AllPosts" element={
                      <RequiredAuth service={service}>
                        <PostAdmin />
                      </RequiredAuth>
                    }/>
                  </Routes>
              </Layout>
      </Router>
  </div>
  );
}

export default App;
