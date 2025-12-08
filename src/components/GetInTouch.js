import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { AuthContext } from "../context/AuthContext";
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
    const toggleSidebar = () => {
    if (!isMobile) {
      setIsCollapsed(prev => !prev);
    }
  };

      const [isMobile, setIsMobile] = useState(false);
      const auth = useContext(AuthContext);
      useEffect(() => {
        const checkScreenSize = () => {
          if (window.innerWidth <= 768) {
            setIsMobile(true);
            setIsCollapsed(true);
          } else {
            setIsMobile(false);
          }
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
      }, []);

  // ⭐ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/contacts`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  // ⭐ Pagination Logic
  const indexOfLast = currentPage * contactsPerPage;
  const indexOfFirst = indexOfLast - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <div className={`dashboard-body ${isCollapsed ? "collapsed" : ""}`}>

        <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
          <Header toggleSidebar={toggleSidebar} />
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
                    {currentContacts.map((c) => (
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

            {/* ⭐ Updated Pagination Working */}
            <div className="pagination">
              <button disabled={currentPage === 1} onClick={goToPrevPage}>
                &laquo; Prev
              </button>

              <span>Page {currentPage} of {totalPages}</span>

              <button disabled={currentPage === totalPages} onClick={goToNextPage}>
                Next &raquo;
              </button>
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
                    const token = localStorage.getItem('token');
                   await axios.delete(`${process.env.REACT_APP_API_URL}/delete-contact/${contactToDelete.id}`, {
                      withCredentials: true,
                      headers: { Authorization: `Bearer ${token}` }
                    });
                    Swal.fire({
                      icon: "success",
                      title: "Deleted",
                      text: "Message deleted successfully",
                      timer: 2000,
                      showConfirmButton: false,
                    });

                    setContacts(contacts.filter((c) => c.id !== contactToDelete.id));

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
