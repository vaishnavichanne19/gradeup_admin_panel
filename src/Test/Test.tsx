import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import TextArea from "../components/form/input/TextArea";
import Button from "../components/ui/button/Button";

interface TestUserType {
  _id: string;
  heading: string;
  heading1: string;
  description: string;
  testimage: string;
}

export const Test: React.FC = () => {
  const [TestUser, setTestUser] = useState<TestUserType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8005/api/gettest");
        setTestUser(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin"
        description="This is the Test page"
      />
      <PageBreadcrumb pageTitle="Test" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Test Information
          </h3>
          {/* <Link to="/Test-add">
            <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg">
              Add Data
            </button>
          </Link> */}
        </div>

        <div className="space-y-6 mt-6">
          <div className="flex flex-col gap-6">
            {TestUser.map((user) => ( 
            <div className="w-full border p-4 rounded-lg shadow-md dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="my-4">
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Heading
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user.heading}
                  </p>
                </div>
                <Link to={`/Test-edit/${user._id}`}>
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

              {user.heading1 && (
                <div className="mb-4">
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Red Font Heading
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user.heading1}
                  </p>
                </div>
              )}

              {user.description && (
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Description
                  </p>
                  <p
                    className="text-sm w-100 font-medium text-gray-800 dark:text-white/90"
                    dangerouslySetInnerHTML={{ __html: user.description }}
                  ></p>
                </div>
              )}

              {user.testimage && (
                <div className="my-4">
                  <p className="mb-4  text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Image
                  </p>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 my-6">
                      <img
                        className="w-full h-100 rounded-md object-cover"
                        src={`http://localhost:8005/images/${user.testimage}`}
                        alt="Test Img1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TestData {
  description: string;
  heading: string;
  heading1: string;
  testimage: File | null;
}

export const TestAdd: React.FC = () => {
  const [TestData, setTestData] = useState<TestData>({
    heading: "",
    heading1: "",
    description: "",
    testimage: null,
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
          setTestData((prev) => ({
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
    setTestData((prev) => ({ ...prev, [name]: value }));
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

        if (fieldName === "testimage") {
          setTestData((prev) => ({ ...prev, testimage: file }));
          setPreviewImage(objectUrl);
        }
      };
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editorData = (window as any).CKEDITOR.instances.editor.getData();
    // if (!TestData.testimage) {
    //   toast.error("All fields, including an image, are required!");
    //   return;
    // }

    try {
      const formData = new FormData();
      formData.append("heading", TestData.heading);
      formData.append("heading1", TestData.heading1);
      formData.append("description", editorData);
        // formData.append("testimage", TestData.testimage);

      await axios.post("http://localhost:8005/api/createtest", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Data added successfully!");
      navigate("/Test");
    } catch (error) {
      console.error("Error adding Test:", error);
      toast.error("Failed to add Test!");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add Test Data
        </h2>
        <form onSubmit={submitForm}>
          <label
            className="block text-gray-700 dark:text-white text-sm my-2 mb-2"
            htmlFor="testimage"
          >
            Image
          </label>
          <input
            type="file"
            id="testimage"
            name="testimage"
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

          <label className="block text-gray-700 dark:text-white text-sm mt-4">
            Heading 1
          </label>
          <input
            type="text"
            id="heading1"
            name="heading1"
            onChange={inputHandler}
            value={TestData.heading1}
            className="w-full p-2 mb-4 border rounded mt-4"
          />

          <label className="block text-gray-700 dark:text-white text-sm mt-4">
            Heading
          </label>
          <input
            type="text"
            id="heading"
            name="heading"
            onChange={inputHandler}
            value={TestData.heading}
            className="w-full p-2 mb-4 border rounded mt-4"
          />

          <label className="block text-gray-700 dark:text-white text-sm mb-2">
            Description
          </label>
          <textarea id="editor"></textarea>

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

interface TestEditData {
  description: string;
  heading: string;
  heading1: string;
  testimage: string;
}

export const TestEdit: React.FC = () => {
  const [Testuser, setTestUser] = useState<TestEditData>({
    heading: "",
    heading1: "",
    description: "",
    testimage: "",
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

  // Fetch Test data
  const fetchTestData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8005/api/gettestbyid/${id}`
      );
      console.log("API response:", response.data);
      if (response.data.success) {
        const data = response.data.data;

        setTestUser(data);
        setPreviewImage1(`http://localhost:8005/images/${data.testimage}`);

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
      toast.error("Failed to load Test data.");
    }
  };

  // On editor load, fetch data
  useEffect(() => {
    if (editorLoaded) fetchTestData();
  }, [editorLoaded, id]);

  // Initialize editor
  useEffect(() => {
    if (editorLoaded && !(window as any).CKEDITOR.instances.editor) {
      (window as any).CKEDITOR.replace("editor");
    }
  }, [editorLoaded]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTestUser({ ...Testuser, [name]: value });
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
        const result = reader.result as string;

        if (imageNumber === 1) {
          setSelectedImage1(file);
          setPreviewImage1(result);
        }
      };

      reader.readAsDataURL(file);
    };
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", Testuser.heading);
    formData.append("heading1", Testuser.heading1);
    formData.append(
      "description",
      (window as any).CKEDITOR.instances.editor.getData()
    );
    if (selectedImage1) formData.append("testimage", selectedImage1);

    try {
      const response = await axios.put(
        `http://localhost:8005/api/updatetest/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.info("Data updated successfully!");
        navigate("/Test");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update Test.");
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
        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Test Information
            </h5>

            {Testuser.heading && (
              <div className="col-span-2 lg:col-span-1 my-6">
                <Label>Heading</Label>
                <Input
                  type="text"
                  value={Testuser.heading}
                  onChange={changeHandler}
                  name="heading"
                />
              </div>
            )}

            {Testuser.heading1 && (
              <div className="col-span-2 lg:col-span-1 my-6">
                <Label>Red Font Heading</Label>
                <Input
                  type="text"
                  value={Testuser.heading1}
                  onChange={changeHandler}
                  name="heading1"
                />
              </div>
            )}

            <div className="col-span-2 lg:col-span-1">
              <Label>Description</Label>
              <TextArea id="editor" />
            </div>

            {Testuser.testimage && (
              <div className="col-span-2 lg:col-span-1 mt-6">
                <Label> Image </Label>
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
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/Test">
            <Button type="button">Close</Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
