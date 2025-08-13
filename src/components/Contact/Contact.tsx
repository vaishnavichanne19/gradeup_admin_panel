import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import PageMeta from "../common/PageMeta";
import PageBreadcrumb from "../common/PageBreadCrumb";
import { MoreDotIcon } from "../../icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";


interface ContactUserType {
  _id: string;
  heading: string;
  icon: string
  heading1: string;
  description: string;
}

export const Contact: React.FC = () => {
  const [ContactUser, setContactUser] = useState<ContactUserType[]>([]);
  const [MainHeading, setMainHeading] = useState("");
  const [MainHeading1, setMainHeading1] = useState("");
  const [MainDescription, setMainDescription] = useState("");
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
      const response = await axios.get("http://localhost:8005/api/getcontact");
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setMainHeading1(response.data[0].heading1);
        setMainDescription(response.data[0].description);
        setContactUser(response.data.slice(1));
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:8005/api/deletecontact/${userId}`);

      setContactUser((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );

      toast.error("Data Deleted Successfully!");
      navigate("/Contact");
    } catch (error) {
      console.error("There was an error!", error);
      toast.error("Failed to delete data!");
    }
  };

  return (
    <div>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin"
        description="This is the Contact page"
      />
      <PageBreadcrumb pageTitle="Contact" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 my-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Contact Information
          </h3>
        </div>

        <div className="space-y-6 mt-6">
          <div className="flex flex-col gap-6">
            <div className="w-full border p-4 rounded-lg shadow-md dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Heading
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {MainHeading}
                  </p>
                </div>
                <Link to={`/Contact-edit/${"6870ac42a96e8c942e6b6861"}`}>
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
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Red Font Heading
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {MainHeading1}
                </p>
              </div>

              {/* para */}
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Description
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {MainDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {ContactUser.map((user) => (
            <div
              key={user._id}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
            >
              <div className="flex justify-between">
                <div>
                   <span className="text-gray-500 dark:text-gray-400">
                    <i className={user.icon}></i>
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {user.heading}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user.description}
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
                          navigate(`/Contact-edit/${user._id}`);
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
    </div>
  );
};

interface ContactEditData {
  heading: string;
  heading1: string;
  description: string;
}

export const ContactEdit: React.FC = () => {
  const [Contactuser, setContactUser] = useState<ContactEditData>({
    heading: "",
    heading1: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8005/api/getcontactbyid/${id}`
        );
        if (response.data.success) {
          setContactUser(response.data.data);
        } else {
          toast.error("Failed to load data.");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load Contact data.");
      }
    };

    if (id) fetchContactData();
  }, [id]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8005/api/updatecontact/${id}`,
        Contactuser
      );

      if (response.data.success) {
        toast.info("Data updated successfully!");
        navigate("/Contact");
      } else {
        toast.error(response.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update Contact.");
    }
  };

  return (
    <div className="border border-gray-300 relative w-full max-w-[600px] rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Contact Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className=" px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Contact Information
            </h5>
            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                type="text"
                name="heading"
                value={Contactuser.heading}
                onChange={changeHandler}
              />
            </div>

            {Contactuser.heading1 && (
              <div className="col-span-2 lg:col-span-1 mb-6">
                <Label htmlFor="heading1">Red Font Heading</Label>
                <Input
                  id="heading1"
                  type="text"
                  name="heading1"
                  value={Contactuser.heading1}
                  onChange={changeHandler}
                />
              </div>
            )}

            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                value={Contactuser.description}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/Contact">
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
