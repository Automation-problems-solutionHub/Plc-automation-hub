const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const QUESTION = "PLC কি ধরনের কন্ট্রোল করে?";
const ANSWER = "অটোমেশন";

const approvedUsers = new Set();

bot.on('new_chat_members', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.new_chat_member.id;
  bot.sendMessage(chatId, `স্বাগতম, ${msg.new_chat_member.first_name}! গ্রুপে থাকতে হলে উত্তর দিন:

❓ ${QUESTION}`);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!msg.new_chat_member && msg.text && !approvedUsers.has(userId)) {
    if (msg.text.trim().toLowerCase() === ANSWER.toLowerCase()) {
      approvedUsers.add(userId);
      bot.sendMessage(chatId, '✅ ধন্যবাদ! আপনি গ্রুপে থাকতে পারবেন।');
    } else {
      bot.sendMessage(chatId, '❌ ভুল উত্তর! আপনি গ্রুপে থাকতে পারবেন না।');
      bot.kickChatMember(chatId, userId);
    }
  }
});