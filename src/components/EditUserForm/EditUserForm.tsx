import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types';
import { updateUserProfile } from '../../stores/adminSlice'
import { useDispatch } from 'react-redux'

const EditUserForm = ({ user, onSave, onCancel }) => {
  const dispatch = useDispatch()

  console.log('00-0>>>', user)
  const [formData, setFormData] = useState({
    name: user?.data?.name || '',
    email: user?.data?.email || '',
    gender: user?.data?.gender || '',
    dateOfBirth: user?.data?.dateOfBirth || '',
    countryCode: user?.data?.countryCode || '',
    phoneNumber: user?.data?.phoneNumber || '',
    profileImage: user?.data?.profileImage || '',
    language: user?.data?.language || '',
    teamsAndCondition: user?.data?.teamsAndCondition || false,
    address: user?.data?.address || {
      address: user?.data?.address?.address || '',
      country: user?.data?.address?.country || '',
      state: user?.data?.address?.state || '',
      city: user?.data?.address?.city || '',
      zipCode: user?.data?.address?.zipCode || '',
    },
    professionalDetails: user?.data?.professionalDetails || {
      company_name: user?.data?.professionalDetails?.company_name || '',
      add_role: user?.data?.professionalDetails?.add_role || '',
      company_domain: user?.data?.professionalDetails?.company_domain || '',
      email: user?.data?.professionalDetails?.email || '',
      category: user?.data?.professionalDetails?.category || '',
      business_experience: user?.data?.professionalDetails?.business_experience || '',
      skills: user?.data?.professionalDetails?.skills || '',
      education: user?.data?.professionalDetails?.education || '',
      university: user?.data?.professionalDetails?.university || '',
    },
    businessaddress: user?.data?.businessaddress || {
      address: user?.data?.address?.address || '',
      country: user?.data?.address?.country || '',
      state: user?.data?.address?.state || '',
      city: user?.data?.address?.city || '',
      zipCode: user?.data?.address?.zipCode || '',
      start_date: user?.data?.address?.start_date || '',
    },

    yourself: user?.data?.yourself || [],
    lookingfor: user?.data?.lookingfor || [],
  })

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData({
    //     ...formData,
    //     [name]: value,
    //   })
    // }
    console.log("🚀 ~ EditUserForm ~ formData:", formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Splitting the name to access nested properties
    const nameParts = name.split('.');
  
    if (nameParts.length === 1) {
      // Direct field update
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (nameParts.length === 2) {
      // Nested object update (e.g., professionalDetails.company_name)
      setFormData({
        ...formData,
        [nameParts[0]]: {
          ...formData[nameParts[0]],
          [nameParts[1]]: value,
        },
      });
    } else if (nameParts.length === 3) {
      // Handling deeply nested objects (e.g., address.city)
      setFormData({
        ...formData,
        [nameParts[0]]: {
          ...formData[nameParts[0]],
          [nameParts[1]]: {
            ...formData[nameParts[0]][nameParts[1]],
            [nameParts[2]]: value,
          },
        },
      });
    }
  };
  

  console.log("formData",formData)

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Pad month and day with leading zeros if necessary
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${day}-${month}-${year}`;
  };


  // useEffect(()=>{
  //   dispatch(updateUserProfile(id))
  // },[])

  const handleSave = (id) => {
    dispatch(updateUserProfile({ id, userData: formData }))
      .then((response) => {
        // console.log('User data updated successfully:', response)
        onSave()
      })
      .catch((error) => {
        console.error('Error updating user data:', error)
      })
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Edit User Details</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender:
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
        <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={getCurrentDate()} // Set max date to current date
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country Code:
              <input
                type="text"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Profile Image:
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Language:
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <p className=" font-bold">Address</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address:
              <input
                type="text"
                name="address.address"
                value={formData.address.address}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City:
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country:
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              State:
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Zip Code:
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>
        <p className=" font-bold">Bussiness Address</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Business Address:
              <input
                type="text"
                name="businessaddress.address"
                value={formData.businessaddress.address}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Business City:
              <input
                type="text"
                name="businessaddress.city"
                value={formData.businessaddress.city}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Business Country:
              <input
                type="text"
                name="businessaddress.country"
                value={formData.businessaddress.country}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Business State:
              <input
                type="text"
                name="businessaddress.state"
                value={formData.businessaddress.state}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Business Zip Code:
              <input
                type="text"
                name="businessaddress.zipCode"
                value={formData.businessaddress.zipCode}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Business Start Date:
              <input
                type="text"
                name="businessaddress.start_date"
                value={formData.businessaddress.start_date}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4"></div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Yourself:
              <input
                type="text"
                name="yourself"
                value={formData.yourself.join(', ')}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: 'yourself',
                      value: e.target.value.split(', '),
                    },
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Looking for:
              <input
                type="text"
                name="lookingfor"
                value={formData.lookingfor.join(', ')}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: 'lookingfor',
                      value: e.target.value.split(', '),
                    },
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>
        <p className=" font-bold">ProfessionalDetails</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Company Name:
              <input
                type="text"
                name="professionalDetails.company_name"
                value={formData.professionalDetails.company_name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Additional Role:
              <input
                type="text"
                name="professionalDetails.add_role"
                value={formData.professionalDetails.add_role}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Company Domain:
              <input
                type="text"
                name="professionalDetails.company_domain"
                value={formData.professionalDetails.company_domain}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
              <input
                type="email"
                name="professionalDetails.email"
                value={formData.professionalDetails.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category:
              <input
                type="text"
                name="professionalDetails.category"
                value={formData.professionalDetails.category}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Business Experience:
              <input
                type="text"
                name="professionalDetails.business_experience"
                value={formData.professionalDetails.business_experience}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Skills:
              <input
                type="text"
                name="professionalDetails.skills"
                value={formData.professionalDetails.skills}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Education:
              <input
                type="text"
                name="professionalDetails.education"
                value={formData.professionalDetails.education}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              University:
              <input
                type="text"
                name="professionalDetails.university"
                value={formData.professionalDetails.university}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleSave(user?.data._id)}
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

// EditUserForm.propTypes = {
//   user: PropTypes.object.isRequired,
//   onSave: PropTypes.func.isRequired,
//   onCancel: PropTypes.func.isRequired,
// };

export default EditUserForm
