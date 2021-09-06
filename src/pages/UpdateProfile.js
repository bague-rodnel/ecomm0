import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../components/layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, loadUser, clearErrors } from '../actions/userActions';
import { UPDATE_PROFILE_RESET } from '../constants/userConstants';
import defaultAvatar from '../images/no-img-avatar.png';


const UpdateProfile = ({ history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { error, isUpdated, loading } = useSelector(state => state.user);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url && user.avatar.url !== 'x' || defaultAvatar);

    }
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      dispatch(loadUser());

      history.push("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET
      })
    }

  }, [dispatch, alert, error, history, isUpdated, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('firstName', firstName);
    formData.set('lastName', lastName);
    formData.set('email', email);
    formData.set('avatar', avatar);

    dispatch(updateProfile(formData));
  }

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      // 0 - created, 1 - processing?, 2 - done
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    } 

    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <Fragment>
      <MetaData title={"Update Profile"} />

      <div className="container container-fluid my-5">
      <div className="row wrapper  d-flex justify-content-center">
        <div className="col-10 col-lg-6">
          <form className="shadow-lg py-5 px-5 " onSubmit={handleSubmit} encType='multipart/form-data'>
          <h1 className="mt-2 mb-4 h4 text-center text-gray-700">Update Profile</h1>

            <div className="form-group mb-3">
              <label htmlFor="name_field" className="block text-lg font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                id="name_field" 
                className="form-control  mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                name='firstName'
                value={ firstName }
                onChange={ (e) => setFirstName(e.target.value) }
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="lastname_field" className="block text-lg font-medium text-gray-700">Last Name</label>
              <input 
                type="text" 
                id="lastname_field" 
                className="form-control  mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                name='lastName'
                value={ lastName }
                onChange={ (e) => setLastName(e.target.value) }
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email_field" className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control  mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                name='email'
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
              />
            </div>
            <span htmlFor='avatar_upload' className="block text-md pl-5 font-medium text-gray-700">Avatar</span>
            <div className='form-group flex flex-row '>
              
              <div className="pr-5">
                
                      <img
                        src={ avatarPreview }
                        className='rounded-circle'
                        alt='Avatar Preview'
                        width="100"
                        height="100"
                      />
              </div>
                 
              
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                     
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload an avatar</span>
                            <input
                               id="file-upload"
                               name="avatar"
                               type="file"
                               accept="images/*"
                               required
                               onChange={onChange}
                               className="sr-only"
                                />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                            <p className="text-xs text-gray-500">PNG, JPG</p>
                          </div>
                        </div>
              </div>

              <div className="py-3">
                  <button
                    type="submit"
                    disabled={ loading ? true : false }
                    className="cus-login-register inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                    Update
                </button>
              </div>
              
          </form>
        </div>
      </div>
      </div>
    </Fragment>
    
  )
}

export default UpdateProfile
