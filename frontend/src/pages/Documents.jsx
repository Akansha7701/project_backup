import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaTrash,
  FaEye,
  FaSearch,
} from "react-icons/fa";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/documents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDocuments(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch documents");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/documents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Document deleted successfully");

      fetchDocuments();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.filename.toLowerCase().includes(search.toLowerCase())
  );

  const getFileIcon = (type) => {
    if (type.includes("pdf"))
      return <FaFilePdf className="text-red-500 text-xl" />;

    if (type.includes("word"))
      return <FaFileWord className="text-blue-500 text-xl" />;

    return <FaFileAlt className="text-gray-500 text-xl" />;
  };

  return (
    <div>

      {/* Heading */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Documents
          </h1>

          <p className="text-gray-500 mt-2">
            Manage uploaded documents securely.
          </p>
        </div>

        {/* Search */}

        <div className="relative w-80">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search document..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

        {filteredDocuments.length === 0 ? (

          <div className="text-center py-20">
            <FaFileAlt className="mx-auto text-6xl text-gray-300 mb-4" />

            <h2 className="text-xl font-semibold text-gray-600">
              No Documents Found
            </h2>

            <p className="text-gray-400 mt-2">
              Upload your first document.
            </p>
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-6 py-4">
                  File
                </th>

                <th className="text-left px-6 py-4">
                  Type
                </th>

                <th className="text-left px-6 py-4">
                  Uploaded
                </th>

                <th className="text-center px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredDocuments.map((doc) => (

                <tr
                  key={doc.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      {getFileIcon(doc.filetype)}

                      <span className="font-medium text-gray-700">
                        {doc.filename}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5">

                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                      {doc.filetype.split("/")[1].toUpperCase()}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    {new Date(doc.upload_date).toLocaleDateString()}

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button
                        className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default Documents;