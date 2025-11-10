import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteCard = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const deleteTheCard = () => dispatch()
    return(
        <>
            <div onClick={() => {
                if (window.confirm("Do you want to delete this post?")) {
                    deleteTheCard()
                }
            }}>
                <RiDeleteBin6Line />
            </div>
        </>
    );
};

export default DeleteCard;