import React,{useEffect,useState} from 'react'
import { useParams} from 'react-router-dom';
import styles from "./UserPosts.module.css";

function UserPosts() {
    const {id} = useParams();

    const[activeTab,setActivetab] = useState("");
    const[posts,setPosts] = useState([]);
    const[comments,setComments] = useState([]);
    const[currentPage , setCurrentpage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if(activeTab === "posts"){
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error fetching posts:",error));
        }else if (activeTab === "comments") {
           fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
           .then((response)=> response.json())
           .then((data) => setComments(data))
           .catch((error) => console.error("Error fetching comments.",error));
        }
    },[id,activeTab]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const displayedData = 
        activeTab === "posts"
          ? posts.slice(indexOfFirstItem,indexOfLastItem) : 
          comments.slice(indexOfFirstItem,indexOfLastItem);

          const paginate = (pageNumber) => setCurrentpage(pageNumber);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={activeTab === "posts" ? styles.active : ""}
          onClick={() => {
            setActivetab("posts");
            setCurrentpage(1);
            }}
        >
          Posts
        </button>

        <button
          className={activeTab === "comments" ? styles.active : ""}
          onClick={() => {
            setActivetab("comments");
            setCurrentpage(1);
          }}
        >
          Comments
        </button>
      </div>

      {activeTab && (
        <>
          <div className={styles.dataContainer}>
            {displayedData.map((item) => (
              <div key={item.id} className={styles.card}>
                <h3>{activeTab === "posts" ? item.title : item.name}</h3>
                <p>{item.body}</p>
                {activeTab === "comments" && <p>Email: {item.email}</p>}
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            {Array.from({
              length: Math.ceil(
                (activeTab === "posts" ? posts.length : comments.length) /
                  itemsPerPage
              ),
            }).map((_ , index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? styles.active : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserPosts;   