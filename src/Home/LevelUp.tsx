import React, { useState, useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { Link, useNavigate, useParams } from "react-router";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";
import axios from "axios";
import { toast } from "react-toastify";

interface LevelUpUserType {
  _id: string;
  heading: string;
  heading1: string;
  levelupimage1: string;
  levelupimage2: string;
  logo: string;
}

export const LevelUp: React.FC = () => {
  const [LevelUpUser, setLevelUpUser] = useState<LevelUpUserType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://api.gradeup01.in/api/getlevelup");
      setLevelUpUser(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin"
        description="This is the Level Up page"
      />
      <PageBreadcrumb pageTitle="Level Up" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Level Up Information
          </h3>
          {/* <Link to="/LevelUp-add">
            <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg">
              Add Data
            </button>
          </Link> */}
        </div>

        <div className="space-y-6 mt-6">
          <div className="flex flex-col gap-6">
            {LevelUpUser.map((user) => (
              <div
                key={user._id}
                className="w-full border p-4 rounded-lg shadow-md dark:border-gray-700"
              >
                {/* Heading and Edit Button Row */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Red Font Heading
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.heading1}
                    </p>
                  </div>

                  <Link to={`/LevelUp-edit/${user._id}`}>
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
                    {user.heading}
                  </p>
                </div>

                <div className="w-full md:w-1/2 px-2">
                  <p className="mb-4 mt-4  text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Logo
                  </p>
                  <img
                    className="w-50 h-auto rounded-md object-cover"
                    src={`https://api.gradeup01.in/images/${user.logo}`}
                    alt="Logo"
                  />
                </div>

                {/* LevelUp Image */}
                <div className="my-4">
                  <p className="mb-4  text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Level Up Image
                  </p>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2">
                      <img
                        className="w-full h-100 rounded-md object-cover"
                        src={`https://api.gradeup01.in/images/${user.levelupimage1}`}
                        alt="LevelUp Img1"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <img
                        className="w-full h-100 rounded-md object-cover"
                        src={`https://api.gradeup01.in/images/${user.levelupimage2}`}
                        alt="LevelUp Img2"
                      />
                    </div>
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

interface LevelUpData {
  heading: string;
  heading1: string;
  levelupimage1: File | null;
  levelupimage2: File | null;
  logo: File | null;
}

export const LevelUpAdd: React.FC = () => {
  const [LevelUpData, setLevelUpData] = useState<LevelUpData>({
    heading: "",
    heading1: "",
    levelupimage1: null,
    levelupimage2: null,
    logo: null,
  });

  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewImage1, setPreviewImage1] = useState<string>("");
  const [previewImage2, setPreviewImage2] = useState<string>("");
  const navigate = useNavigate();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLevelUpData((prev) => ({ ...prev, [name]: value }));
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

        if (fieldName === "levelupimage1") {
          setLevelUpData((prev) => ({ ...prev, levelupimage1: file }));
          setPreviewImage(objectUrl);
        } else if (fieldName === "levelupimage2") {
          setLevelUpData((prev) => ({ ...prev, levelupimage2: file }));
          setPreviewImage1(objectUrl);
        } else if (fieldName === "logo") {
          setLevelUpData((prev) => ({ ...prev, logo: file }));
          setPreviewImage2(objectUrl);
        }
      };
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !LevelUpData.levelupimage1 ||
      !LevelUpData.levelupimage2 ||
      !LevelUpData.logo
    ) {
      toast.error("All fields, including an image, are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("heading", LevelUpData.heading);
      formData.append("heading1", LevelUpData.heading1);
      formData.append("levelupimage1", LevelUpData.levelupimage1);
      formData.append("levelupimage2", LevelUpData.levelupimage2);
      formData.append("logo", LevelUpData.logo);

      await axios.post("https://api.gradeup01.in/api/createlevelup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Data added successfully!");
      navigate("/LevelUp");
    } catch (error) {
      console.error("Error adding LevelUp:", error);
      toast.error("Failed to add LevelUp!");
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
            value={LevelUpData.heading}
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block text-gray-700 dark:text-white text-sm mb-2">
            Heading 1
          </label>
          <input
            type="text"
            id="heading1"
            name="heading1"
            onChange={inputHandler}
            value={LevelUpData.heading1}
            className="w-full p-2 mb-4 border rounded"
          />

          <label
            className="block text-gray-700 dark:text-white text-sm my-8 mb-2"
            htmlFor="logo"
          >
            Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={imageHandler}
            className="w-full p-2 mb-6 border rounded"
          />

          {previewImage2 && (
            <img
              src={previewImage2}
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

          <label
            className="block text-gray-700 dark:text-white text-sm my-8 mb-2"
            htmlFor="levelupimage1"
          >
            LevelUp Image1
          </label>
          <input
            type="file"
            id="levelupimage1"
            name="levelupimage1"
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

          <label
            className="block text-gray-700 dark:text-white text-sm mb-2"
            htmlFor="levelupimage2"
          >
            LevelUp Image2
          </label>
          <input
            type="file"
            id="levelupimage2"
            name="levelupimage2"
            accept="image/*"
            onChange={imageHandler}
            className="w-full p-2 mb-4 border rounded"
          />

          {previewImage1 && (
            <img
              src={previewImage1}
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

interface LevelUpEditData {
  heading: string;
  heading1: string;
  levelupimage1: string;
  levelupimage2: string;
  logo: string;
}

export const LevelUpEdit: React.FC = () => {
  const [LevelUpuser, setLevelUpUser] = useState<LevelUpEditData>({
    heading: "",
    heading1: "",
    levelupimage1: "",
    levelupimage2: "",
    logo: "",
  });

  const [previewImage1, setPreviewImage1] = useState<string>("");
  const [previewImage2, setPreviewImage2] = useState<string>("");
  const [previewImage3, setPreviewImage3] = useState<string>("");

  const [selectedImage1, setSelectedImage1] = useState<File | null>(null);
  const [selectedImage2, setSelectedImage2] = useState<File | null>(null);
  const [selectedImage3, setSelectedImage3] = useState<File | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch LevelUp data

  useEffect(() => {
    const fetchLevelUpData = async () => {
      try {
        const response = await axios.get(
          `https://api.gradeup01.in/api/getlevelupid/${id}`
        );
        if (response.data.success) {
          const data = response.data.data;
          setLevelUpUser(data);
          setPreviewImage1(
            `https://api.gradeup01.in/images/${data.levelupimage1}`
          );
          setPreviewImage2(
            `https://api.gradeup01.in/images/${data.levelupimage2}`
          );
          setPreviewImage3(`https://api.gradeup01.in/images/${data.logo}`);
        } else {
          toast.error("Failed to load data.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch LevelUp data.");
      }
    };

    if (id) fetchLevelUpData();
  }, [id]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLevelUpUser({ ...LevelUpuser, [name]: value });
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
      if (width > 1000 || height > 500) {
        toast.error("Image dimensions should not exceed 1000x500.");
        URL.revokeObjectURL(objectUrl);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageNumber === 1) {
          setSelectedImage1(file);
          setPreviewImage1(reader.result as string);
        } else if (imageNumber === 2) {
          setSelectedImage2(file);
          setPreviewImage2(reader.result as string);
        } else {
          setSelectedImage3(file);
          setPreviewImage3(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", LevelUpuser.heading);
    formData.append("heading1", LevelUpuser.heading1);
    if (selectedImage1) formData.append("levelupimage1", selectedImage1);
    if (selectedImage2) formData.append("levelupimage2", selectedImage2);
    if (selectedImage3) formData.append("logo", selectedImage3);

    try {
      const response = await axios.put(
        `https://api.gradeup01.in/api/updatelevelup/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.info("Data updated successfully!");
        navigate("/LevelUp");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update LevelUp.");
    }
  };

  return (
    <div className="border border-gray-300 no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit LevelUp Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Level Up Information
            </h5>
            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Red Font Heading</Label>
              <Input
                type="text"
                value={LevelUpuser.heading1}
                onChange={changeHandler}
                name="heading1"
              />
            </div>

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Heading</Label>
              <Input
                type="text"
                value={LevelUpuser.heading}
                onChange={changeHandler}
                name="heading"
              />
            </div>

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>Logo</Label>
              <Input
                type="file"
                onChange={(e) => handleImageChange(e, 3)}
                accept="image/*"
                className="mb-4"
              />
              {previewImage3 && (
                <img
                  src={previewImage3}
                  alt="Preview3"
                  style={{ width: "100%", height: "400px" }}
                />
              )}
            </div>

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label>LevelUp Image 1</Label>
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

            <div className="col-span-2 lg:col-span-1">
              <Label>LevelUp Image 2</Label>
              <Input
                type="file"
                onChange={(e) => handleImageChange(e, 2)}
                accept="image/*"
                className="mb-4"
              />
              {previewImage2 && (
                <img
                  src={previewImage2}
                  alt="Preview2"
                  style={{ width: "100%", height: "400px" }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/LevelUp">
            <Button type="button">Close</Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
