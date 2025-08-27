import React, { useState, useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { Link, useNavigate, useParams } from "react-router";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import TextArea from "../components/form/input/TextArea";
import Button from "../components/ui/button/Button";
import axios from "axios";
import { toast } from "react-toastify";

interface QuestionPaperUserType {
  _id: string;
  heading: string;
  description: string;
  qustionpaperimage: string;
}

export const QuestionPaper: React.FC = () => {
  const [QuestionPaperUser, setQuestionPaperUser] = useState<
    QuestionPaperUserType[]
  >([]);
  const [mainHeading, setMainHeading] = useState(" ");
  const [mainHeading1, setMainHeading1] = useState(" ");
  const [mainDescription, setMainDescription] = useState(" ");
  const [Image, setImage] = useState(" ");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.gradeup01.in/api/getquestionpaper"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setMainHeading1(response.data[0].heading1);
        setMainDescription(response.data[0].description);
        setImage(response.data[0].qustionpaperimage);
        setQuestionPaperUser(response.data.slice(1));
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin"
        description="This is the One Question Paper page"
      />
      <PageBreadcrumb pageTitle="One Question Paper" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            One Question Paper Information
          </h3>
          {/* <Link to="/QuestionPaper-add">
            <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg">
              Add Data
            </button>
          </Link> */}
        </div>

        <div className="space-y-6 mt-6">
          <div className="flex flex-col gap-6">
            <div className="w-full border p-4 rounded-lg shadow-md dark:border-gray-700">
              {/* Heading and Edit Button Row */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-2  text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Red Font Heading
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {mainHeading1}
                  </p>
                </div>
                <Link to={`/QuestionPaper-edit/${"68679fadf62028de641cefe9"}`}>
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
                <p className="mb-2 mt-4 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Heading
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {mainHeading}
                </p>
              </div>

              {/* Description */}
              <div className="my-4">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Description
                </p>
                <p
                  className="text-sm font-medium text-gray-800 dark:text-white/90"
                  dangerouslySetInnerHTML={{ __html: mainDescription }}
                ></p>
              </div>

              {/* QuestionPaper Image */}
              <div className="my-4">
                <p className="mb-4  text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Image
                </p>
                <div className="w-full md:w-1/2 px-2">
                  <img
                    className="w-full h-auto rounded-md object-cover"
                    src={`https://api.gradeup01.in/images/${Image}`}
                    alt="QuestionPaper Img1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              GradeUp Monitor Information
            </h3>
          </div>
          <div className="flex flex-col gap-6">
            {QuestionPaperUser.map((user) => (
              <div
                key={user._id}
                className="w-full border p-4 rounded-lg shadow-md dark:border-gray-700"
              >
                {/* Heading and Edit Button Row */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Heading
                    </p>
                    <p
                      className="text-sm w-50 font-medium text-gray-800 dark:text-white/90"
                      dangerouslySetInnerHTML={{ __html: user.description }}
                    ></p>
                  </div>

                  <Link to={`/QuestionPaper-edit/${user._id}`}>
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

                <div className="my-4">
                  <p className="mb-4  text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Image
                  </p>
                  <div className="w-full md:w-1/2 px-2">
                    <img
                      className="w-full h-auto rounded-md object-cover"
                      src={`https://api.gradeup01.in/images/${user.qustionpaperimage}`}
                      alt="QuestionPaper Img1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuestionPaperAddData {
  heading: string;
  description: string;
  qustionpaperimage: File | null;
}

export const QuestionPaperAdd: React.FC = () => {
  const [QuestionPaperData, setQuestionPaperData] =
    useState<QuestionPaperAddData>({
      heading: "",
      description: "",
      qustionpaperimage: null,
    });

  const [previewImage, setPreviewImage] = useState<string>("");
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (
      editorLoaded &&
      document.getElementById("editor") &&
      !(window as any).CKEDITOR.instances.editor
    ) {
      try {
        (window as any).CKEDITOR.replace("editor", { height: 200 });

        (window as any).CKEDITOR.instances.editor.on("change", function () {
          setQuestionPaperData((prev) => ({
            ...prev,
            description: (window as any).CKEDITOR.instances.editor.getData(),
          }));
        });
      } catch (error) {
        console.error("CKEditor initialization error:", error);
      }
    }
  }, [editorLoaded]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuestionPaperData((prev) => ({ ...prev, [name]: value }));
  };

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const fieldName = e.target.name;

    if (file) {
      const allowedTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp",
      ];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, JPEG, PNG, and WEBP files are allowed.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("Image size should be under 2MB.");
        return;
      }

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      img.onload = () => {
        if (img.width > 1350 || img.height > 700) {
          toast.error("Image dimensions should not exceed 1350x700.");
          URL.revokeObjectURL(objectUrl);
          return;
        }

        if (fieldName === "qustionpaperimage") {
          setQuestionPaperData((prev) => ({
            ...prev,
            qustionpaperimage: file,
          }));
          setPreviewImage(objectUrl);
        }
      };
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editorData = (window as any).CKEDITOR.instances.editor.getData();
    if (!QuestionPaperData.qustionpaperimage) {
      toast.error("All fields, including an image, are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("heading", QuestionPaperData.heading);
      formData.append("description", editorData);
      formData.append("qustionpaperimage", QuestionPaperData.qustionpaperimage);

      await axios.post(
        "https://api.gradeup01.in/api/createquestionpaper",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Data added successfully!");
      navigate("/QuestionPaper");
    } catch (error) {
      console.error("Error adding QuestionPaper:", error);
      toast.error("Failed to add QuestionPaper!");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add Event
        </h2>
        <form onSubmit={submitForm}>
          <label className="block text-gray-700 dark:text-white text-sm mb-2">
            Heading
          </label>
          <input
            type="text"
            id="heading"
            name="heading"
            onChange={inputHandler}
            value={QuestionPaperData.heading}
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block text-gray-700 dark:text-white text-sm mb-2">
            Description
          </label>
          <textarea id="editor"></textarea>

          <label
            className="block text-gray-700 dark:text-white text-sm my-8 mb-2"
            htmlFor="qustionpaperimage"
          >
            Image
          </label>
          <input
            type="file"
            id="qustionpaperimage"
            name="qustionpaperimage"
            accept="image/*"
            onChange={imageHandler}
            className="w-full p-2 mb-6 border rounded"
          />

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{
                width: "70%",
                height: "350px",
                borderRadius: "8px",
                display: "block",
                margin: "10px auto",
              }}
            />
          )}

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

interface QuestionPaperEditData {
  heading: string;
  heading1: string;
  description: string;
  qustionpaperimage: string;
}

export const QuestionPaperEdit: React.FC = () => {
  const [QuestionPaperuser, setQuestionPaperUser] =
    useState<QuestionPaperEditData>({
      heading: "",
      heading1: "",
      description: "",
      qustionpaperimage: "",
    });

  const [previewImage1, setPreviewImage1] = useState<string>("");
  const [selectedImage1, setSelectedImage1] = useState<File | null>(null);

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

  // Fetch QuestionPaper data
  const fetchQuestionPaperData = async () => {
    try {
      const response = await axios.get(
        `https://api.gradeup01.in/api/getquestionpaperid/${id}`
      );
      console.log("API response:", response.data);
      if (response.data.success) {
        const data = response.data.data;

        setQuestionPaperUser(data);
        setPreviewImage1(
          `https://api.gradeup01.in/images/${data.qustionpaperimage}`
        );

        // Wait for CKEditor to be ready
        const interval = setInterval(() => {
          if ((window as any).CKEDITOR?.instances?.editor) {
            (window as any).CKEDITOR.instances.editor.setData(data.description);
            clearInterval(interval);
          }
        }, 100);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load QuestionPaper data.");
    }
  };

  // On editor load, fetch data
  useEffect(() => {
    if (editorLoaded) fetchQuestionPaperData();
  }, [editorLoaded, id]);

  // Initialize editor
  useEffect(() => {
    if (editorLoaded && !(window as any).CKEDITOR.instances.editor) {
      (window as any).CKEDITOR.replace("editor");
    }
  }, [editorLoaded]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuestionPaperUser({ ...QuestionPaperuser, [name]: value });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageNumber: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG, and WEBP files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("Image size should be under 2MB.");
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      const { width, height } = img;
      if (width > 1350 || height > 700) {
        toast.error("Image dimensions should not exceed 1350x700.");
        URL.revokeObjectURL(objectUrl);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageNumber === 1) {
          setSelectedImage1(file);
          setPreviewImage1(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", QuestionPaperuser.heading);
    formData.append("heading1", QuestionPaperuser.heading1);
    formData.append(
      "description",
      (window as any).CKEDITOR.instances.editor.getData()
    );
    if (selectedImage1) formData.append("qustionpaperimage", selectedImage1);

    try {
      const response = await axios.put(
        `https://api.gradeup01.in/api/updatequestionpaper/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.info("Data updated successfully!");
        navigate("/QuestionPaper");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update QuestionPaper.");
    }
  };

  return (
    <div className="border border-gray-300 no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit QuestionPaper Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Question Paper Information
            </h5>

            {QuestionPaperuser.heading1 && (
              <div className="col-span-2 lg:col-span-1 mb-6">
                <Label>Red Font Heading</Label>
                <Input
                  type="text"
                  value={QuestionPaperuser.heading1}
                  onChange={changeHandler}
                  name="heading1"
                />
              </div>
            )}

            {QuestionPaperuser.heading && (
              <div className="col-span-2 lg:col-span-1 mb-6">
                <Label>Heading</Label>
                <Input
                  type="text"
                  value={QuestionPaperuser.heading}
                  onChange={changeHandler}
                  name="heading"
                />
              </div>
            )}

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Description</Label>
              <TextArea id="editor" />
            </div>

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Image </Label>
              <Input
                type="file"
                onChange={(e) => handleImageChange(e, 1)}
                accept="image/*"
                className="mb-4"
              />
              {previewImage1 && (
                <img
                  src={previewImage1}
                  alt="Preview1"
                  style={{ width: "100%", height: "400px" }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/QuestionPaper">
            <Button type="button">Close</Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
