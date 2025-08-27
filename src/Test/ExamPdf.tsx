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

interface EntranceExamUserType {
  _id: string;
  examname: string;
}

interface SubjectUserType {
  _id: string;
  subjectname: string;
  entranceexamref: string;
}

interface PdfUserType {
  _id: string;
  pdfname: string;
  examsubjectref: string;
}

export const ExamPdf: React.FC = () => {
  const [Exampdfs, setExampdfs] = useState<EntranceExamUserType[]>([]);
  const [subjects, setSubjects] = useState<SubjectUserType[]>([]);
  const [pdfs, setPdfs] = useState<PdfUserType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      const ExamRes = await axios.get("https://api.gradeup01.in/api/getexam");
      const subjectRes = await axios.get(
        "https://api.gradeup01.in/api/getallexamsubject"
      );
      const pdfRes = await axios.get("https://api.gradeup01.in/api/getexampdf");

      setExampdfs(ExamRes.data);
      setSubjects(subjectRes.data);
      setPdfs(pdfRes.data);
    };

    fetchAll();
  }, []);

  const DeletePdf = async (userId: string) => {
    try {
      await axios.delete(`https://api.gradeup01.in/api/deleteexampdf/${userId}`);

      setPdfs((PrevUser) => PrevUser.filter((user) => user._id !== userId));

      toast.error("Pdf Deleted Sccessfully!");
      navigate("/ExamPdf");
    } catch {
      toast.error("Failed to Delete Data");
    }
  };

  // Filtered and paginated data
  const filteredPdfData = useMemo(() => {
    return pdfs
      .map((pdf) => {
        const subj = subjects.find((c) => c._id === pdf.examsubjectref);
        if (!subj) return null;

        const Exam = Exampdfs.find((e) => e._id === subj.entranceexamref);
        if (!Exam) return null;

        return {
          _id: pdf._id,
          pdfname: pdf.pdfname,
          subjectname: subj.subjectname,
          examname: Exam.examname,
        };
      })
      .filter(
        (
          item
        ): item is {
          _id: string;
          pdfname: string;
          subjectname: string;
          examname: string;
        } => item !== null
      )
      .filter(
        (item) =>
          item.pdfname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subjectname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.examname.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [pdfs, subjects, Exampdfs, searchQuery]);

  const totalPages = Math.ceil(filteredPdfData.length / entriesPerPage);

  const paginatedPdf = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    return filteredPdfData.slice(start, end);
  }, [filteredPdfData, currentPage, entriesPerPage]);

  return (
    <div>
      <PageMeta
        title="React.js Profile DashExam | TailAdmin"
        description="This is the Exam Pdf page"
      />
      <PageBreadcrumb pageTitle="Exam Pdf" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Pdfs Information
          </h3>
          <Link to="/ExamPdf-add">
            <button className="btn  bg-blue-700 text-white px-3 py-1 rounded-lg">
              Add Pdf
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
            placeholder="Search Exam Name"
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
                    Exam Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Subject Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Pdf
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
                {paginatedPdf.length > 0 ? (
                  paginatedPdf.map((pdf, index) => (
                    <TableRow key={pdf._id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        {(currentPage - 1) * entriesPerPage + index + 1}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-blue-700 text-start text-theme-sm font-semibold dark:text-gray-400">
                        {pdf.examname}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-purple-700 text-start text-theme-sm font-semibold dark:text-gray-400">
                        {pdf.subjectname}
                      </TableCell>
                      <TableCell className="px-4 py-3  text-start text-theme-sm font-semibold dark:text-gray-400">
                        <a
                          href={`https://api.gradeup01.in/files/${pdf.pdfname}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-600 underline"
                        >
                          {pdf.pdfname.replace(/^\d+_/, "")}
                        </a>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex gap-3">
                          <Link to={`/ExamPdf-edit/${pdf._id}`}>
                            <i className="fa-solid fa-pencil align-middle text-blue-600"></i>
                          </Link>
                          <span onClick={() => DeletePdf(pdf._id)}>
                            <i className="fa-solid fa-trash align-middle text-blue-600"></i>
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
