import React,{useEffect, useState} from 'react'
import {getNews} from '../Service/getNews';
import moment from 'moment/moment';
import alanBtn from '@alan-ai/alan-sdk-web';


const NewsData = () => {
    const [newsData, setNewsData]= useState([])
    const[selectOption,  setSelectOption]= useState('');
    const alanKey= 'db088080d53b232421e25839808470232e956eca572e1d8b807a3e2338fdd0dc/stage'

    const getAllNews = async () =>{
        let data = await getNews(selectOption);
        setNewsData(data.data.articles)
    }
    const  selectCategory =(event)=>{
         
     setSelectOption(event.target.value)

    }
    useEffect(() => {
      alanBtn({
          key: alanKey,
          onCommand: (commandData) => {
            
            setSelectOption(commandData.data)
          }
      });
    }, []);


  useEffect(()=>{
      getAllNews()
  },[selectOption])
    
  return (
    <div className='main'>
          <h1> Voice News</h1>
          <div className='select'>
           <label for="cars">choice a Category</label>
           <select  className='select-box' name="Category" id="Category" onChange={selectCategory} value={selectOption}>
             <option value="General">General</option>
             <option value="Health">Health</option>
             <option value="Business">Business</option>
             <option value="Sports">Sports</option>

           </select>

          </div>
          <div className='grid-main'>
          {newsData?.map((news)=>{
            return(
                <div className='grid-child'>
                <img src={news?.urlToImage}
                  className="news-image"
                />
                <p className='news-title'>{news?.title}</p>
                <p className='news-content'>{news?.content}</p>
                <div className='space-between'>
                <p className='news-author'>Author:{news?.author ? news?.author:'Author name not Available'}</p>
                <p className='news-date'> Date:{moment(news?.publishedAt).format('LL')}</p>
                </div>
                <a href={news?.url} target="_blank">Read More....</a>


                </div>
            )
          })}
          </div>
    </div>
  )
}

export default NewsData