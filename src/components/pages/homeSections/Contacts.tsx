"use client";
import axios from "axios";
import scss from "./Contacts.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

const TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_CHAT_ID;
const Contacts = () => {
  const { register, handleSubmit, reset } = useForm<ITelegramBot>();
  interface ITelegramBot {
    email: string;
    userName: string;
    message: string;
  }

  const messageModel = (data: ITelegramBot) => {
    let message = `Username: <b>${data.email}</b>\n`;
    message += `Email: <b>${data.userName}</b>\n`;
    message += `Message: <b>${data.message}</b>`;
    return message;
  };

  const onSubmit: SubmitHandler<ITelegramBot> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: messageModel(data),
    });
    reset();
  };

  return (
    <section className={scss.Contacts}>
      <div className="container">
        <div className={scss.content}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("email", { required: true })} />
            <input type="text" {...register("userName", { required: true })} />
            <input type="text" {...register("message", { required: true })} />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
