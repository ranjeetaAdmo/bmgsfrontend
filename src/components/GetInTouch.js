import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Headerbs";
import { FaEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const GetInTouch = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contacts", {
          withCredentials: true,
        });
        setContacts(res.data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleViewClick = (item) => {
    setSelectedContact(item);
    setShowViewModal(true);
  };

  const handleDeleteClick = (item) => {
    setContactToDelete(item);
    setShowDeleteModal(true);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isCollapsed={isCollapsed} />

      <div className="dashboard-body">
        <Header toggleSidebar={toggleSidebar} />

        <div className="main-content">
          <div className="user-details-container">
            <div className="user-details-header">
              <h2>Get In Touch Messages</h2>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="table-responsive">
                <table className="user-details-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contacts.map((c) => (
                      <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                        <td>{c.phone}</td>
                        <td>{c.message || "-"}</td>
                        <td>
                          <button
                            className="action-icon view"
                            onClick={() => handleViewClick(c)}
                          >
                            <FaEye />
                          </button>

                          <button
                            className="action-icon delete"
                            onClick={() => handleDeleteClick(c)}
                          >
                            <AiOutlineDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
      {showViewModal && selectedContact && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-box view-form-box" onClick={(e) => e.stopPropagation()}>
            <h3>Message Details</h3>

            <form className="view-user-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={selectedContact.name} readOnly />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="text" value={selectedContact.email} readOnly />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="text" value={selectedContact.phone} readOnly />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="3" value={selectedContact.message} readOnly />
              </div>

              <button className="confirm-btn" onClick={() => setShowViewModal(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && contactToDelete && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p className="delete-par">
              Are you sure you want to delete message from{" "}
              <strong>{contactToDelete.name}</strong>?
            </p>

            <div className="modal-buttons">
              <button
                className="confirm-btn"
                onClick={async () => {
                  try {
                    await axios.post("http://localhost:5000/api/delete-contact", {
                      id: contactToDelete.id,
                    });

                    Swal.fire({
                      icon: "success",
                      title: "Deleted",
                      text: "Message deleted successfully",
                      timer: 2000,
                      showConfirmButton: false,
                    });

                    setContacts(
                      contacts.filter((c) => c.id !== contactToDelete.id)
                    );

                    setShowDeleteModal(false);
                  } catch (err) {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "Failed to delete message",
                    });
                  }
                }}
              >
                Delete
              </button>

              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetInTouch;
