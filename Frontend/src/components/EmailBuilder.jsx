import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"

const EmailBuilder = () => {
  const url="https://email-builder-backend-0sk9.onrender.com";
  const [title, setTitle] = useState("Sample Title");
  const [content, setContent] = useState("Sample content...");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");

  const getEmailData = async () => {
    try {
      const response = await axios.get(url+"/api/fetch", {
        params: { category },
      });

      if (response.data.success) {
        setTitle(response.data.email.title);
        setContent(response.data.email.content);
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error making API call:", error.message);
    }
  };

  const saveUserEmail = async () => {
    try {
      const response = await axios.post(url+"/api/user", {
        title,
        content,
        category,
      });
      if(response.data.success){
        toast.success(response.data.message);
      }
      else{
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error(response.data.error.message)
    }
  };
  

  const handleDownload = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email</title>
      <style>
      body {
         font-family: Arial, sans-serif;
         margin: 0;
         padding: 0;
         background-color: #f7fafc;
         color: #333;
      }

    .email-container {
      width: 80%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }

    h2 {
      color: #4A90E2;
      font-size: 24px;
      margin-bottom: 10px;
    }

    h4 {
      color: #333;
      font-size: 20px;
      margin-bottom: 8px;
    }

    p {
      font-size: 16px;
      line-height: 1.5;
      color: #555;
    }

    .email-image {
      max-width: 100%;
      height: auto;
      margin-top: 20px;
      border-radius: 8px;
    }

    .content-box {
      padding: 20px;
      background-color: #f8f8f8;
      border-radius: 8px;
      margin-top: 20px;
    }

    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }

    .footer a {
      color: #4A90E2;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="email-container">
    <h2>Email Content</h2>

    <div class="content-box">
      <h4>Title: ${title}</h4>
      <p>Content: ${content}</p>
    </div>

    <img src="${imageUrl}" alt="Image" class="email-image" />

    <div class="footer">
      <p>Thank you for reading our email. <a href="https://email-builder-frontend-8po7.onrender.com/">Visit our site</a></p>
    </div>
  </div>

</body>
</html>

    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "email.html"; // The name of the downloaded file
    link.click();
    toast.success("Download Successfull")
  };

  useEffect(() => {
    // Call the function when the category changes
    if (category) {
      getEmailData();
    }
  }, [category]); // Dependency array with 'category'

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-center text-2xl font-bold">Email Builder</h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 lg:flex lg:space-x-6">
        {/* Editor Panel */}
        <section className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-xl font-semibold mb-4">Editor</h2>
          <div className=" flex bg-white shadow-md rounded-lg p-6 gap-5 mb-3">
            Choose Email Category :
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="bg-blue-400 rounded-md text-sm w-35 h-10 text-black cursor-pointer"
            >
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
              <option value="Marketing">Marketing</option>
              <option value="Informational">Informational</option>
              <option value="Transactional">Transactional</option>
              <option value="Notification">Notification</option>
              <option value="Educational">Educational</option>
            </select>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title.toString()}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md h-32"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
          </div>
        </section>

        {/* Preview Panel */}
        <section className="bg-white shadow-md rounded-lg p-6 flex-1 mt-6 lg:mt-0">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="border border-gray-300 rounded-lg p-4">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-gray-700 mb-4">{content}</p>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-auto rounded-md"
              />
            )}
          </div>
        </section>
      </main>
      {/* Save Button */}
      <div className="flex justify-center gap-3 mt-3">
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-transform transform hover:scale-105 sm:px-8 sm:py-4 sm:text-lg md:text-xl"
          onClick={saveUserEmail}
        >
          Send Email
        </button>
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-transform transform hover:scale-105 sm:px-8 sm:py-4 sm:text-lg md:text-xl"
        >
          Download Email
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-6">
        <p className="text-center">
          Email Builder Copyright @ 2025 . All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default EmailBuilder;
