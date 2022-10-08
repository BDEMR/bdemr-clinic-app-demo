export const _getDiscountedPrice = (
  discountAmount = 0,
  discountType = 0,
  price = 0,
  qty = 1
) => {
  price = price * qty;
  if (!discountAmount) return price;
  discountAmount = parseFloat(discountAmount);
  if (discountAmount < 0) return price;
  return parseInt(price - discountAmount);
};

export const getTestAdvisedObject = (userSerial, organizationId) => {
  return {
    serial: null,
    lastModifiedDatetimeStamp: 0,
    createdDatetimeStamp: Date.parse(new Date()),
    lastSyncedDatetimeStamp: 0,
    createdByUserSerial: userSerial,
    visitSerial: null,
    patientSerial: null,
    doctorName: "self",
    doctorSpeciality: null,
    organizationId: organizationId,
    clientCollectionName: "visit-advised-test",
    data: {
      testAdvisedName: null,
      testAdvisedList: [],
    },
    availableToPatient: true,
  };
};
export const getNewIncomeObject = (user, organization) => {
  return {
    serial: "",
    createdDatetimeStamp: Date.parse(new Date()),
    createdByUserSerial: user.serial,
    createdByUserName: user.name,
    organizationId: organization.idOnServer,
    modificationHistory: [],
    lastModifiedDatetimeStamp: null,
    invoiceType: "income",
    category: "",
    totalBilled: 0,
    discount: 0,
    vatOrTax: 0,
    totalAmountReceieved: 0,
    flags: {
      flagAsError: false,
      markAsCompleted: false,
    },
    data: [],
    customerDetails: {
      name: "",
      phone: "",
      address: "",
    },
  };
};
