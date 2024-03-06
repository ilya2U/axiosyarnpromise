import React, { useEffect, useState } from 'react';
import MyButton from '../UI/button/MyButton';
import Loader from '../UI/Loader/Loader';
import PostService from '../API/PostService';
import PostsComments from './PostsComments';

const PostItem = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [comments, setComments] = useState([]); 

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

 
    const deletePost = async () => {
        try {
            await PostService.deletePost(props.post.id);
            // Можете выполнить дополнительные действия, например, обновление списка постов после удаления
        } catch (error) {
            console.error('Ошибка при удалении поста:', error);
        } finally {
            props.remove(props.post)
        }
    };
    


    return(
        <div className="post">
            <div className='fStage'>
                <div className="ffStage">
                    <strong>{props.post.id}. {props.post.title}</strong>
                    {/* <PostsComments post={props.post}/> */}
                    <div>
                        {props.post.body}
                    </div>

                </div>

               <div className="fsStage">
                  <div className="postBtn">
                    {/* <MyButton onClick={handleToggle}>Комментарии</MyButton> */}
                    <PostsComments post={props.post}/>
                    <MyButton style={{marginLeft: -1}} onClick={deletePost}>Удалить</MyButton>
                    </div>
               </div>
              
            </div>

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
                    </div>
                )}


        </div>
    );
};

export default PostItem;
