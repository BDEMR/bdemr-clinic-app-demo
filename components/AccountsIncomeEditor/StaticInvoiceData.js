export const categories = [
  {
    name: "all",
    data: null,
  },
  {
    name: "investigation",
    investigationList: [
      {
        name: "",
        referenceRange: "",
        unitList: [],
        isProtected: true,
      },
    ],
  },
  {
    name: "medicine",
    data: {
      genericName: null,
      medicineType: null,
      manufacturer: null,
    },
  },
  {
    name: "CT SCAN",
    data: null,
  },
  {
    name: "MRI",
    data: null,
  },
  {
    name: "services",
    data: null,
  },
  {
    name: "supply",
    data: null,
  },
  {
    name: "ambulance",
    data: null,
  },
  {
    name: "packages",
    data: null,
  },
  {
    name: "doctor-visit",
    data: null,
  },
  {
    name: "others",
    data: null,
  },
];

export const discountByCategories = [
  { label: "Doctor" },
  { label: "Organization" },
  { label: "Management" },
  { label: "Staff" },
];
export const patientStatusArray = [
  { label: "Indoor Patient", value: "indoor" },
  { label: "Outdoor Patient", value: "outdoor" },
  { label: "Emergency Patient", value: "emergency" },
];
