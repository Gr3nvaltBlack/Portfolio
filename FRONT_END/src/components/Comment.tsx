import { useDispatch, useSelector } from "react-redux";
import type rootReducer from "../redux/reducers/rootReducer";
import type { AppDispatch } from "../redux/store";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { addComment, getPosts } from "../actions/post.action";

type User = {
  _id: string;
  pseudo: string;
  picture: string;
};

type Comment = {
  _id: string;
  commenterId: string;
  text: string;
  commenterPseudo: string
};

type Post = {
  _id: string;
  comments: Comment[];
};

type CardCommentProps = {
    post: Post;
};

const CardComment: React.FC<CardCommentProps> = ({ post }) => {
    const [text, setText] = useState("")
    const dispatch = useDispatch<AppDispatch>()
    const userData = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer)
    const usersData = useSelector((state: ReturnType<typeof rootReducer>) => state.usersReducer)

    const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text) {
            dispatch(addComment(post._id, userData._id, text, userData.pseudo))
            .then(()=> dispatch(getPosts(5))) // test pour savoir ????????
            .then(() => setText(''))
        }
    };


    return (
        <>
            <div className="comment-container">
                {post.comments.map((comment) => {
                    return (
                        <div
                            className={comment.commenterId === userData._id ?
                            "comment-container-client" : "comment-container"}
                            key={comment._id}
                        >
                            <div className="left-part-comment">
                                <img
                                    src={
                                        usersData
                                        .find((user: User) => user._id === comment.commenterId)
                                        ?.picture || ""
                                    }
                                    alt="comment-pic"
                                    />
                            <h3>{comment.commenterPseudo}</h3>
                            </div>
                            <div className="comment-text">
                                <p>{comment.text}</p>
                            </div>

                        </div>
                    )
                })}
                {userData._id && (
                    <form action="" onSubmit={handleComment} className="comment-form">
                        <input
                            type="text"
                            name="text"
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            placeholder="leave a comment..."
                        />
                        <button type="submit"><IoIosSend /></button>
                    </form>
                )}
            </div>
        </>
    );
}
export default CardComment;