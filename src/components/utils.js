import {getNourishmentsByIdList} from "../services/menu"

export const getItemsInfo = async (items) => {
    const itemsIds = items.map((item) => item.nourishmentId);
        const itemsInfoRes = await getNourishmentsByIdList(itemsIds);
        const itemsInfo = itemsInfoRes.data.data;

        itemsInfo.map((item) => {
          let itemAmount = items.find((obj) => obj.nourishmentId === item._id);
          item.amount = itemAmount.amount;
        });
        return itemsInfo;
}