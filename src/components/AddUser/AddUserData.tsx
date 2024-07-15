
import React, { useState, useEffect } from 'react';
import { mdiEye, mdiTrashCan, mdiEyeOff } from '@mdi/js';
import { useRouter } from 'next/router';
import Button from '../Button';
import Buttons from '../Buttons';
import axiosInstanceAuth from '../../apiInstances/axiosInstanceAuth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedUserInfo, getAllUsers, getAllDeletedUsers } from '../../stores/adminSlice';
import { fetchReportUser, deleteReportUser } from '../../stores/reportSlice';
import { toast } from 'react-toastify';

const TableAddUser = ({ searchUser = '' }) => {
  const router = useRouter();
  const perPage = 10;

  const [onlysubadmin, setOnlysubadmin] = useState([]);
  console.log("000---->", onlysubadmin);
  const [allUser, setAllUser] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalAddUserActive, setIsModalAddUserActive] = useState(false);
  const [showDeleteUsers, setShowDeleteUsers] = useState(false);
  const [showReportedUsers, setShowReportedUsers] = useState(false); // New state for reported users
  const [filterReportData, setFilterReportData] = useState([]);
 



  const dispatch = useDispatch();
  const data = useSelector((state) => state.loggedUser.userInfo);
  const ReportedData = useSelector((state) => state.reportUser.reportUser?.Allreports);
  const getAdmindata = useSelector((state) => state.loggedUser.allUsers);
  const getDeletedUsers1 = useSelector((state)=> state.loggedUser.deletedUsers);

  useEffect(() => {
    setAllUser(getAdmindata?.data || []);
    setDeletedUsers(getDeletedUsers1?.data || []);
  }, [getAdmindata , getDeletedUsers1]);

  const clientsPaginated = (
    showDeleteUsers ? deletedUsers : showReportedUsers ? filterReportData : allUser
  )?.slice(perPage * currentPage, perPage * (currentPage + 1));

  const numPages = Math.ceil(
    (showDeleteUsers ? deletedUsers : showReportedUsers ? filterReportData : allUser).length / perPage
  );
  const pagesList = Array.from({ length: numPages }, (_, index) => index);

  // const getDeletedUsers = async () => {
  //   try {
  //     const res = await axiosInstanceAuth.get(`${process.env.NEXT_PUBLIC_BASE_URL}admin/allDeletedUser`);
  //     const myData = res?.data;
  //     setDeletedUsers(myData?.data || []);
  //     const setOnlydeletedSubadmin = (myData?.data || []).filter((item) => item.role === "sub_admin");
  //     setOnlysubadmin(setOnlydeletedSubadmin);
  //   } catch (err) {
  //     console.log('Error fetching deleted users:', err);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchLoggedUserInfo());
    dispatch(fetchReportUser());
    dispatch(getAllUsers());
    dispatch(getAllDeletedUsers())
  }, [dispatch]);

  const handleClickEye = (_id) => {
    router.push(`userlist/${_id}`);
  };

  const handleShowAllReport = () => {
    setCurrentPage(0);
    setShowDeleteUsers(false);
    setShowReportedUsers(true);
    setIsModalAddUserActive(false);
    setFilterReportData(ReportedData); // Reset filtered reported data
  };

  const handleShowAllUsers = () => {
    setCurrentPage(0);
    setShowDeleteUsers(false);
    setShowReportedUsers(false);
    setIsModalAddUserActive(false);
  };

  const handleShowDeleteUsers = () => {
    // getDeletedUsers();
    setCurrentPage(0);
    setShowDeleteUsers(true);
    setShowReportedUsers(false);
  };

  const handleDeleteUser = async (_id) => {
    try {
      console.log(_id);
      await axiosInstanceAuth.delete(`${process.env.NEXT_PUBLIC_BASE_URL}admin/deleteUser/${_id}`);
      setAllUser((prevUsers) => prevUsers.filter((user) => user._id !== _id));
      const updatedReportData = ReportedData.filter((user) => user.uId !== _id);
      const AlldelectedUser = deletedUsers.filter((user) => user._id !== _id);
      setDeletedUsers(AlldelectedUser);
      setFilterReportData(updatedReportData); // Update filtered report data
      toast.success('User deleted successfully'); // Show success toast message
    } catch (err) {
      console.log('Error deleting user:', err);
      toast.error('Error deleting user'); // Show error toast message
    }
  };

  const handleReportIgnore = async (_id) => {
    try {
      await dispatch(deleteReportUser(_id)).unwrap();
      setFilterReportData((prevData) => prevData.filter((report) => report._id !== _id)); // Update the state directly
      toast.success('Report ignored successfully'); // Show success toast message
    } catch (err) {
      console.log('Error ignoring report:', err);
      toast.error('Error ignoring report'); // Show error toast message
    }
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          <Button label="ALL" color="lightDark" onClick={handleShowAllUsers} />
          <Button
            label="Deleted"
            color="lightDark"
            onClick={handleShowDeleteUsers}
            className="ml-2"
          />
          <Button
            label="Reported"
            color="lightDark"
            onClick={handleShowAllReport}
            className="ml-2"
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {showReportedUsers ? (
              <>
                <th>Reported By</th>
                <th>Reported To</th>
                <th>Reason</th>
                <th>Options</th>
              </>
            ) : (
              <>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Date of Birth</th>
                <th className="whitespace-nowrap">Phone Number</th>
                <th>Gender</th>
                <th>Options</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {clientsPaginated?.length > 0 &&
            clientsPaginated
              .filter((e) => {
                const searchTerm = searchUser.toLowerCase();
                return (
                  searchTerm === '' ||
                  e.name?.toLowerCase().includes(searchTerm) ||
                  e.email?.toLowerCase().includes(searchTerm) ||
                  e.dateOfBirth?.toLowerCase().includes(searchTerm) ||
                  e.gender?.toLowerCase().includes(searchTerm) ||
                  (e.phoneNumber && e.phoneNumber.toString().toLowerCase().includes(searchTerm)) ||
                  (e.reason && e.reason.toLowerCase().includes(searchTerm))
                );
              })
              .map((d, index) => (
                <tr key={index}>
                  {showReportedUsers ? (
                    <>
                      <td data-label="Reported By">{d.reportedBy}</td>
                      <td data-label="Reported To">{d.reportedTo}</td>
                      <td data-label="Reason">{d.reason}</td>
                    </>
                  ) : (
                    <>
                      <td data-label="Name">{d.name}</td>
                      <td data-label="Email">{d.email}</td>
                      <td data-label="Dob">{d.dateOfBirth}</td>
                      <td data-label="Phone" className="whitespace-nowrap">
                        {d.phoneNumber}
                      </td>
                      <td data-label="Gender">{d.gender}</td>
                    </>
                  )}
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-center " noWrap>
                      {showReportedUsers ? (
                        data &&
                        data.length > 0 &&
                        data[0].permissions.delete === true ? (
                          <Button
                            color="info"
                            icon={mdiEyeOff}
                            onClick={() => handleReportIgnore(d?._id)}
                            small
                          />
                        ) : (
                          <Button
                            color="info"
                            icon={mdiEyeOff}
                            onClick={() => handleReportIgnore(d?._id)}
                            small
                            outline
                            disabled
                          />
                        )
                      ) : (
                        <Button
                          color="info"
                          icon={mdiEye}
                          onClick={() => handleClickEye(d?._id)}
                          small
                        />
                      )}

                      {/* Render delete button only if user is not sub_admin or has delete permission */}
                      {showReportedUsers ? (
                        data &&
                        data.length > 0 &&
                        data[0].permissions.delete === true ? (
                          <Button
                            color="danger"
                            icon={mdiTrashCan}
                            onClick={() => handleDeleteUser(d?.uId)}
                            small
                          />
                        ) : (
                          <Button
                            color="danger"
                            icon={mdiTrashCan}
                            onClick={() => handleDeleteUser(d?.uId)}
                            small
                            outline
                            disabled
                          />
                        )
                      ) : (
                        data &&
                        data.length > 0 &&
                        data[0].permissions.delete === true ? (
                          <Button
                            color="danger"
                            icon={mdiTrashCan}
                            onClick={() => handleDeleteUser(d?._id)}
                            small
                          />
                        ) : (
                          <Button
                            color="danger"
                            icon={mdiTrashCan}
                            onClick={() => handleDeleteUser(d?._id)}
                            small
                            outline
                            disabled
                          />
                        )
                      )}
                    </Buttons>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={`${page + 1}`}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
        </div>
      </div>
    </>
  );
};

export default TableAddUser;
