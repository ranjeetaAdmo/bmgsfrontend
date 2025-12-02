import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./styles/ViewUsersPage.css";
import Sidebar from "./Sidebar";
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Header from "./Headerbs";
import { FaPlus, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

const ViewUsersPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  //  fetchUsers runs only once
  useEffect(() => {
    const fetchUsers = async () => {
      try {
       const res = await axios.get("http://localhost:5000/api/users", {
         withCredentials: true
       });
        setUsers(res.data);
        console.log("Fetched users:", res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  if (!auth) return <p>AuthContext not available</p>;
  const { user, loading } = auth;

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;
  if (user.role !== "admin") return <Navigate to="/question" />;

  const handleViewClick = (u) => {
    setSelectedUser(u);
    setShowViewModal(true);
  };

  const handleDeleteClick = (u) => {
    setUserToDelete(u);
    setShowDeleteModal(true);
  };

  const handleEditClick = (u) => {
    setUserToEdit(u);
    setShowEditModal(true);
  };

  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard-body">
        <Sidebar isCollapsed={false} />
        <div className="main-content">
          <div className="user-details-container">
            <div className="user-details-header">
              <div className="heading-with-back">
                <h2>User Details</h2>
              </div>
              <button
                className="add-user-btn"
                onClick={() => navigate("/AddUserPage")}
              >
                <FaPlus /> Add User
              </button>
            </div>

            {loadingUsers ? (
              <p>Loading users...</p>
            ) : (
              <table className="user-details-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Registered At</th>
                    {/* <th>Last Login</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.fullname}</td>
                      <td>{u.email}</td>
                      <td>{u.created_at || "-"}</td>
                      {/* <td>{u.created_at || "-"}</td> */}
                      <td>
                        <button
                          className="action-icon view"
                          onClick={() => handleViewClick(u)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="action-icon delete"
                          onClick={() => handleDeleteClick(u)}
                        >
                          <AiOutlineDelete />
                        </button>
                        <button
                          className="action-icon edit"
                          onClick={() => handleEditClick(u)}
                        >
                          <MdEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="pagination">
              <button disabled>&laquo; Prev</button>
              <span>Page 1 of 1</span>
              <button disabled>Next &raquo;</button>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedUser && (
        <div
          className="modal-overlay"
          onClick={() => setShowViewModal(false)}
        >
          <div
            className="modal-box view-form-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>User Information</h3>
            <form className="view-user-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={selectedUser.fullname} readOnly />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={selectedUser.email} readOnly />
              </div>
              <div className="form-group">
                <label>Registered At</label>
                <input
                  type="text"
                  value={selectedUser.created_at || "-"}
                  readOnly
                />
              </div>
              {/* <div className="form-group">
                <label>Last Login</label>
                <input
                  type="text"
                  value={selectedUser.created_at || "-"}
                  readOnly
                />
              </div> */}
              <div className="modal-buttons">
                <button
                  type="button"
                  className="confirm-btn"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && userToDelete && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p className="delete-par">
              Are you sure you want to delete{" "}
              <strong>{userToDelete.fullname}</strong>?
            </p>
            <div className="modal-buttons">
              <button
          className="confirm-btn"
          onClick={async () => {
            try {
              const res = await axios.post(
                "http://localhost:5000/api/deleteUser",
                { id: userToDelete.id }   // send id in body
              );

               Swal.fire({
                icon: "success",
                title: "Deleted",
                text: res.data.message || "User deleted successfully",
                timer: 2000,
                showConfirmButton: false,
              });

              // update local state → remove from table
              setUsers(users.filter((u) => u.id !== userToDelete.id));

              setShowDeleteModal(false);
            } catch (err) {
              console.error("Delete error:", err);
               Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Failed to delete user",
              });
            }
          }}
        >
          Delete
        </button>
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

   {/* Edit Modal */}
{showEditModal && userToEdit && (
  <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
      <h3>Edit User</h3>
      <form className="edit-user-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={userToEdit.fullname}
            onChange={(e) =>
              setUserToEdit({ ...userToEdit, fullname: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={userToEdit.email}
            onChange={(e) =>
              setUserToEdit({ ...userToEdit, email: e.target.value })
            }
          />
        </div>
        <div className="modal-buttons">
          <button
            className="submit-btn"
            onClick={async (e) => {
              e.preventDefault();
              try {
                const res = await axios.post(
                  "http://localhost:5000/api/editUser",
                  {
                    id: userToEdit.id,
                    fullname: userToEdit.fullname,
                    email: userToEdit.email,
                  }
                );
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: res.data.message || "User updated successfully",
                  timer: 2000,
                  showConfirmButton: false,
                });
                // update local state so table shows changes
                setUsers(
                  users.map((u) =>
                    u.id === userToEdit.id ? { ...u, ...userToEdit } : u
                  )
                );
                setShowEditModal(false);
              } catch (err) {
                console.error("Update error:", err);
                 Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.response?.data?.message || "Failed to update user",
                  });
              }
            }}
          >
            Update
          </button>
          <button
            className="cancel-btn"
            onClick={(e) => {
              e.preventDefault();
              setShowEditModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
   )}
    </div>
  );
};

export default ViewUsersPage;
