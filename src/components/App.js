import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [news, setNews] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(()=>{
    setIsLoading(true);
    fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=[API_KEY]&max=10&lang=en`)
    .then(res=>res.json())
    .then(data=>{
      setNews(data.articles);
      setIsLoading(false);
    })
    .catch(err=> console.log(err));
  },[category]);

  const handleCategoryChange=(event)=>{
    setCategory(event.target.value);
  }

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <div>
        <label htmlFor="category">Select a category:</label>
      <select id="category" name="category" value={category} onChange={handleCategoryChange}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
      </select>
      </div>
      {isloading ? (
      <p className='loader'>Loading...</p>):(
      <ol>
        {news.map((article)=>{
          <li key={article.url}>
             <img src={article.image} alt={article.title}/>
             <div>
             <h2>{article.title}</h2>
             <p>{article.description}</p>
             <p>Source: {article.source.name}</p>
             </div>
           </li>
        })}
      </ol>
  )}
    </div>
  )
}


export default App;
