import React, { useState, useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { Link, useNavigate, useParams } from "react-router";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";
import axios from "axios";
import { toast } from "react-toastify";

interface FooterUserType {
  _id: string;
  description: string;
}

export const Footer: React.FC = () => {
  const [FooterUser, setFooterUser] = useState<FooterUserType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8005/api/getFooter");
      setFooterUser(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin"
        description="This is the Footer page"
      />
      <PageBreadcrumb pageTitle="Footer" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Footer Information
          </h3>
        </div>

        {FooterUser.map((user) => {
          return (
            <div className="my-4 ">
              <h4 className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Footer Description
              </h4>
              <h5 className="text-sm font-medium text-gray-800 dark:text-white/90 flex items-center">
                {user.description}
                <Link to={`/Footer-edit/${user._id}`}>
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
          );
        })}
      </div>
    </div>
  );
};

interface FooterEditData {
  description: string;
}

export const FooterEdit: React.FC = () => {
  const [Footeruser, setFooterUser] = useState<FooterEditData>({
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8005/api/getFooterbyid/${id}`
        );
        if (response.data.success) {
          setFooterUser(response.data.data);
        } else {
          toast.error("Failed to load data.");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load Footer data.");
      }
    };

    if (id) fetchFooterData();
  }, [id]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFooterUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8005/api/updateFooter/${id}`,
        Footeruser
      );

      if (response.data.success) {
        toast.info("Data updated successfully!");
        navigate("/Footer");
      } else {
        toast.error(response.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update Footer.");
    }
  };

  return (
    <div className="border border-gray-300  relative w-full max-w-[600px] rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Footer Information
        </h4>
      </div>
      <form className="flex flex-col" onSubmit={submitForm}>
        <div className=" px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Footer Information
            </h5>
            <div className="col-span-2 lg:col-span-1 mb-6">
              <Label htmlFor="description">Footer Description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                value={Footeruser.description}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Link to="/Footer">
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
