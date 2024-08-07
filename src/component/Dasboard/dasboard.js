import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Nav from "./nav";
import { Button } from "@material-tailwind/react";

function Dashboard({ setAuth }) {
  const [datacard, setDatacard] = useState([]);
  const [userData, setUserData] = useState({});
  const [newCard, setNewCard] = useState({
    title: "",
    description: "",
    rating: 0,
    urlapi: "",
  });

  useEffect(() => {
    axios
      .get("https://rest-dummy-api.vercel.app/user", {
        headers: { jwt_token: localStorage.token },
      })
      .then((res) => {
        setUserData(res.data);
        setNewCard((prevCard) => ({ ...prevCard, UserId: res.data.id }));
      })
      .catch((err) => console.log(err));
  }, []);

  const getProfile = async () => {
    try {
      const res = await axios.get("https://rest-dummy-api.vercel.app/card", {
        headers: { jwt_token: localStorage.token },
      });
      setDatacard(res.data.payload);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(
        `https://rest-dummy-api.vercel.app/card/delete/${id}`,
        {
          headers: { jwt_token: localStorage.token },
        }
      );
      setDatacard(datacard.filter((card) => card.id !== id));
      toast.success("Card deleted successfully!");
    } catch (err) {
      toast.success("Card deleted successfully!");
      return null;
    }
  };

  const addCard = async () => {
    console.log(newCard);
    try {
      await axios.post(
        "https://rest-dummy-api.vercel.app/card/create",
        newCard,
        {
          headers: {
            "Content-Type": "application/json",
            jwt_token: localStorage.token,
          },
        }
      );
      toast.success("Card added successfully!");
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to add the card.");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Nav logout={logout} />
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 underline">
            Add your API {userData.name ? `(${userData.name})` : ""}
          </h2>
          <div className="space-y-4 max-w-md">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                addCard();
              }}
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newCard.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newCard.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              <input
                type="text"
                name="urlapi"
                placeholder="API URL"
                value={newCard.urlapi}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="submit"
                variant="gradient"
                size="sm"
                className="w-full"
              >
                Create New
              </Button>
            </form>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {datacard.map((card) => (
                <tr key={card.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {card.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {card.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {card.rate}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-500">
                    <a
                      href={card.url_api}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all"
                    >
                      url
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => deleteCard(card.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
