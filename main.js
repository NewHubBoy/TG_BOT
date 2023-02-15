const dotenv = require("dotenv")
dotenv.config()
const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

const keyboard = Markup.inlineKeyboard([
	Markup.button.login("Login", "http://domain.tld/hash", {
		bot_username: "my_bot",
		request_write_access: true,
	}),
	Markup.button.url("❤️", "http://telegraf.js.org"),
	Markup.button.callback("Delete", "delete"),
]);

bot.start(ctx => ctx.reply("Hello", keyboard));
bot.action("delete", ctx => ctx.deleteMessage());

bot.launch();