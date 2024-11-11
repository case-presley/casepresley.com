// frontend/src/components/admin/BlogManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

const BlogManagement = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editorContent, setEditorContent] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate();

    // Check for JWT token in localStorage
    const token = localStorage.getItem('token');

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    // Function to handle opening the editor modal for adding a new post
    const handleAddNewPost = () => {
        setEditorContent('');  // Clear the editor content
        setSelectedPost(null); // Clear any selected post
        setIsEditorOpen(true); // Open the editor modal
    };

    // Fetch existing blog posts
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/blogs');
                if (Array.isArray(response.data)) {
                    setBlogPosts(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setBlogPosts([]); // Set to empty array if response is not an array
                }
            } catch (error) {
                console.error('Error fetching blog posts:', error);
                setBlogPosts([]); // Set to empty array on error
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogPosts();
    }, []);

    // Handle editor content changes
    const handleEditorChange = ({ text }) => {
        setEditorContent(text);
    };

    // Function to create a new blog post
    const createBlogPost = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/blogs',
                {
                    content: editorContent,
                    title: 'New Blog Post' // Replace with dynamic title if needed
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setBlogPosts([...blogPosts, response.data]);
            setIsEditorOpen(false); // Close the editor modal
        } catch (error) {
            console.error('Error creating blog post:', error);
        }
    };

    // Function to update an existing blog post
    const updateBlogPost = async () => {
        if (!selectedPost) return;
        try {
            const response = await axios.put(
                `http://localhost:5000/api/blogs/${selectedPost._id}`,
                {
                    content: editorContent
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setBlogPosts(blogPosts.map(post => (post._id === selectedPost._id ? response.data : post)));
            setIsEditorOpen(false); // Close the editor modal
        } catch (error) {
            console.error('Error updating blog post:', error);
        }
    };

    // Function to delete a blog post
    const deleteBlogPost = async (postId) => {
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBlogPosts(blogPosts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting blog post:', error);
        }
    };

    // Open editor modal for editing an existing post
    const handleEditPost = (post) => {
        setEditorContent(post.content);
        setSelectedPost(post);
        setIsEditorOpen(true);
    };

    return (
        <div className="blog-management">
            <h2>Blog Management</h2>
            <button onClick={handleAddNewPost} className="add-new-post">Add New Post</button>
            {isLoading ? (
                <p>Loading...</p>
            ) : blogPosts.length > 0 ? (
                <ul>
                    {blogPosts.map(post => (
                        <li key={post._id}>
                            <h3>{post.title}</h3>
                            <button onClick={() => handleEditPost(post)}>Edit</button>
                            <button onClick={() => deleteBlogPost(post._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No blog posts found.</p>
            )}

            {/* Markdown Editor Modal */}
            {isEditorOpen && (
                <div className="editor-modal">
                    <h3>{selectedPost ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
                    <MdEditor
                        value={editorContent}
                        style={{ height: '400px', width: '100%' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
                    <button onClick={() => setIsEditorOpen(false)}>Cancel</button>
                    <button onClick={selectedPost ? updateBlogPost : createBlogPost}>
                        {selectedPost ? 'Update Post' : 'Save Post'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogManagement;
