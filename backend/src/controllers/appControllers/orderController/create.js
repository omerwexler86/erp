import { loadSettings, increaseBySettingKey } from '#middlewares/settings/index.js';
import { generateUniqueNumber } from '#middlewares/inventory/index.js';

const create = async (Model, req, res) => {
  let body = req.body;

  body.createdBy = req.admin._id;

  const settings = await loadSettings();
  const last_order_number = settings.last_order_number;

  body.number = generateUniqueNumber(last_order_number);
  // Creating a new document in the collection
  const result = await new Model(body).save();

  // Returning successfull response
  increaseBySettingKey({ settingKey: 'last_order_number' });

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result,
    message: 'Order created successfully',
  });
};

export default create;
