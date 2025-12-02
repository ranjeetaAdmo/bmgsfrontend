import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Sidebar from './Sidebar';
import Header from './Headerbs';
import './styles/CategoryPage.css';
import './styles/AddCategoryPage.css';
import { MdEdit } from "react-icons/md";
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';

const CategoryPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const getCurrentTime = () => new Date().toLocaleString();


  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  // const initialCategories = [
  //   { name: 'Methodologies', createdAt: getCurrentTime() },
  //   { name: 'Leadership', createdAt: getCurrentTime() },
  //   { name: 'Coaching', createdAt: getCurrentTime() },
  // ];

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState('');

  const categoriesPerPage = 5;

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * categoriesPerPage;
  const indexOfFirst = indexOfLast - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://148.230.92.191:5000/api/categories", {
          withCredentials: true,
        });

        const normalized = res.data.map(cat => ({
          id: cat.id,
          name: cat.category_name,
          createdAt: cat.created_at,
        }));

        setCategories(normalized);
        console.log("Fetched categories:", normalized);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchCategories();
  }, []);


  if (!auth) return <p>AuthContext not available</p>;
  const { user, loading } = auth;

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;
  if (user.role !== "admin") return <Navigate to="/question" />;

  // Add
  // const handleAddCategory = () => {
  //   if (!newCategory.trim()) return alert('Category name is required!');
  //   if (categories.some(cat => cat.name.toLowerCase() === newCategory.trim().toLowerCase())) {
  //     return alert('Category already exists!');
  //   }
  //   setCategories([...categories, { name: newCategory.trim(), createdAt: getCurrentTime() }]);
  //   setNewCategory('');
  //   setShowModal(false);
  // };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return Swal.fire('Warning', 'Category name is required!', 'warning');

    // Check duplicates with 'name' (not 'category_name')
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.trim().toLowerCase())) {
      return Swal.fire('Error', 'Category already exists!', 'error');
    }

    try {
      const res = await axios.post(
        "http://148.230.92.191:5000/api/saveCategory",
        { category_name: newCategory.trim() },
        { withCredentials: true }
      );

      // Add the newly created category to local state using normalized structure
      setCategories([
        ...categories,
        {
          id: res.data.categoryId,        // returned from backend
          name: newCategory.trim(),       // keep consistent with normalized data
          createdAt: new Date().toISOString()
        }
      ]);

      setNewCategory('');
      setShowModal(false);
      Swal.fire('Success', res.data.message, 'success');
    } catch (err) {
      console.error("Error adding category:", err);
      Swal.fire('Error', err.response?.data?.message || "Failed to add category", 'error');
    }
  };

  // Edit
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditName(categories[index].name);
    setShowEditModal(true);
  };

  const handleUpdateCategory = async () => {
    if (!editName.trim()) return Swal.fire('Warning', 'Category name is required!', 'warning');

    const category = categories[editIndex];
    if (!category) return;

    try {
      const res = await axios.post(
        "http://148.230.92.191:5000/api/editCategory",
        { id: category.id, category_name: editName.trim() },
        { withCredentials: true }
      );

      Swal.fire('Success', res.data?.message || "Category updated!", 'success');

      // Update local state
      const updated = [...categories];
      updated[editIndex].name = editName.trim();
      setCategories(updated);
    } catch (err) {
      console.error("Error updating category:", err);
      Swal.fire('Error', err.response?.data?.message || "Failed to update category", 'error');
    } finally {
      setShowEditModal(false);
    }
  };
  // Delete
  const handleDelete = (index) => {
    setEditIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const category = categories[editIndex];
    if (!category) return;

    try {
      const res = await axios.post(
        "http://148.230.92.191:5000/api/deleteCategory",
        { id: category.id },
        { withCredentials: true }
      );

      if (res.data?.message) {
        Swal.fire('Deleted!', res.data?.message || "Category deleted", 'success');
      }

      // Remove from local state
      const updated = categories.filter((_, i) => i !== editIndex);
      setCategories(updated);
    } catch (err) {
      console.error("Error deleting category:", err);
      Swal.fire('Error', err.response?.data?.message || "Failed to delete category", 'error');
    } finally {
      setShowDeleteModal(false);
    }
  };


  return (
    <div className="main-layout">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
        <div className="category-container">
          <div className="top-bar">
            <h2>Category Details</h2>
            <button className="add-user-btn" onClick={() => setShowModal(true)}>
              <FaPlus /> Add Category
            </button>
          </div>
          <div className="table-responsive">
            <table className="category-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.map((cat, idx) => {
                  const actualIndex = indexOfFirst + idx;
                  return (
                    <tr key={actualIndex}>
                      <td>{actualIndex + 1}</td>
                      <td>{cat.name}</td>
                      <td>{cat.createdAt}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(actualIndex)}>
                          <MdEdit />
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(actualIndex)}>
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
              &laquo; Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
              Next &raquo;
            </button>
          </div>
        </div>

        {/* Add Category Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3>
                <FaArrowLeft className="back-icon" onClick={() => setShowModal(false)} />
                Add New Category
              </h3>
              <input
                type="text"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="category-input"
              />
              <div className="modal-buttons">
                <button className="submit-btn" onClick={handleAddCategory}>Add Category</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3>Edit Category</h3>
              <input
                type="text"
                placeholder="Edit category name..."
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="modal-input"
              />
              <div className="modal-buttons">
                <button className="submit-btn" onClick={handleUpdateCategory}>Update</button>
                <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this category?</p>
              <div className="modal-buttons">
                <button className="submit-btn" onClick={confirmDelete}>Delete</button>
                <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
