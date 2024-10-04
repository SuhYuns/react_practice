
import './App.css';
import { useEffect, useState } from 'react';
import { data } from './data.js';
import { Title } from './title.js';
import axios from 'axios'

function App() {

  let [input, inputUpdate] = useState('');
  let [post, postUpdate] = useState(data);

  let [tab, tabUpdate] = useState(0);

  function update() {
    let copy = [...post];
    
    let n = {
      id : post.length,
      title : input,
      img : "shoes1.jpg",
      price : 120000
    }
    copy.unshift(n);
    postUpdate(copy);
    inputUpdate();
  }

  function del(idx) {
    let copy = [...post];
    copy.splice(idx, 1);
    postUpdate(copy);
    inputUpdate();
  }


  useEffect(()=>{
    if (input !== '' && isNaN(input)){
      alert('숫자만 입력하세요');
      // let alt = input.substring(0, input.length - 1);
    }
  }, [input])

  return (
    <>

      <Title></Title>


      <div>
        <button onClick={() => {tabUpdate(0);}}>탭1</button>
        <button onClick={() => {tabUpdate(1);}}>탭2</button>
        <button onClick={() => {tabUpdate(2);}}>탭3</button>
      </div>
      <Pop 탭={tab}></Pop>

      <input onChange={(e)=>{ inputUpdate(e.target.value) }}/>
      <button onClick={()=>{update();}} style={{marginBottom:"10px"}}>발행</button>

      {
        post.map(function(item, i) {
          return ( <Card item={item} idx={i} del={del}></Card> )
        })
      }

      <button onClick={() => {
        axios.get('https://codingapple1.github.io/shop/data2.json').then((결과) => {
          alert(결과.data[1].id);
        })
        .catch(() => {
          console.log("실패");
        })
      }}>
        불러오기
      </button>

      

    </>
  );
}

function Card(props) {
  return(
    <div className='card-item' key={props.idx}>
      <h2>CARD<button onClick={()=>{props.del(props.idx);}}>삭제</button></h2>
      <img src={process.env.PUBLIC_URL + "/img/" + props.item.img} width="150px"/> <br/>
      {props.item.title} <br/>
      {props.item.price}
      
    </div>
  )
}

function Pop(props) {
  return [ <div>내용1</div>, <div>내용2</div>, <div>내용3</div>][props.탭]
}

export default App;
