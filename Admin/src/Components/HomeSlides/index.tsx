import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Button,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import {
  MdAdd,
  MdClose,
  MdDelete,
  MdEdit,
} from "react-icons/md";

interface Slider {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  image: string;
  status: boolean;
}

interface FormData {
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  image: File | null;
  status: boolean;
}

const HomeSlider: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [sliders, setSliders] = useState<Slider[]>([
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "Discover our latest collection",
      buttonText: "Shop Now",
      link: "/products",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      status: true,
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Explore our new products",
      buttonText: "Explore",
      link: "/new-arrivals",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050",
      status: true,
    },
  ]);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    buttonText: "",
    link: "",
    image: null,
    status: true,
  });

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image
  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // Submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle) {
      alert("Please fill the required fields.");
      return;
    }

    if (editId !== null) {
      setSliders((prev) =>
        prev.map((slider) =>
          slider.id === editId
            ? {
                ...slider,
                title: formData.title,
                subtitle: formData.subtitle,
                buttonText: formData.buttonText,
                link: formData.link,
                status: formData.status,
                image: formData.image
                  ? URL.createObjectURL(formData.image)
                  : slider.image,
              }
            : slider
        )
      );
    } else {
      const newSlider: Slider = {
        id: Date.now(),
        title: formData.title,
        subtitle: formData.subtitle,
        buttonText: formData.buttonText,
        link: formData.link,
        status: formData.status,
        image: formData.image
          ? URL.createObjectURL(formData.image)
          : "",
      };

      setSliders((prev) => [...prev, newSlider]);
    }

    resetForm();
  };

  // Edit slider
  const handleEdit = (slider: Slider) => {
    setEditId(slider.id);

    setFormData({
      title: slider.title,
      subtitle: slider.subtitle,
      buttonText: slider.buttonText,
      link: slider.link,
      image: null,
      status: slider.status,
    });

    setShowForm(true);
  };

  // Delete slider
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this slider?"
    );

    if (!confirmDelete) return;

    setSliders((prev) =>
      prev.filter((slider) => slider.id !== id)
    );
  };

  // Change status
  const handleStatus = (id: number) => {
    setSliders((prev) =>
      prev.map((slider) =>
        slider.id === id
          ? {
              ...slider,
              status: !slider.status,
            }
          : slider
      )
    );
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      buttonText: "",
      link: "",
      image: null,
      status: true,
    });

    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="p-6">

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Home Slider
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your homepage sliders
          </p>
        </div>

        {!showForm && (
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            onClick={() => setShowForm(true)}
          >
            Add Slider
          </Button>
        )}

      </div>

      {/* ================= FORM ================= */}

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">

          {/* Form Header */}

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {editId !== null
                  ? "Edit Slider"
                  : "Add New Slider"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {editId !== null
                  ? "Update slider information"
                  : "Create a new homepage slider"}
              </p>
            </div>

            <IconButton onClick={resetForm}>
              <MdClose />
            </IconButton>

          </div>

          {/* Form */}

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Title */}

              <TextField
                label="Slider Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
              />

              {/* Subtitle */}

              <TextField
                label="Subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                fullWidth
                required
              />

              {/* Button */}

              <TextField
                label="Button Text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                fullWidth
              />

              {/* Link */}

              <TextField
                label="Button Link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                fullWidth
              />

            </div>

            {/* Image */}

            <div className="mt-6">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slider Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full border border-gray-300 rounded-lg p-3"
              />

              {/* Image Preview */}

              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Slider Preview"
                  className="mt-4 w-64 h-32 object-cover rounded-lg border"
                />
              )}

            </div>

            {/* Status */}

            <div className="flex items-center mt-5">

              <span className="text-sm font-medium text-gray-700">
                Active
              </span>

              <Switch
                checked={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.checked,
                  }))
                }
              />

            </div>

            {/* Buttons */}

            <div className="flex gap-3 mt-6">

              <Button
                type="submit"
                variant="contained"
              >
                {editId !== null
                  ? "Update Slider"
                  : "Save Slider"}
              </Button>

              <Button
                type="button"
                variant="outlined"
                onClick={resetForm}
              >
                Cancel
              </Button>

            </div>

          </form>

        </div>
      )}

      {/* ================= SLIDER TABLE ================= */}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        {/* Table Header */}

        <div className="p-5 border-b border-gray-200">

          <h2 className="text-lg font-semibold text-gray-800">
            All Sliders
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage your homepage slider content
          </p>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Subtitle
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {sliders.length > 0 ? (

                sliders.map((slider) => (

                  <tr
                    key={slider.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >

                    {/* Image */}

                    <td className="px-5 py-4">

                      <img
                        src={slider.image}
                        alt={slider.title}
                        className="w-28 h-16 object-cover rounded-lg"
                      />

                    </td>

                    {/* Title */}

                    <td className="px-5 py-4">

                      <p className="font-semibold text-gray-800">
                        {slider.title}
                      </p>

                    </td>

                    {/* Subtitle */}

                    <td className="px-5 py-4">

                      <p className="text-sm text-gray-500">
                        {slider.subtitle}
                      </p>

                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">

                      <div className="flex items-center">

                        <Switch
                          size="small"
                          checked={slider.status}
                          onChange={() =>
                            handleStatus(slider.id)
                          }
                        />

                        <span
                          className={`text-sm font-medium ${
                            slider.status
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {slider.status
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </div>

                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">

                      <div className="flex justify-center gap-1">

                        <IconButton
                          onClick={() =>
                            handleEdit(slider)
                          }
                          sx={{
                            color: "#2563eb",
                          }}
                        >
                          <MdEdit />
                        </IconButton>

                        <IconButton
                          onClick={() =>
                            handleDelete(slider.id)
                          }
                          sx={{
                            color: "#dc2626",
                          }}
                        >
                          <MdDelete />
                        </IconButton>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-500"
                  >
                    No sliders found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default HomeSlider;