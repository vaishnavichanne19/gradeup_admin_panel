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

interface BoardUserType {
  _id: string;
  boardname: string;
}

interface ClassUserType {
  _id: string;
  classname: string;
  boardref: string;
}

interface SubjectUserType {
  _id: string;
  subjectname: string;
  classref: string;
}

export const Board: React.FC = () => {
  const [boards, setBoards] = useState<BoardUserType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      const boardRes = await axios.get("http://localhost:8005/api/getboard");
      setBoards(boardRes.data);
    };

    fetchAll();
  }, []);

  const DeleteBoard = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:8005/api/deleteboard/${userId}`);

      setBoards((PrevUser) => PrevUser.filter((user) => user._id !== userId));

      toast.error("Board Deleted Sccessfully!");
      navigate("/Board");
    } catch {
      toast.error("Failed to Delete Data");
    }
  };

  // Filtered and paginated data
  const filteredBoards = useMemo(() => {
    return boards.filter((board) =>
      board.boardname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [boards, searchQuery]);

  const totalPages = Math.ceil(filteredBoards.length / entriesPerPage);

  const paginatedBoards = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return filteredBoards.slice(startIndex, startIndex + entriesPerPage);
  }, [filteredBoards, currentPage, entriesPerPage]);

  return (
    <div>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin"
        description="This is the Board page"
      />
      <PageBreadcrumb pageTitle="Board" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Board Information
          </h3>
          <Link to="/Board-add">
            <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg">
              Add Board
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
                    Board Name
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
                {paginatedBoards.length > 0 ? (
                  paginatedBoards.map((board, index) => (
                    <TableRow key={board._id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        {(currentPage - 1) * entriesPerPage + index + 1}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-blue-700 text-start text-theme-sm font-semibold dark:text-gray-400">
                        {board.boardname}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-blue-700 text-start">
                        <div className="flex gap-3">
                          <Link to={`/Board-edit/${board._id}`}>
                            <i className="fa-solid fa-pencil align-middle"></i>
                          </Link>
                          <span
                            onClick={() => DeleteBoard(board._id)}
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
 Board Data
 ******************************************/
interface BoardData {
  boardname: string;
}

export const BoardAdd: React.FC = () => {
  const [BoardData, setBoardData] = useState<BoardData>({
    boardname: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBoardData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8005/api/createboard", BoardData);

      toast.success("Data added successfully!");
      navigate("/Board");
    } catch (error) {
      console.error("Error adding Board:", error);
      toast.error("Failed to add Board!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add Board Data
        </h2>
        <form onSubmit={submitForm}>
          <label className="block text-gray-700 dark:text-white text-sm mt-4">
            Board Name
          </label>
          <input
            type="text"
            id="boardname"
            name="boardname"
            onChange={inputHandler}
            value={BoardData.boardname}
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

interface BoardEditData {
  boardname: string;
}

export const BoardEdit: React.FC = () => {
  const [Boarduser, setBoardUser] = useState<BoardEditData>({
    boardname: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8005/api/getboardid/${id}`
        );
        if (response.data.success) {
          const data = response.data.data;
          setBoardUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load Board data.");
      }
    };
    if (id) fetchBoardData();
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBoardUser({ ...Boarduser, [name]: value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8005/api/updateboard/${id}`,
        Boarduser
      );

      if (response.data.success) {
        toast.info("Board Data updated successfully!");
        navigate("/Board");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update Board.");
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
              Board Information
            </h5>

            <div className="col-span-2 lg:col-span-1 my-6">
              <Label>Board Name</Label>
              <Input
                type="text"
                value={Boarduser.boardname}
                onChange={changeHandler}
                name="boardname"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/Board">
            <Button type="button">Close</Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
/******************************************
 Class Data
 ******************************************/
interface ClassUserData {
  classname: string;
  boardId: string;
}

export const ClassAdd: React.FC = () => {
  const [ClassData, setClassData] = useState<ClassUserData>({
    classname: "",
    boardId: "",
  });
  const [BoardUser, setBoardUser] = useState<BoardUserType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8005/api/getboard");
      setBoardUser(response.data);
    };

    fetchData();
  }, []);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClassData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8005/api/createclass", ClassData);

      toast.success("Data added successfully!");
      navigate("/Class");
    } catch (error) {
      console.error("Error adding Class:", error);
      toast.error("Failed to add Class!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add Class Data
        </h2>
        <form onSubmit={submitForm}>
          <label className="block text-gray-700 text-sm mt-4">
            Select Board
          </label>
          <select
            name="boardId"
            id="boardId"
            value={ClassData.boardId}
            onChange={inputHandler}
            className="w-full p-2 mb-4 border rounded mt-2"
            required
          >
            <option value="">-- Select Board --</option>
            {BoardUser.map((board) => (
              <option key={board._id} value={board._id}>
                {board.boardname}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 dark:text-white text-sm mt-4">
            Class Name
          </label>
          <input
            type="text"
            id="classname"
            name="classname"
            onChange={inputHandler}
            value={ClassData.classname}
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

interface ClassEditData {
  classname: string;
}

export const ClassEdit: React.FC = () => {
  const [Classuser, setClassUser] = useState<ClassEditData>({
    classname: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8005/api/getclassid/${id}`
        );
        if (response.data.success) {
          const data = response.data.data;
          setClassUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load Class data.");
      }
    };
    if (id) fetchClassData();
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClassUser({ ...Classuser, [name]: value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8005/api/updateclass/${id}`,
        Classuser
      );

      if (response.data.success) {
        toast.info("Class Data updated successfully!");
        navigate("/Class");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update Class.");
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
              Class Information
            </h5>

            <div className="col-span-2 lg:col-span-1 my-6">
              <Label>Class Name</Label>
              <Input
                type="text"
                value={Classuser.classname}
                onChange={changeHandler}
                name="classname"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/Class">
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
  classId: string;
  boardId: string;
}

export const SubjectAdd: React.FC = () => {
  const [SubjectData, setSubjectData] = useState<SubjectUserData>({
    subjectname: "",
    classId: "",
    boardId: "",
  });
  const [ClassUser, setClassUser] = useState<ClassUserType[]>([]);
  const navigate = useNavigate();
  const [BoardUser, setBoardUser] = useState<BoardUserType[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await axios.get("http://localhost:8005/api/getboard");
      setBoardUser(response.data);
    };

    fetchBoards();
  }, []);

  useEffect(() => {
    const fetchClassesByBoard = async () => {
      if (!SubjectData.boardId) {
        setClassUser([]);
        return;
      }
      const response = await axios.get(
        `http://localhost:8005/api/getclass?boardId=${SubjectData.boardId}`
      );
      setClassUser(response.data);
    };

    fetchClassesByBoard();
  }, [SubjectData.boardId]);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSubjectData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8005/api/createsubject", SubjectData);

      toast.success("Data added successfully!");
      navigate("/BoardSubject");
    } catch (error) {
      console.error("Error adding Class:", error);
      toast.error("Failed to add Class!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add Subject Data
        </h2>
        <form onSubmit={submitForm}>
          <label className="block text-gray-700 text-sm mt-4">
            Select Board
          </label>
          <select
            name="boardId"
            id="boardId"
            value={SubjectData.boardId}
            onChange={inputHandler}
            className="w-full p-2 mb-4 border rounded mt-2"
            required
          >
            <option value="">-- Select Board --</option>
            {BoardUser.map((board) => (
              <option key={board._id} value={board._id}>
                {board.boardname}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 text-sm mt-4">
            Select Class
          </label>
          <select
            name="classId"
            id="classId"
            value={SubjectData.classId}
            onChange={inputHandler}
            className="w-full p-2 mb-4 border rounded mt-2"
            required
          >
            <option value="">-- Select Class --</option>
            {ClassUser.map((classuser) => (
              <option key={classuser._id} value={classuser._id}>
                {classuser.classname}
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

export const SubjectEdit: React.FC = () => {
  const [Subjectuser, setSubjectUser] = useState<SubjectEditData>({
    subjectname: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8005/api/getsubjectid/${id}`
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
        `http://localhost:8005/api/updateSubject/${id}`,
        Subjectuser
      );

      if (response.data.success) {
        toast.info("Subject Data updated successfully!");
        navigate("/BoardSubject");
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
          <Link to="/BoardSubject">
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
  classId: string;
  boardId: string;
  subjectId: string;
}

export const PdfAdd: React.FC = () => {
  const [PdfData, setPdfData] = useState<PdfUserData>({
    pdfname: null,
    classId: "",
    boardId: "",
    subjectId: "",
  });

  const [BoardUser, setBoardUser] = useState<BoardUserType[]>([]);
  const [ClassUser, setClassUser] = useState<ClassUserType[]>([]);
  const [SubjectUser, setSubjectUser] = useState<SubjectUserType[]>([]);

  const navigate = useNavigate();

  // Fetch Boards
  useEffect(() => {
    const fetchBoards = async () => {
      const response = await axios.get("http://localhost:8005/api/getboard");
      setBoardUser(response.data);
    };
    fetchBoards();
  }, []);

  // Fetch Classes based on selected Board
  useEffect(() => {
    const fetchClassesByBoard = async () => {
      if (!PdfData.boardId) {
        setClassUser([]);
        return;
      }
      const response = await axios.get(
        `http://localhost:8005/api/getclass?boardId=${PdfData.boardId}`
      );
      setClassUser(response.data);
    };
    fetchClassesByBoard();
  }, [PdfData.boardId]);

  // Fetch Subjects based on selected Class
  useEffect(() => {
    const fetchSubjectsByClass = async () => {
      if (!PdfData.classId) {
        setSubjectUser([]);
        return;
      }
      const response = await axios.get(
        `http://localhost:8005/api/getallsubject?classId=${PdfData.classId}`
      );
      setSubjectUser(response.data);
    };
    fetchSubjectsByClass();
  }, [PdfData.classId]);

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
      !PdfData.classId ||
      !PdfData.boardId ||
      !PdfData.subjectId
    ) {
      toast.error("All fields, including PDF, are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("pdfname", PdfData.pdfname);
      formData.append("boardId", PdfData.boardId);
      formData.append("classId", PdfData.classId);
      formData.append("subjectId", PdfData.subjectId);

      await axios.post("http://localhost:8005/api/createpdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("PDF added successfully!");
      navigate("/BoardPdf");
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
            Select Board
          </label>
          <select
            name="boardId"
            value={PdfData.boardId}
            onChange={inputHandler}
            className="w-full p-2 mb-4 border rounded mt-2"
            required
          >
            <option value="">-- Select Board --</option>
            {BoardUser.map((board) => (
              <option key={board._id} value={board._id}>
                {board.boardname}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 text-sm mt-4">
            Select Class
          </label>
          <select
            name="classId"
            value={PdfData.classId}
            onChange={inputHandler}
            className="w-full p-2 mb-4 border rounded mt-2"
            required
          >
            <option value="">-- Select Class --</option>
            {ClassUser.map((classuser) => (
              <option key={classuser._id} value={classuser._id}>
                {classuser.classname}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 text-sm mt-4">
            Select Subject
          </label>
          <select
            name="subjectId"
            value={PdfData.subjectId}
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

export const PdfEdit: React.FC = () => {
  const [PdfUser, setPdfUser] = useState<PdfEditData>({
    pdfname: "",
  });

  const [updatedFile, setUpdatedFile] = useState<File | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8005/api/getpdfid/${id}`
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
        `http://localhost:8005/api/updatepdf/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.info("Pdf Data updated successfully!");
        navigate("/BoardPdf");
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
          <Link to="/BoardPdf">
            <Button type="button">Close</Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
