const { Diary } = require("../models/diaryModel");
const { NotFound } = require("http-errors");
const { getProductsListbyId } = require("./productsService");

const getDiaryInfo = async ({ date, owner }) => {
  const data = await Diary.findOne({ date, owner });

  if (!data) {
    throw new NotFound();
  }
  return data;
};

const addDiaryInfo = async ({ date, owner }) => {
  return await Diary.findOne({ date, owner });
};

const updateDiaryInfo = async ({ owner, date, productList = [] }) => {
  let caloriesReceived = 0;
  if (productList?.length) {
    const productFullInfoList = await getProductsListbyId(
      productList.map(({ _id }) => _id)
    );
    if (productFullInfoList?.length) {
      for (let index = 0; index < productFullInfoList.length; index++) {
        const weight =
          productList.find(
            ({ _id }) =>
              _id.toString() === productFullInfoList[index]._id.toString()
          )?.weight ?? 0;

        const caloriesCalc = Math.round(
          (weight / productFullInfoList[index].weight) *
            productFullInfoList[index].calories
        );
        if (caloriesCalc > 0) {
          caloriesReceived += caloriesCalc;
        }
      }
    }
  }

  return await Diary.findOneAndUpdate(
    { date, owner },
    { $set: { productList, caloriesReceived, owner, date } },
    { new: true, upsert: true }
  );
};

module.exports = {
  getDiaryInfo,
  addDiaryInfo,
  updateDiaryInfo,
};
