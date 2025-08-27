import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../components/ui/table";

interface BoardUserType {
  _id: string;
  boardname: string;
}

interface ClassUserType {
  _id: string;
  classname: string;
  boardref: string;
}

export const BoardClass: React.FC = () => {
  const [boards, setBoards] = useState<BoardUserType[]>([]);
  const [classes, setClasses] = useState<ClassUserType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      const boardRes = await axios.get("https://api.gradeup01.in/api/getboard");
      const classRes = await axios.get("https://api.gradeup01.in/api/getclass");

      setBoards(boardRes.data);
      setClasses(classRes.data);
    };

    fetchAll();
  }, []);

  const DeleteClass = async (userId: string) => {
    try {
      await axios.delete(`https://api.gradeup01.in/api/deleteclass/${userId}`);

      setClasses((PrevUser) => PrevUser.filter((user) => user._id !== userId));

      toast.error("Class Deleted Sccessfully!");
      navigate("/Class");
    } catch {
      toast.error("Failed to Delete Data");
    }
  };

  // Filtered and paginated data
  const filteredClassData = useMemo(() => {
    return classes
      .map((cls) => {
        const board = boards.find((b) => b._id === cls.boardref);
        if (!board) return null;
        return {
          ...cls,
          boardname: board.boardname,
        };
      })
      .filter(
        (item): item is ClassUserType & { boardname: string } => item !== null
      )
      .filter(
        (item) =>
          item.classname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.boardname.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [classes, boards, searchQuery]);

  const totalPages = Math.ceil(filteredClassData.length / entriesPerPage);

  const paginatedClasses = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    return filteredClassData.slice(start, end);
  }, [filteredClassData, currentPage, entriesPerPage]);

  return (
    <div>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin"
        description="This is the Class page"
      />
      <PageBreadcrumb pageTitle="Class" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Class Information
          </h3>
          <Link to="/Class-add">
            <button className="btn  bg-blue-700 text-white px-3 py-1 rounded-lg">
              Add Class
            </button>
          </Link>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <label className="text-sm text-gray-600">entries</label>
          </div>

          <input
            type="text"
            placeholder="Search Board Name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded w-full sm:w-72 text-sm"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Sr. No
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Board Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Class Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {paginatedClasses.length > 0 ? (
                  paginatedClasses.map((cls, index) => (
                    <TableRow key={cls._id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        {(currentPage - 1) * entriesPerPage + index + 1}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-blue-700 text-start text-theme-sm font-semibold dark:text-gray-400">
                        {cls.boardname}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-green-700 text-start text-theme-sm font-semibold dark:text-gray-400">
                        {cls.classname}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-green-700 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex gap-3">
                          <Link to={`/Class-edit/${cls._id}`}>
                            <i className="fa-solid fa-pencil align-middle"></i>
                          </Link>
                          <span onClick={() => DeleteClass(cls._id)}>
                            <i className="fa-solid fa-trash align-middle"></i>
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-center py-4 text-gray-500">
                      No records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center space-x-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
