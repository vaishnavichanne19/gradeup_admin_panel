import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";

interface PracticepdfUserType {
  _id: string;
  heading: string;
  practicepdf: string;
}

export const Practicepdf: React.FC = () => {
  const [PracticepdfUser, setPracticepdfUser] = useState<PracticepdfUserType[]>(
    []
  );
  const [MainHeading, setMainHeading] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.gradeup01.in/api/getpracticepdf"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setPracticepdfUser(response.data.slice(1));
      }
    };

    fetchData();
  }, []);

  const DeleteData = async (userID: string) => {
    try {
        await axios.delete(`https://api.gradeup01.in/api/deletepracticepdf/${userID}`);

        setPracticepdfUser((Prevuser) => 
        Prevuser.filter((user) => user._id !== userID)
        )

        toast.error("Data Deleted Successfully!")
        navigate("/Practicepdf")
    } catch {
        toast.error("Failed to Delete Data")
    }
  }

  return (
    <div>
      <PageMeta
        title="React.js Profile DashPracticepdf | TailAdmin"
        description="This is the Practicepdf page"
      />
      <PageBreadcrumb pageTitle="Practicepdf" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Parctice pdf Information
          </h3>
        </div>

        <div className="space-y-6 mt-6">
          <div className="flex flex-col gap-6">
            <div className="w-full border p-4 rounded-lg shadow-md dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="my-4">
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Heading
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {MainHeading}
                  </p>
                </div>
                <Link to={`/Practicepdf-edit/${"6872392edb978b904f310273"}`}>
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

              <div className="w-full border p-4 rounded-lg shadow-md dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Practice Pdfs
                  </p>
                  <Link to="/Practicepdf-add">
                    <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Add Data
                    </button>
                  </Link>
                </div>
                {PracticepdfUser.map((user) => (
                  <div className="flex items-start my-2">
                    <li className="text-sm font-medium text-gray-800 dark:text-white/90">
                      <a
                        href={`https://api.gradeup01.in/files/${user.practicepdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.practicepdf
                          ? user.practicepdf.replace(/^\d+_/, "")
                          : "Open PDF"}
                      </a>
                    </li>
                    <Link to={`/Practicepdf-edit/${user._id}`}>
                      <button className="border-gray-300 bg-white px-1  text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
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
                      </button>
                    </Link>
                    <span onClick={() => DeleteData(user._id)}><i className="fa-solid fa-trash text-gray-700"></i></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PracticepdfData {
  practicepdf: File | null;
}

export const PracticepdfAdd: React.FC = () => {
  const [practicepdfUser, setPracticepdfUser] = useState<PracticepdfData>({
    practicepdf: null,
  });

  const navigate = useNavigate();

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

      setPracticepdfUser((prev) => ({ ...prev, practicepdf: file }));
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!practicepdfUser.practicepdf) {
      toast.error("All fields, including PDF, are required!");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("practicepdf", practicepdfUser.practicepdf);

      await axios.post(
        "https://api.gradeup01.in/api/createPracticepdf",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Data added successfully!");
      navigate("/Practicepdf");
    } catch (error) {
      console.error("Error adding Practicepdf:", error);
      toast.error("Failed to add Practicepdf!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add Practice PDF
        </h2>
        <form onSubmit={submitForm}>
          <label className="block text-gray-700 dark:text-white text-sm mt-4 mb-2">
            Upload PDF
          </label>
          <input
            type="file"
            name="practicepdf"
            accept="application/pdf"
            onChange={fileHandler}
            className="w-full p-2 mb-6 border rounded"
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

interface PracticepdfEditData {
  heading: string;
  practicepdf: string;
}

export const PracticepdfEdit: React.FC = () => {
  const [practicepdfUser, setPracticepdfUser] = useState<PracticepdfEditData>({
    heading: "",
    practicepdf: "",
  });

  const [updatedFile, setUpdatedFile] = useState<File | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPracticepdfData = async () => {
      try {
        const response = await axios.get(
          `https://api.gradeup01.in/api/getpracticepdfid/${id}`
        );
        if (response.data.success) {
          const data = response.data.data;
          setPracticepdfUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load Practicepdf data.");
      }
    };

    if (id) fetchPracticepdfData();
  }, [id]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPracticepdfUser({ ...practicepdfUser, [name]: value });
  };

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
    formData.append("heading", practicepdfUser.heading);
    if (updatedFile) formData.append("practicepdf", updatedFile);

    try {
      const response = await axios.put(
        `https://api.gradeup01.in/api/updatepracticepdf/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.info("Data updated successfully!");
        navigate("/Practicepdf");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update Practicepdf.");
    }
  };

  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 border border-gray-300">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Practice PDF
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className=" px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Practice PDF Information
            </h5>

            {practicepdfUser.heading && (
              <div className="col-span-2 lg:col-span-1 my-6">
                <Label>Heading</Label>
                <Input
                  type="text"
                  value={practicepdfUser.heading}
                  onChange={changeHandler}
                  name="heading"
                />
              </div>
            )}

            {practicepdfUser.practicepdf && (
              <div className="col-span-2 lg:col-span-1 mt-6">
                <Label>Upload New PDF</Label>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept="application/pdf"
                  className="mb-4"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/Practicepdf">
            <Button type="button">Close</Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
