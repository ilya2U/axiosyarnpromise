import React, { useEffect, useState } from 'react'
import MyButton from '../UI/button/MyButton';
import PostService from '../API/PostService';
import Loader from '../UI/Loader/Loader';

function PostsComments(props) {
    const [comments, setComments] = useState([]); 
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(true); 

    const fetchComments = async () => {
        try {
            setLoading(true); 
            const postsCom = await PostService.getComById(props.post.id);
            setComments(postsCom);
        } catch (error) {
            console.error('Ошибка при получении комментариев:', error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (expanded) {
            fetchComments();
        }
    }, [expanded]); 

    const handleToggle = () => {
        setExpanded(!expanded);
    };

  return (
        <div>

                <div className="postBtn">
                    <MyButton onClick={handleToggle}>Комментарии</MyButton>
                </div>


            {console.log("Комментарии:", comments)}

            {expanded && (
                    <div className='comments'>
                        {loading 
                            ?  <Loader/> 
                            : <div>
                                {console.log("Комментарии:", comments)}
                                {comments.length > 0
                                    ? comments.map(comm => (
                                        <div className='col' key={comm.id}>
                                            <span>{comm.email}</span>
                                            <span>{comm.body}</span>
                                        </div>
                                    ))
                                    : <div>Нет комментариев</div>
                                }
                            </div>
                        }
                    </div>)
            } 

        </div>
  )
};

export default PostsComments