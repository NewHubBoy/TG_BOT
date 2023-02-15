const dotenv = require("dotenv")
dotenv.config()
const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

const keyboard = Markup.inlineKeyboard([
    // Markup.button.login("Login", "http://domain.tld/hash", {
    // 	bot_username: "my_bot",
    // 	request_write_access: true,
    // }),
    Markup.button.url("❤️", "http://telegraf.js.org"),
    Markup.button.callback("Delete", "delete"),
]);

bot.start(ctx => ctx.reply("Hello", keyboard));
bot.action("delete", ctx => ctx.deleteMessage());
function sendLiveLocation(ctx) {
    let lat = 42.0;
    let lon = 42.0;
    // @ts-ignore
    ctx.replyWithLocation(lat, lon, { live_period: 60 }).then(message => {
        const timer = setInterval(() => {
            lat += Math.random() * 0.001;
            lon += Math.random() * 0.001;
            ctx.telegram
                .editMessageLiveLocation(lat, lon, message.chat.id, message.message_id)
                .catch(() => clearInterval(timer));
        }, 1000);
    });
}
bot.on('message', (ctx) => {
    if (ctx.message === 'location') {
        sendLiveLocation(ctx)
    }

})

bot.launch();