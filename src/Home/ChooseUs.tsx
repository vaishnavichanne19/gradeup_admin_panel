import React, { useState, useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { Link, useNavigate, useParams } from "react-router";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { MoreDotIcon } from "../icons";
import { Dropdown } from "../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../components/ui/dropdown/DropdownItem";

interface NoCountUserType {
  _id: string;
  countnumber: string;
  title: string;
}

interface ChooseUsUserType {
  _id: string;
  heading: string;
  heading1: string;
  point: string;
}

export const ChooseUs: React.FC = () => {
  const [NoCountUser, setNoCountUser] = useState<NoCountUserType[]>([]);
  const [ChooseUsUser, setChooseUsUser] = useState<ChooseUsUserType[]>([]);
  const [mainheading, setmainheading] = useState("");
  const [mainheading1, setmainheading1] = useState("");
  const navigate = useNavigate();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8005/api/getcount");
      setNoCountUser(response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8005/api/getchooseus");
      if (response.data.length > 0) {
        setmainheading(response.data[0].heading);
        setmainheading1(response.data[0].heading1);
        setChooseUsUser(response.data.slice(1));
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:8005/api/deletecount/${userId}`);

      setNoCountUser((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );

      toast.error("Data Deleted Successfully!");
      navigate("/ChooseUs");
    } catch (error) {
      console.error("There was an error!", error);
      toast.error("Failed to delete data!");
    }
  };

  return (
    <div>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin"
        description="This is the ChooseUs page"
      />
      <PageBreadcrumb pageTitle="ChooseUs" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 my-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Number Count Information
          </h3>
          <Link to="/number-add">
            <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg">
              Add Data
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {NoCountUser.map((user) => (
            <div
              key={user._id}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {user.countnumber}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user.title}
                  </span>
                </div>

                {/* Dropdown Trigger */}
                <div className="relative inline-block">
                  <button
                    className="dropdown-toggle"
                    onClick={() => toggleDropdown(user._id)}
                  >
                    <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                  </button>

                  {/* Dropdown */}
                  {openDropdownId === user._id && (
                    <Dropdown
                      isOpen={true}
                      onClose={closeDropdown}
                      className="w-40 p-2 absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded shadow-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      <DropdownItem
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        onClick={() => {
                          closeDropdown();
                          navigate(`/number-edit/${user._id}`);
                        }}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => deleteUser(user._id)}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        Delete
                      </DropdownItem>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Choose Us Information
          </h3>
        </div>

        <div className="my-4 ">
          <h4 className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
            Heading
          </h4>
          <h5 className="text-sm font-medium text-gray-800 dark:text-white/90 flex items-center">
            {mainheading}
            <Link to={`/ChooseUs-heading-edit/${"6863b6477cd138b25b4c6400"}`}>
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
            </Link>
          </h5>
        </div>

        <div className="my-4 ">
          <h4 className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
            Red Font Heading
          </h4>
          <h5 className="text-sm font-medium text-gray-800 dark:text-white/90">
            {mainheading1}
          </h5>
        </div>

        <div className="space-y-6 mt-6">
          <div><Link to="/ChooseUs-add">
          Add Data</Link></div>
          <div className="w-full border p-4 rounded-lg shadow-md dark:border-gray-700">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Points
              </p>
              {ChooseUsUser.map((user) => (
                <ul className="list-disc pl-5" key={user._id}>
                  <li className="text-sm font-medium text-gray-800 dark:text-white/90 py-1">
                    <div className="flex">
                      {user.point}
                      <Link to={`/ChooseUs-edit/${user._id}`}>
                        <svg
                          className="fill-current ml-2"
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
                      </Link>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NumberData {
  countnumber: string;
  title: string;
}

export const NumberAdd: React.FC = () => {
  const [NumberData, setNumberData] = useState<NumberData>({
    countnumber: "",
    title: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNumberData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8005/api/createcount", NumberData);

      toast.success("Data added successfully!");
      navigate("/ChooseUs");
    } catch (error) {
      console.error("Error adding Number:", error);
      toast.error("Failed to add Number!");
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
            Number
          </label>
          <input
            type="text"
            id="countnumber"
            name="countnumber"
            onChange={inputHandler}
            value={NumberData.countnumber}
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block text-gray-700 dark:text-white text-sm mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={inputHandler}
            value={NumberData.title}
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

interface NumberEditData {
  countnumber: string;
  title: string;
}

export const NumberEdit: React.FC = () => {
  const [Numberuser, setNumberUser] = useState<NumberEditData>({
    countnumber: "",
    title: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch data on mount
  useEffect(() => {
    const fetchNumberData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8005/api/getcountbyid/${id}`
        );
        if (response.data.success) {
          setNumberUser(response.data.data);
        } else {
          toast.error("Failed to load data.");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load Number data.");
      }
    };

    if (id) fetchNumberData();
  }, [id]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNumberUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8005/api/updatecount/${id}`,
        Numberuser
      );

      if (response.data.success) {
        toast.info("Data updated successfully!");
        navigate("/ChooseUs"); // Corrected route
      } else {
        toast.error(response.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update Number.");
    }
  };

  return (
    <div className="border border-gray-300 relative w-full max-w-[600px] rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Number Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className=" px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Number Information
            </h5>
            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label htmlFor="countnumber">Number</Label>
              <Input
                id="countnumber"
                type="text"
                name="countnumber"
                value={Numberuser.countnumber}
                onChange={changeHandler}
              />
            </div>

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={Numberuser.title}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/ChooseUs">
            <Button type="button" variant="outline">
              Close
            </Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

interface ChooseUsData {
  heading: string;
  heading1: string;
}

export const ChooseUsHeadingEdit: React.FC = () => {
  const [ChooseUsuser, setChooseUsUser] = useState<ChooseUsData>({
    heading: "",
    heading1: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChooseUsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8005/api/getchooseusbyid/${id}`
        );
        if (response.data.success) {
          setChooseUsUser(response.data.data);
        } else {
          toast.error("Failed to load data.");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load ChooseUs data.");
      }
    };

    if (id) fetchChooseUsData();
  }, [id]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChooseUsUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8005/api/updatechooseus/${id}`,
        ChooseUsuser
      );

      if (response.data.success) {
        toast.info("Data updated successfully!");
        navigate("/ChooseUs");
      } else {
        toast.error(response.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update ChooseUs.");
    }
  };

  return (
    <div className="border border-gray-300  relative w-full max-w-[600px] rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit ChooseUs Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className=" px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              ChooseUs Information
            </h5>
            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                type="text"
                name="heading"
                value={ChooseUsuser.heading}
                onChange={changeHandler}
              />
            </div>

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label htmlFor="heading1">Red Font Heading</Label>
              <Input
                id="heading1"
                type="text"
                name="heading1"
                value={ChooseUsuser.heading1}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/ChooseUs">
            <Button type="button" variant="outline">
              Close
            </Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

interface ChooseUsEditData {
  point: string;
}

export const ChooseUsEdit: React.FC = () => {
  const [ChooseUsuser, setChooseUsUser] = useState<ChooseUsEditData>({
    point: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChooseUsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8005/api/getchooseusbyid/${id}`
        );
        if (response.data.success) {
          setChooseUsUser(response.data.data);
        } else {
          toast.error("Failed to load data.");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load ChooseUs data.");
      }
    };

    if (id) fetchChooseUsData();
  }, [id]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChooseUsUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8005/api/updatechooseus/${id}`,
        ChooseUsuser
      );

      if (response.data.success) {
        toast.info("Data updated successfully!");
        navigate("/ChooseUs");
      } else {
        toast.error(response.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update ChooseUs.");
    }
  };

  return (
    <div className="border border-gray-300  relative w-full max-w-[600px] rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit ChooseUs Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className=" px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              ChooseUs Information
            </h5>
            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label htmlFor="point">Point</Label>
              <Input
                id="point"
                type="text"
                name="point"
                value={ChooseUsuser.point}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/ChooseUs">
            <Button type="button" variant="outline">
              Close
            </Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
