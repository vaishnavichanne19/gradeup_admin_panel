import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../components/ui/table";

interface EntranceExamUserType {
  _id: string;
  heading: string;
  heading1: string;
  examname: string;
}

interface SubjectUserType {
  _id: string;
  subjectname: string;
  entranceexamref: string;
}

export const EntranceExam: React.FC = () => {
  const [EntranceExams, setEntranceExams] = useState<EntranceExamUserType[]>(
    []
  );
  const [MainHeading, setMainHeading] = useState("");
  const [MainHeading1, setMainHeading1] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://api.gradeup01.in/api/getexam");

      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setMainHeading1(response.data[0].heading1);
        setEntranceExams(response.data.slice(1));
      }
    };

    fetchData();
  }, []);

  const DeleteEntranceExam = async (userId: string) => {
    try {
      await axios.delete(
        `https://api.gradeup01.in/api/deleteEntranceExam/${userId}`
      );

      setEntranceExams((PrevUser) =>
        PrevUser.filter((user) => user._id !== userId)
      );

      toast.error("EntranceExam Deleted Sccessfully!");
      navigate("/EntranceExam");
    } catch {
      toast.error("Failed to Delete Data");
    }
  };

  // Filtered and paginated data
  const filteredExam = useMemo(() => {
    return EntranceExams.filter((exam) =>
      exam.examname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [EntranceExams, searchQuery]);

  const totalPages = Math.ceil(filteredExam.length / entriesPerPage);

  const paginatedEntranceExam = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return filteredExam.slice(startIndex, startIndex + entriesPerPage);
  }, [filteredExam, currentPage, entriesPerPage]);

  return (
    <div>
      <PageMeta
        title="React.js Profile DashEntranceExam | TailAdmin"
        description="This is the EntranceExam page"
      />
      <PageBreadcrumb pageTitle="EntranceExam" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Entrance Exam Information
          </h3>
        </div>
        <div className="space-y-6 mt-6 mb-10">
          <div className="flex flex-col gap-6">
            <div className="w-full border p-4 rounded-lg shadow-md dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="mb-4">
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Red Font Heading
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {MainHeading1}
                  </p>
                </div>

                <Link to={`/EntranceExam-edit/${"687b7c060724a0825768ce2d"}`}>
                  <button className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                        fill=""
                      />
                    </svg>
                    Edit
                  </button>
                </Link>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Heading
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {MainHeading}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Link to="/EntranceExam-add">
            <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg">
              Add Exam
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
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start"
                  >
                    Sr. No
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start"
                  >
                    Entrance Exam Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-200 dark:divide-white/[0.05]">
                {paginatedEntranceExam.length > 0 ? (
                  paginatedEntranceExam.map((exam, index) => (
                    <TableRow key={exam._id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        {(currentPage - 1) * entriesPerPage + index + 1}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-blue-700 text-start text-theme-sm font-semibold dark:text-gray-400">
                        {exam.examname}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-blue-700 text-start">
                        <div className="flex gap-3">
                          <Link to={`/EntranceExam-edit/${exam._id}`}>
                            <i className="fa-solid fa-pencil align-middle"></i>
                          </Link>
                          <span
                            onClick={() => DeleteEntranceExam(exam._id)}
                            className="cursor-pointer"
                          >
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

/******************************************
 EntranceExam Data
 ******************************************/
interface EntranceExamData {
  examname: string;
}

export const EntranceExamAdd: React.FC = () => {
  const [EntranceExamData, setEntranceExamData] = useState<EntranceExamData>({
    examname: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntranceExamData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://api.gradeup01.in/api/createexam",
        EntranceExamData
      );

      toast.success("Data added successfully!");
      navigate("/EntranceExam");
    } catch (error) {
      console.error("Error adding EntranceExam:", error);
      toast.error("Failed to add EntranceExam!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add Entrance Exam Data
        </h2>
        <form onSubmit={submitForm}>
          <label className="block text-gray-700 dark:text-white text-sm mt-4">
            Entrance Exam Name
          </label>
          <input
            type="text"
            id="examname"
            name="examname"
            onChange={inputHandler}
            value={EntranceExamData.examname}
            className="w-full p-2 mb-4 border rounded mt-4"
          />

          <div className="flex items-center gap-3 mt-6 sm:justify-end">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EntranceExamEditData {
  heading: string;
  heading1: string;
  examname: string;
}

export const EntranceExamEdit: React.FC = () => {
  const [EntranceExamuser, setEntranceExamUser] =
    useState<EntranceExamEditData>({
      examname: "",
      heading: "",
      heading1: "",
    });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntranceExamData = async () => {
      try {
        const response = await axios.get(
          `https://api.gradeup01.in/api/getexambyid/${id}`
        );
        if (response.data.success) {
          const data = response.data.data;
          setEntranceExamUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load EntranceExam data.");
      }
    };
    if (id) fetchEntranceExamData();
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntranceExamUser({ ...EntranceExamuser, [name]: value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://api.gradeup01.in/api/updateexam/${id}`,
        EntranceExamuser
      );

      if (response.data.success) {
        toast.info("Entrance Exam Data updated successfully!");
        navigate("/EntranceExam");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update EntranceExam.");
    }
  };

  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 border border-gray-300">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className="px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Entrance Exam Information
            </h5>

            {EntranceExamuser.heading1 && (
              <div className="col-span-2 lg:col-span-1 my-6">
                <Label>Red Font Heading</Label>
                <Input
                  type="text"
                  value={EntranceExamuser.heading1}
                  onChange={changeHandler}
                  name="heading1"
                />
              </div>
            )}

            {EntranceExamuser.heading && (
              <div className="col-span-2 lg:col-span-1 my-6">
                <Label>Heading</Label>
                <Input
                  type="text"
                  value={EntranceExamuser.heading}
                  onChange={changeHandler}
                  name="heading"
                />
              </div>
            )}

            {EntranceExamuser.examname && (
              <div className="col-span-2 lg:col-span-1 my-6">
                <Label>Entrance Exam Name</Label>
                <Input
                  type="text"
                  value={EntranceExamuser.examname}
                  onChange={changeHandler}
                  name="examname"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/EntranceExam">
            <Button type="button">Close</Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

/******************************************
 Subject Data
 ******************************************/
interface SubjectUserData {
  subjectname: string;
  entranceexamId: string;
}

export const ExamSubjectAdd: React.FC = () => {
  const [SubjectData, setSubjectData] = useState<SubjectUserData>({
    subjectname: "",
    entranceexamId: "",
  });
  const navigate = useNavigate();
  const [EntranceExamUser, setEntranceExamUser] = useState<
    EntranceExamUserType[]
  >([]);

  useEffect(() => {
    const fetchEntranceExams = async () => {
      const response = await axios.get("https://api.gradeup01.in/api/getexam");
      setEntranceExamUser(response.data.slice(1));
    };

    fetchEntranceExams();
  }, []);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSubjectData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://api.gradeup01.in/api/createexamsubject",
        SubjectData
      );

      toast.success("Data added successfully!");
      navigate("/ExamSubject");
    } catch (error) {
      console.error("Error adding Class:", error);
      toast.error("Failed to add Class!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add Subject
        </h2>
        <form onSubmit={submitForm}>
          <label className="block text-gray-700 text-sm mt-4">
            Select Entrance Exam
          </label>
          <select
            name="entranceexamId"
            id="entranceexamId"
            value={SubjectData.entranceexamId}
            onChange={inputHandler}
            className="w-full p-2 mb-4 border rounded mt-2"
            required
          >
            <option value="">-- Select Entrance Exam --</option>
            {EntranceExamUser.map((EntranceExam) => (
              <option key={EntranceExam._id} value={EntranceExam._id}>
                {EntranceExam.examname}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 dark:text-white text-sm mt-4">
            Subject Name
          </label>
          <input
            type="text"
            id="subjectname"
            name="subjectname"
            onChange={inputHandler}
            value={SubjectData.subjectname}
            className="w-full p-2 mb-4 border rounded mt-4"
          />
          <div className="flex items-center gap-3 mt-6 sm:justify-end">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface SubjectEditData {
  subjectname: string;
}

export const ExamSubjectEdit: React.FC = () => {
  const [Subjectuser, setSubjectUser] = useState<SubjectEditData>({
    subjectname: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await axios.get(
          `https://api.gradeup01.in/api/getexamsubjectid/${id}`
        );
        if (response.data.success) {
          const data = response.data.data;
          setSubjectUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load Subject data.");
      }
    };
    if (id) fetchSubjectData();
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubjectUser({ ...Subjectuser, [name]: value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://api.gradeup01.in/api/updateexamsubject/${id}`,
        Subjectuser
      );

      if (response.data.success) {
        toast.info("Subject Data updated successfully!");
        navigate("/ExamSubject");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update Subject.");
    }
  };

  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 border border-gray-300">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className="px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Subject Information
            </h5>

            <div className="col-span-2 lg:col-span-1 my-6">
              <Label>Subject Name</Label>
              <Input
                type="text"
                value={Subjectuser.subjectname}
                onChange={changeHandler}
                name="subjectname"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/ExamSubject">
            <Button type="button">Close</Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

/******************************************
 Pdf Data
 ******************************************/
interface PdfUserData {
  pdfname: File | null;
  entranceexamId: string;
  entranceexamsubjectId: string;
}

export const ExamPdfAdd: React.FC = () => {
  const [PdfData, setPdfData] = useState<PdfUserData>({
    pdfname: null,
    entranceexamId: "",
    entranceexamsubjectId: "",
  });

  const [EntranceExamUser, setEntranceExamUser] = useState<
    EntranceExamUserType[]
  >([]);
  const [SubjectUser, setSubjectUser] = useState<SubjectUserType[]>([]);

  const navigate = useNavigate();

  // Fetch EntranceExams
  useEffect(() => {
    const fetchEntranceExams = async () => {
      const response = await axios.get("https://api.gradeup01.in/api/getexam");
      setEntranceExamUser(response.data.slice(1));
    };
    fetchEntranceExams();
  }, []);

  // Fetch Subjects based on selected Exam
  useEffect(() => {
    const fetchSubjectsByExam = async () => {
      if (!PdfData.entranceexamId) {
        setSubjectUser([]);
        return;
      }
      const response = await axios.get(
        `https://api.gradeup01.in/api/getallexamsubject?entranceexamId=${PdfData.entranceexamId}`
      );
      setSubjectUser(response.data);
    };
    fetchSubjectsByExam();
  }, [PdfData.entranceexamId]);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPdfData((prev) => ({ ...prev, [name]: value }));
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["application/pdf"];
      const maxSize = 50 * 1024 * 1024; // 50MB

      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF files are allowed.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size should be under 50MB.");
        return;
      }

      setPdfData((prev) => ({ ...prev, pdfname: file }));
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !PdfData.pdfname ||
      !PdfData.entranceexamId ||
      !PdfData.entranceexamsubjectId
    ) {
      toast.error("All fields, including PDF, are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("pdfname", PdfData.pdfname);
      formData.append("entranceexamId", PdfData.entranceexamId);
      formData.append("entranceexamsubjectId", PdfData.entranceexamsubjectId);

      await axios.post("https://api.gradeup01.in/api/createexampdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("PDF added successfully!");
      navigate("/ExamPdf");
    } catch (error) {
      console.error("Error adding PDF:", error);
      toast.error("Failed to add PDF!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add PDF Data
        </h2>
        <form onSubmit={submitForm}>
          <label className="block text-gray-700 text-sm mt-4">
            Select Entrance Exam
          </label>
          <select
            name="entranceexamId"
            value={PdfData.entranceexamId}
            onChange={inputHandler}
            className="w-full p-2 mb-4 border rounded mt-2"
            required
          >
            <option value="">-- Select Entrance Exam --</option>
            {EntranceExamUser.map((EntranceExam) => (
              <option key={EntranceExam._id} value={EntranceExam._id}>
                {EntranceExam.examname}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 text-sm mt-4">
            Select Subject
          </label>
          <select
            name="entranceexamsubjectId"
            value={PdfData.entranceexamsubjectId}
            onChange={inputHandler}
            className="w-full p-2 mb-4 border rounded mt-2"
            required
          >
            <option value="">-- Select Subject --</option>
            {SubjectUser.map((subjectuser) => (
              <option key={subjectuser._id} value={subjectuser._id}>
                {subjectuser.subjectname}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 text-sm mt-4">Upload PDF</label>
          <input
            type="file"
            name="pdfname"
            accept="application/pdf"
            onChange={fileHandler}
            className="w-full p-2 mb-4 border rounded mt-2"
          />

          <div className="flex items-center gap-3 mt-6 sm:justify-end">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface PdfEditData {
  pdfname: string;
}

export const ExamPdfEdit: React.FC = () => {
  const [_PdfUser, setPdfUser] = useState<PdfEditData>({
    pdfname: "",
  });

  const [updatedFile, setUpdatedFile] = useState<File | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        const response = await axios.get(
          `https://api.gradeup01.in/api/getexampdfid/${id}`
        );
        if (response.data.success) {
          const data = response.data.data;
          setPdfUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load Pdf data.");
      }
    };

    if (id) fetchPdfData();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["application/pdf"];
    const maxSize = 50 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size should be under 50MB.");
      return;
    }

    setUpdatedFile(file);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (updatedFile) formData.append("pdfname", updatedFile);

    try {
      const response = await axios.put(
        `https://api.gradeup01.in/api/updateexampdf/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.info("Pdf Data updated successfully!");
        navigate("/ExamPdf");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update Pdf.");
    }
  };

  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 border border-gray-300">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className=" px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              PDF Information
            </h5>
            <div className="col-span-2 lg:col-span-1 mt-6">
              <Label>Upload New PDF</Label>
              <Input
                type="file"
                onChange={handleFileChange}
                accept="application/pdf"
                className="mb-4"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/ExamPdf">
            <Button type="button">Close</Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
