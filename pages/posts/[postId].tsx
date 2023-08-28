import {useRouter} from "next/router";
import usePost from "@/hooks/usePost";
import {ClipLoader} from "react-spinners";
import {Header} from "@/components/Header";
import PostItem from "@/components/posts/Postitem";
import Form from "@/components/Form";

const PostView = () => {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if(isLoading || !fetchedPost){
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader />
            </div>
        )
    }

    return (
        <>
           <Header label="Post" showBackArrow />
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Post your reply!" />
        </>
    )
}

export default PostView;