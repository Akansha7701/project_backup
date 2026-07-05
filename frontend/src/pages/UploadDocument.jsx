import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaFileAlt } from "react-icons/fa";

function UploadDocument() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // Required
      formData.append("document", file);

      // Optional (only if backend supports it)
      formData.append("title", title);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/documents/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.message);

      setTitle("");
      setFile(null);
    } catch (error) {
      console.log(error);
      toast.error("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Upload Document</h1>

        <p className="text-gray-500 mt-2">
          Securely upload documents to the Intelligent Document Assistant.
        </p>
      </div>

      {/* Upload Card */}

      <form
        onSubmit={handleUpload}
        className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8"
      >
        {/* Document Title */}

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Document Title
          </label>

          <input
            type="text"
            placeholder="Enter document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Upload Area */}

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-3">
            Upload File
          </label>

          <label
            htmlFor="fileUpload"
            className="border-2 border-dashed border-blue-300 rounded-2xl h-64 flex flex-col justify-center items-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition"
          >
            <FaCloudUploadAlt size={60} className="text-blue-600 mb-4" />

            <h3 className="text-xl font-semibold text-gray-700">
              Click to Upload
            </h3>

            <p className="text-gray-500 mt-2">PDF, DOCX, PPT, XLSX or TXT</p>

            <input
              id="fileUpload"
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>

        {/* Selected File */}

        {file && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <FaFileAlt className="text-white text-xl" />
            </div>

            <div>
              <p className="font-semibold text-gray-800">{file.name}</p>

              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        )}

        {/* Upload Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Document"}
        </button>
      </form>
    </div>
  );
}

export default UploadDocument;
