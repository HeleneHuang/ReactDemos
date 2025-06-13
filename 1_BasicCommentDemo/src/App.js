import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { useState, useRef, useEffect } from 'react'
import './App.scss'
import axios from 'axios';
import avatar from './images/heart.png'
import avatar1 from './images/gift.png'
import avatar2 from './images/club.png'
// import avatar3 from './images/lantern.png'

// data of comments
// const defaultList = [
  {
    rpid: 3,
    user: {
      uid: '13258165',
      avatar: avatar1,
      uname: 'Mary',
    },
    content: 'Definitlt feels good.',
    ctime: '10-18 08:15',
    like: 126
  },
  {
    rpid: 2,
    user: {  
      uid: '36080105',
      avatar: avatar2,
      uname: 'Dory',
    },
    content: 'Love it!',
    ctime: '11-13 11:29',
    like: 88
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar: avatar,
      uname: 'Helene',
    },
    content: 'So good',
    ctime: '10-19 09:00',
    like: 66
  },
// ]

// user info
const user = {
  uid: '30009257',
  avatar: avatar,
  uname: 'Helene',
}

// navigation tab setting
const tabs = [
  { type: 'hot', text: 'Hot' },
  { type: 'time', text: 'Latest' },
]

// useGetList function
function useGetList (){
    // use useEffect() to import data
  const [commentList, setCommentList] = useState([])
  useEffect(()=>{
    async function getList(){
      const res = await axios.get('http://localhost:3004/list')
      setCommentList(res.data)
    }
    getList()
  },[])
  return {
    commentList,
    setCommentList
  }
}

// encapusolate item
function Item ({item, onDel}){
  return (
    <div className="reply-item">
            <div className="root-reply-avatar">
              <div className="bili-avatar">
                <img
                  className="bili-avatar-img"
                  alt=""
                  src={item.user.avatar}
                />
              </div>
            </div>
            <div className="content-wrap">
              <div className="user-info">
                <div className="user-name">{item.user.uname}</div>
              </div>
              <div className="root-reply">
                <span className="reply-content">{item.content}</span>
                <div className="reply-info">
                  <span className="reply-time">{item.ctime}</span>
                  <span className="reply-time">Likes:{item.like}</span>
                  {/* if user.id === item.user.id, the delete button will show */}
                  {user.uid === item.user.uid && <span className="delete-btn" onClick={()=>{onDel(item.rpid)}}>
                    Delete
                  </span>}
                </div>
              </div>
            </div>
          </div>
  )
}

const App = () => {
  
  // render the default comments
  // const [commentList, setCommentList]=useState(_.orderBy(defaultList, 'like', 'desc'))

  const {commentList, setCommentList} = useGetList()

  // delete fuction
  const handelDel=(id)=>{
    setCommentList(commentList.filter(item=>item.rpid !== id))
  }
  
  // highlighted the activated button
  const [type, setType]=useState('Hot')
  const handelTabChange=(type)=>{
    console.log(type)
    setType(type)
    if(type === 'hot'){
      setCommentList(_.orderBy(commentList, 'like', 'desc'))
    } else {
      setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
    }
  }

  // publish an comment
  const [comment, setComment] = useState('')
  const inputRef = useRef(null)
  const handelPublic=()=>{
    setCommentList([
      ...commentList,
      {
        rpid: uuidv4(),
        user: {
          uid: '30009257',
          avatar: avatar,
          uname: 'Helene',
        },
        content: comment,
        ctime: dayjs(new Date()).format('MM-DD hh:mm'),  
        like: 66
      }
    ])
    // reset the input
    setComment('')
    // refocus
    inputRef.current.focus()
  }

  return (
    <div className="app">

      {/* navigation */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {tabs.map(item=>(
              <span key={item.type} 
              onClick={()=>handelTabChange(item.type)} 
              className={`nav-item ${type === item.type && 'active'}`}>
                {item.text}
              </span>))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        <div className="box-normal">
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="User Avatar" />
            </div>
          </div>
          <div className="reply-box-wrap">
            <textarea
              className="reply-box-textarea"
              ref={inputRef}
              placeholder="send a comment"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
            />
            <div className="reply-box-send">
              <div className="send-text" onClick={()=>{handelPublic()}}>Publish</div>
            </div>
          </div>
        </div>

        {/* use 'map' to render the default list */}
        <div className="reply-list">
          {commentList.map(item=><Item key={item.id} item={item} onDel={handelDel}/>)}

        </div>
      </div>
    </div>
  )
}

export default App