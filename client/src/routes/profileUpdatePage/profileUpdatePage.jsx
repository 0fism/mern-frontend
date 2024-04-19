import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";


function ProfileUpdatePage() {
  const [uwconfigCloudName, setUwconfigCloudName] = useState('');

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await apiRequest("/env");
          const { uwconfigCloudName } = response.data;
          setUwconfigCloudName(uwconfigCloudName);
        } catch (err) {
          console.error(err);
        }
      };
    fetchData();
  }, []); 

  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      //from controller, const id = req.params.id;
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        // avatar:avatar
        avatar:avatar[0]
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
    

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
      {/* <img src={avatar.length > 0 ? avatar : currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" /> */}
      <img src={avatar[0] || currentUser.avatar || "/noavata.jpg"} alt="" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: uwconfigCloudName,
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;