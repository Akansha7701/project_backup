import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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
  const result = await Swal.fire({
    icon: "warning",
    title: "Delete Document",
    html: `
      <p style="font-size:18px;color:#6b7280;">
        Are you sure you want to delete this document?
      </p>
      <p style="margin-top:12px;color:#ef4444;font-weight:600;">
        This action cannot be undone.
      </p>
    `,
    showCancelButton: true,
    confirmButtonText: "Delete Document",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#ffffff",
    reverseButtons: true,
    customClass: {
      popup: "rounded-3xl",
      title: "text-3xl font-bold text-gray-800",
      confirmButton:
        "bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl",
      cancelButton:
        "border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl bg-white hover:bg-gray-100",
    },
  });

  if (!result.isConfirmed) return;

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

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Document deleted successfully.",
      timer: 1800,
      showConfirmButton: false,
    });

    fetchDocuments();
  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: "Unable to delete document.",
    });
  }
};

  const handleView = (id) => {
    const token = localStorage.getItem("token");

    window.open(
      `http://localhost:5000/api/documents/view/${id}?token=${token}`,
      "_blank"
    );
  };

  const filteredDocuments = documents.filter((doc) =>
    (doc.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getFileIcon = (type = "") => {
    if (type.includes("pdf")) {
      return <FaFilePdf className="text-red-500 text-xl" />;
    }

    if (
      type.includes("word") ||
      type.includes("document")
    ) {
      return <FaFileWord className="text-blue-500 text-xl" />;
    }

    return <FaFileAlt className="text-gray-500 text-xl" />;
  };

  return (
    <div className="w-full">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Documents
          </h1>

          <p className="text-gray-500 mt-2">
            Manage uploaded documents securely.
          </p>
        </div>

        {/* Search */}

        <div className="relative w-full lg:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search document..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Documents Table */}

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
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">
                    Document Title
                  </th>

                  <th className="text-left px-6 py-4 font-semibold text-gray-700">
                    Type
                  </th>

                  <th className="text-left px-6 py-4 font-semibold text-gray-700">
                    Uploaded
                  </th>

                  <th className="text-center px-6 py-4 font-semibold text-gray-700">
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
                    {/* Document Title */}

                    <td className="px-6 py-5 max-w-sm">
                      <div className="flex items-start gap-3">
                        {getFileIcon(doc.filetype)}

                        <span className="font-medium text-gray-700 break-words">
                          {doc.title || doc.filename}
                        </span>
                      </div>
                    </td>

                    {/* File Type */}

                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                        {doc.filetype
                          ? doc.filetype.split("/")[1].toUpperCase()
                          : "FILE"}
                      </span>
                    </td>

                    {/* Upload Date */}

                    <td className="px-6 py-5 whitespace-nowrap text-gray-600">
                      {doc.upload_date
                        ? new Date(doc.upload_date).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleView(doc.id)}
                          className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                          title="View Document"
                        >
                          <FaEye />
                        </button>

                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                          title="Delete Document"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Documents;