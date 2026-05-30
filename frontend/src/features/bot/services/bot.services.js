
import { use } from "react";
import { useSelector } from "react-redux";
import store from "../../../app/store.js";
import api from "../../../api/api.axios.js";


const getBot = async (businessId) => {

   try {

      const bot = await api.get(`/bot/get-bot/${businessId}`);

      return bot.data;

   } catch (error) {

      const message =
         error?.response?.data?.message ||
         error?.message ||
         "Failed to get bot";

      console.log(message);

      throw new Error(message);
   }
};


const createBot = async ({ widgetSettings, image, systemPrompt }) => {

   try {

      const formData = new FormData();

      formData.append(
         "widgetSettings",
         JSON.stringify(widgetSettings)
      );

      formData.append("image", image);

      formData.append("systemPrompt", systemPrompt);

      const response = await api.post(
         "/bot/create-bot",
         formData
      );

      return response.data;

   } catch (error) {

      const message =
         error?.response?.data?.message ||
         error?.message ||
         "Failed to create bot";

      console.log(message);

      throw new Error(message);
   }
};

export { getBot, createBot };