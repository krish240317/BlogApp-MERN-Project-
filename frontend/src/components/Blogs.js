import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const sendRequest = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blog'); // Adjust the endpoint as needed
      if (res && res.data) {
        console.log('API Response:', res.data);
        return res.data;
      } else {
        console.error('Response or response data is undefined');
        return { blogs: [] }; // Return an empty array to avoid further errors
      }
    } catch (err) {
      console.error('Error in API request:', err.response ? err.response.data : err.message);
      return { blogs: [] }; // Return an empty array to handle errors gracefully
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data && data.blogs) {
        setBlogs(data.blogs);
      } else {
        console.error('Blogs data is missing in the response');
      }
    });
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => {
          // Ensure each blog object is defined
          if (blog && blog._id) {
            return (
              <Blog
                key={index} // Add a key prop for rendering lists
                id={blog._id}
                isUser={localStorage.getItem("userId") === (blog.user ? blog.user._id : null)}
                title={blog.title}
                description={blog.description}
                imageURL={blog.image}
                userName={blog.user ? blog.user.name : 'Unknown'}
              />
            );
          } else {
            console.error('Blog object is undefined or missing _id');
            return null;
          }
        })
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};


export default Blogs;