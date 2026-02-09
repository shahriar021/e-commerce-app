import { Alert } from "react-native";
import { usePostCommentBasedOnIdMutation } from "src/redux/features/feedApi/feedApi";
const [postComment] = usePostCommentBasedOnIdMutation()

export  const handleComment = async (id: string, comment: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setComments: React.Dispatch<React.SetStateAction<string>>, token: string) => {
        if (!comment) {
            Alert.alert("put some comment..");
            return;
        }
        setLoading(true)
        const info = {
            data: {
                comments: comment
            }
        }
        try {

            const res = await postComment({ token, pId: id, info }).unwrap()
            setLoading(false)
            setComments('')
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }