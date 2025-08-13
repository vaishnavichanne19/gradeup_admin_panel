import React, { useState, useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { Link, useNavigate, useParams } from "react-router";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import TextArea from "../components/form/input/TextArea";

interface FAQUserType {
  _id: string;
  mainheading: string;
  heading1: string;
  heading2: string;
  subheading1: string;
  subheading2: string;
  title: string;
  description: string;
}

export const FAQ: React.FC = () => {
  const [FAQUser, setFAQUser] = useState<FAQUserType[]>([]);
  const [mainheading, setmainheading] = useState("");
  const [heading, setheading] = useState("");
  const [subheading, setsubheading] = useState("");
  const [heading1, setheading1] = useState("");
  const [subheading1, setsubheading1] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8005/api/getfaq");
      if (response.data.length > 0) {
        setmainheading(response.data[0].mainheading);
        setheading(response.data[0].heading1);
        setsubheading(response.data[0].heading2);
        setheading1(response.data[0].subheading1);
        setsubheading1(response.data[0].subheading2);
        setFAQUser(response.data.slice(1));
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:8005/api/deletefaq/${userId}`);

      setFAQUser((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );

      toast.error("Data Deleted Successfully!");
      navigate("/FAQ");
    } catch (error) {
      console.error("There was an error!", error);
      toast.error("Failed to delete data!");
    }
  };

  return (
    <div>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin"
        description="This is the FAQ page"
      />
      <PageBreadcrumb pageTitle="FAQ" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            FAQ Information
          </h3>
        </div>

        <div className="space-y-6 mt-6">
          <div className="flex flex-col gap-6">
            <div className="w-full border p-4 rounded-lg shadow-md dark:border-gray-700">
              {/* Heading and Edit Button Row */}
              <div className="flex items-start justify-between">
                <div className="mb-4">
                  <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Main Heading
                  </p>
                  <p
                    className="text-sm w-50 font-medium text-gray-800 dark:text-white/90"
                    dangerouslySetInnerHTML={{ __html: mainheading }}
                  ></p>
                </div>

                <Link to={`/FAQ-edit/${"68694029c9a510889289c7d6"}`}>
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

              <div className="mb-4">
                <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Heading
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {heading}
                </p>
              </div>

              <div className="mb-4 mt-4">
                <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Red Font Heading
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {heading1}
                </p>
              </div>

              <div>
                <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Sub-Heading
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {subheading}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Red Font Sub-Heading
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {subheading1}
                </p>
              </div>
              <div className="flex justify-between">
                <div></div>
                <Link to="/FAQ-add">
                  <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Add Data
                  </button>
                </Link>
              </div>

              {FAQUser.map((user) => (
                <div>
                  <div className="mt-4">
                    <p className="flex items-center text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Title
                      <Link to={`/FAQ-edit-data/${user._id}`}>
                        <button className="bg-white px-1 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
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
                      <span onClick={() => deleteUser(user._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.title}
                    </p>
                  </div>

                  <div className="my-4">
                    <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Description
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.description}
                    </p>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FAQData {
  description: string;
  title: string;
}

export const FAQAdd: React.FC = () => {
  const [FAQData, setFAQData] = useState<FAQData>({
    description: "",
    title: "",
  });

  const navigate = useNavigate();

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFAQData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8005/api/createfaq", FAQData);

      toast.success("Data added successfully!");
      navigate("/FAQ");
    } catch (error) {
      console.error("Error adding FAQ:", error);
      toast.error("Failed to add FAQ!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add Data
        </h2>
        <form onSubmit={submitForm}>
          <label className="block text-gray-700 dark:text-white text-sm mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={inputHandler}
            value={FAQData.title}
            className="w-full p-2 mb-4 border rounded"
          />
          <label className="block text-gray-700 dark:text-white text-sm mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={7}
            onChange={inputHandler}
            value={FAQData.description}
            className="w-full p-2 mb-4 border rounded"
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

interface FAQEditData {
  mainheading: string;
  heading1: string;
  subheading1: string;
  heading2: string;
  subheading2: string;
}

export const FAQEdit: React.FC = () => {
  const [FAQuser, setFAQUser] = useState<FAQEditData>({
    mainheading: "",
    heading1: "",
    subheading1: "",
    heading2: "",
    subheading2: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [editorLoaded, setEditorLoaded] = useState(false);

  // Load CKEditor
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.ckeditor.com/4.21.0/standard/ckeditor.js";
    script.async = true;
    script.onload = () => setEditorLoaded(true);
    document.body.appendChild(script);

    return () => {
      if ((window as any).CKEDITOR) {
        Object.keys((window as any).CKEDITOR.instances).forEach((instance) => {
          (window as any).CKEDITOR.instances[instance].destroy(true);
        });
      }
    };
  }, []);

  // Fetch FirstStep data
  const fetchFirstStepData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8005/api/getfaqbyid/${id}`
      );
      console.log("API response:", response.data);
      if (response.data.success) {
        const data = response.data.data;

        setFAQUser(data);

        // Wait for CKEditor to be ready
        const interval = setInterval(() => {
          if ((window as any).CKEDITOR?.instances?.editor) {
            (window as any).CKEDITOR.instances.editor.setData(data.mainheading);
            clearInterval(interval);
          }
        }, 100);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load FirstStep data.");
    }
  };

  // On editor load, fetch data
  useEffect(() => {
    if (editorLoaded) fetchFirstStepData();
  }, [editorLoaded, id]);

  // Initialize editor
  useEffect(() => {
    if (editorLoaded && !(window as any).CKEDITOR.instances.editor) {
      (window as any).CKEDITOR.replace("editor");
    }
  }, [editorLoaded]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFAQUser({ ...FAQuser, [name]: value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "mainheading",
      (window as any).CKEDITOR.instances.editor.getData()
    );
    formData.append("heading1", FAQuser.heading1);
    formData.append("subheading1", FAQuser.subheading1);
    formData.append("heading2", FAQuser.heading2);
    formData.append("subheading2", FAQuser.subheading2);

    try {
      const response = await axios.put(
        `http://localhost:8005/api/updatefaq/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.info("Data updated successfully!");
        navigate("/FAQ");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update FAQ.");
    }
  };

  return (
    <div className="border border-gray-300 no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit FAQ Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className="px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              FAQ Information
            </h5>
            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Main Heading</Label>
              <TextArea id="editor" />
            </div>

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Heading</Label>
              <Input
                type="text"
                value={FAQuser.heading1}
                onChange={changeHandler}
                name="heading1"
              />
            </div>

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Red Font Heading</Label>
              <Input
                type="text"
                value={FAQuser.subheading1}
                onChange={changeHandler}
                name="subheading1"
              />
            </div>

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Sub-Heading</Label>
              <Input
                type="text"
                value={FAQuser.heading2}
                onChange={changeHandler}
                name="heading2"
              />
            </div>

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Red Font Sub-Heading</Label>
              <Input
                type="text"
                value={FAQuser.subheading2}
                onChange={changeHandler}
                name="subheading2"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/FAQ">
            <Button type="button">Close</Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

interface FAQEditDatas {
  title: string;
  description: string;
}

export const FAQEditData: React.FC = () => {
  const [FAQuser, setFAQUser] = useState<FAQEditDatas>({
    title: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch FAQ data
  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8005/api/getfaqbyid/${id}`
        );
        if (response.data.success) {
          const data = response.data.data;

          setFAQUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load FAQ data.");
      }
    };

    if (id) fetchFAQData();
  }, [id]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFAQUser({ ...FAQuser, [name]: value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8005/api/updatefaq/${id}`,
        FAQuser
      );

      if (response.data.success) {
        toast.success("Data updated successfully!");
        navigate("/FAQ");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update FAQ.");
    }
  };

  return (
    <div className="border border-gray-300 no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit FAQ Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className="px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              FAQ Information
            </h5>
            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Title</Label>
              <Input
                type="text"
                value={FAQuser.title}
                onChange={changeHandler}
                name="title"
              />
            </div>

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Description</Label>
              <Input
                type="text"
                value={FAQuser.description}
                onChange={changeHandler}
                name="description"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/FAQ">
            <Button type="button">Close</Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
