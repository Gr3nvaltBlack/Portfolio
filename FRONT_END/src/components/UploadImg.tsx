import "./navbar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import rootReducer from "../redux/reducers/rootReducer";
import { uploadPicture } from "../actions/user.actions";
import type { AppDispatch } from "../redux/store";
import { CiCamera } from "react-icons/ci";

type MyComponentProps = {
  className?: string;
};

const UploadImg: React.FC<MyComponentProps> = ({ className }) => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.userReducer
  );
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (selectedFile.size > 2 * 1024 * 1024) {
        // 2 Mo
        alert("Fichier trop volumineux");
        return;
      }

      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log(base64String);

        dispatch(uploadPicture(base64String)).then(() => {
          setIsUploaded(true);
          setFile(null);
          setTimeout(() => setIsUploaded(false), 1000);
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      {!isUploaded && (
        <label htmlFor="file" className="Change-img">
          <CiCamera />
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="Mask"
            style={{ display: "none" }}
          />
        </label>
      )}
      {isUploaded && <div className="Upload-done">✔</div>}
    </>
  );
};

export default UploadImg;
