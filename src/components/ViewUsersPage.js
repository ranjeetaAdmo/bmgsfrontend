


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
  // const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(prev => !prev);


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token----", token);

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setUsers(res.data.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.data.message || "Failed to fetch users.",
          });
        }
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch users.",
        });
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // if (!auth) return <p>AuthContext not available</p>;
  // const { user, loading } = auth;

  // if (loading) return <p>Loading...</p>;
  // if (!user) return <Navigate to="/" />;
  // if (user.role !== "admin") return <Navigate to="/question" />;

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

  // fetch user response
  const handleViewResponse = async (userId) => {
    try {
      setLoadingResponse(true);
      const token = localStorage.getItem('token'); // Use token here too
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/userResponses/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setResponseData(res.data.data);
      setShowResponseModal(true);
    } catch (err) {
      console.error("Error fetching response:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load user response.",
      });
    } finally {
      setLoadingResponse(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar isCollapsed={isCollapsed} />

      <div className="dashboard-body">
        <Header toggleSidebar={toggleSidebar} />

        <div className="main-content">
          <div className="user-details-container">
            <div className="user-details-header">
              <h2>User Details</h2>
              <button className="add-user-btn" onClick={() => navigate("/AddUserPage")}>
                <FaPlus /> Add User
              </button>
            </div>

            {loadingUsers ? (
              <p>Loading users...</p>
            ) : (
              <div className="table-responsive">
                <table className="user-details-table">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Registered At</th>
                      <th>Action</th>
                      <th>View Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((u) => (
                      <tr key={u.id}>
                        <td>{u.fullname}</td>
                        <td>{u.email}</td>
                        <td>{u.created_at || "-"}</td>
                        <td>
                          <button className="action-icon view" onClick={() => handleViewClick(u)}>
                            <FaEye />
                          </button>
                          <button className="action-icon delete" onClick={() => handleDeleteClick(u)}>
                            <AiOutlineDelete />
                          </button>
                          <button className="action-icon edit" onClick={() => handleEditClick(u)}>
                            <MdEdit />
                          </button>
                        </td>
                        <td>
                          <button className="action-icon view" onClick={() => handleViewResponse(u.id)}>
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                &laquo; Prev
              </button>

              <span>Page {currentPage} of {totalPages}</span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next &raquo;
              </button>
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
                      `${process.env.REACT_APP_API_URL}/deleteUser`,
                      { id: userToDelete.id },
                      {
                        withCredentials: true,
                      }
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
                        `${process.env.REACT_APP_API_URL}/editUser`,
                        {
                          id: userToEdit.id,
                          fullname: userToEdit.fullname,
                          email: userToEdit.email,
                        },
                        {
                          withCredentials: true,
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

      {showResponseModal && responseData && (
        <div className="modal-overlay" onClick={() => setShowResponseModal(false)}>
          <div className="modal-box large-modal" onClick={(e) => e.stopPropagation()}>
            <h3>User Response</h3>
            <p><strong>Name:</strong> {responseData?.user?.name || "N/A"}</p>
            <p><strong>Email:</strong> {responseData?.user?.email || "N/A"}</p>
            <hr />
            {responseData?.categories?.length > 0 ? (
              responseData.categories.map((cat) => (
                <div key={cat.category_id} className="category-block">
                  <h4>{cat.category_name}</h4>
                  {cat.questions?.map((q) => (
                    <div key={q.question_id} className="question-item">
                      <p><strong>Q:</strong> {q.question_text}</p>
                      <p><strong>Selected:</strong> {q.user_selected}</p>
                      <hr />
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No response found for this user.</p>
            )}
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={() => setShowResponseModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsersPage;
