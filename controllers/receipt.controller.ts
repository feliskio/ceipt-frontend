import Receipt from '../definitions/Receipt';
import ReceiptModel, { receiptProperties } from '../models/receipt.model';

async function addReceiptItems(receipt: Receipt) {
  return receipt;
  if (!receipt) {
    return null;
  }

  const itemIds = receipt.products.map((i: any) => i.id);
  const items = await Item.find({ $in: { _id: itemIds } });
  const newItems = receipt.products.map((i: any) => ({
    item: items.filter((j) => j._id === i.id)[0],
    _id: i.id,
  }));
  const newDoc = { ...receipt?.toObject(), products: newItems };

  return newDoc;
}

const receiptController = {
  create: async (receiptData: typeof receiptProperties) => {
    const doc = await ReceiptModel.create({
      image: receiptData.image,
      ownerName: receiptData.ownerName,
      products: receiptData.products,
      score: receiptData.score,
    });
    return await addReceiptItems(doc);
  },
  getById: async (receiptId: string) => {
    const doc = await ReceiptModel.findOne({ _id: receiptId });
    return await addReceiptItems(doc);
  },
  getByOwnerUserId: async (ownerUserId: string) => {
    const docs = await ReceiptModel.find({ ownerUserId });
    return await Promise.all(docs.map(addReceiptItems));
  },
  getAll: async () => {
    const docs = await ReceiptModel.find({});
    return await Promise.all(docs.map(addReceiptItems));
  },
};
export default receiptController;
