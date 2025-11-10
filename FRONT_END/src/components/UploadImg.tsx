import './navbar.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import rootReducer from '../redux/reducers/rootReducer';
import { uploadPicture } from "../actions/user.actions";
import type { AppDispatch } from "../redux/store";
import { CiCamera } from "react-icons/ci";

type MyComponentProps = {
    className?: string;
};

const UploadImg: React.FC<MyComponentProps> = ({ className }) => {
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const userData = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer);
    const [isUploaded, setIsUploaded] = useState(false);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handlePicture = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) return; // Checks that file is not null

        const data = new FormData();
        data.append("name", userData.pseudo);
        data.append("userId", userData.user._id);
        data.append("file", file);

        dispatch(uploadPicture(data, userData._id));
        setIsUploaded(true);
        setFile(null);
        setTimeout(() => setIsUploaded(false), 1000);
    }

    return (
        <>

                <form action="" onSubmit={handlePicture} className="upload-pic">
                    {!file && !isUploaded && (
                        <>
                            <label htmlFor="file" className='Change-img'>
                                <CiCamera />
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={(handleFileChange)}
                                className='Mask'
                            />
                        </>
                    )}
                    {file && !isUploaded && (
                        <input type="submit" value={'\u2714'} className='Submit-pic'/>
                    )}
                    {isUploaded && (
                        <div className='Upload-done'>✔</div>
                    )}
                </form>
  
        </>
    )
};

export default UploadImg;