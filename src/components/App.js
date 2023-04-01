import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [news, setNews] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(()=>{
    // setIsLoading(true);
    async function fetchNews(){
      try {
        setIsLoading(true);
      const response=await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=[API_KEY]&max=10&lang=en`);
    const data=await response.json();
    setNews(data.articles);
      setIsLoading(false);
    }catch(err){
      console.log(err);
  }
}
fetchNews();
},[category]);

  const handleCategoryChange=(event)=>{
    setCategory(event.target.value);
  }

  return (
    <div id="main" className="App">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={handleCategoryChange}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="entertainment">Entertainment</option>
      </select>
      {isloading ? (
      <p className='loader'>Loading...</p>
      ):(
        <div className="news-list">
        {news.map((article)=>{
          <div key={article.url} className="news-item">
            <img src={article.image} alt={article.title} />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            </div>
        })}
        </div>
  )}
    </div>
  )
}


export default App;
