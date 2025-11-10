import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from '../redux/store';
import { getPosts } from "../actions/post.action";
import type rootReducer from "../redux/reducers/rootReducer";
import { isEmpty } from "../hooks/verifData";
import PostCard from "./PostCard";



const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch<AppDispatch>()
    const [count, setCount] = useState(5);
    const posts = useSelector((state: ReturnType<typeof rootReducer>) => state.postReducer)

    const loadMore = () => {
        const scrollingElement = document.scrollingElement
        if (!scrollingElement) return
        if (window.innerHeight + document.documentElement.scrollTop + 1 > scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    }

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(count))
            setLoadPost(false)
            setCount(count + 5);
        }
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch])

    return (
        <>
            <div className="thread-container">
                <ul>
                    {!isEmpty(posts[0]) && posts.map((post: any) => {
                        return <PostCard post={post}/>
                    }) }
                </ul>
            </div>
        </>
    )
}

export default Thread;