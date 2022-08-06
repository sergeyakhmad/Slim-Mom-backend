const { NotFound } = require("http-errors");
const { Diary } = require("../models/diaryModel");
const { getDiaryInfo } = require("../services/diaryService");
const { updateDiaryInfo } = require("../services/diaryService");
const { searchProducts } = require("../services/productsService");

const getDiaryInfoController = async (req, res) => {
  const date = req.params.date;
  const owner = req.user._id;
  const result = await getDiaryInfo({ date, owner });

  res.status(200).json(result);
};

const addProductController = async (req, res) => {
  const owner = req.user._id;
  const { date, title } = req.body;
  const _id = req.body.productId;
  const weight = Number(req.body.weight) ?? 100;
  let productList = [];

  const product = await searchProducts(title);
  if (!product.length) {
    throw new NotFound();
  }
  const calories = Math.round((weight * product[0].calories) / 100);
  const diaryInfo = await Diary.findOne({ date, owner });

  if (!diaryInfo) {
    const result = await updateDiaryInfo({
      owner,
      date,
      productList: [{ _id, weight, title, calories }],
    });
    res.status(201).json(result);
  } else {
    productList = diaryInfo?.productList ?? [];
    const indexProduct = productList.findIndex(
      (el) => el._id.toString() === _id.toString()
    );
    if (indexProduct === -1) {
      productList = [...productList, { _id, weight, title, calories }];
    } else {
      productList[indexProduct].weight =
        productList[indexProduct].weight + weight ?? weight;
      productList[indexProduct].calories =
        productList[indexProduct].calories + calories;
    }

    const result = await updateDiaryInfo({ owner, date, productList });
    if (!result) {
      throw new NotFound();
    }
    res.status(201).json(result);
  }
};

const deleteProductController = async (req, res) => {
  const owner = req.user._id;
  const { date, _id } = req.body;

  const diaryInfo = await getDiaryInfo({ date, owner });

  const productList = diaryInfo.productList.filter(
    (el) => el._id.toString() !== _id.toString()
  );

  const result = await updateDiaryInfo({ owner, date, productList });
  res.status(200).json(result);
};

module.exports = {
  getDiaryInfoController,
  addProductController,
  deleteProductController,
};
