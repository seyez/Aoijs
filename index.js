const app = require('express')();

app.get('/', (req, res) => {

    res.send('');

});

const keep_alive = require("./keep-alive.js")

const DBD = require("aoi.js");

const bot = new DBD.Bot({

  token: process.env.token, //token yeridir ama tokeninizi env'e yazın aksi halde botunuz patlatılabilir

  prefix: "!" //botunuzun ön eki değiştirebilirsiniz

});

bot.onMessage();

bot.command({

  name: "ping",

  code: `$ping` //Ping komutu örnek bir main komutu

});

bot.command({

  name: "destek",

  code: `https://discord.gg/pxh5P3XwF9`

}); // destek alabileceğiniz bir sunucu linki

// bot.command veya callback'ler "const fs = require ('fs')'nin üstüne yazılır aksi taktirde bazı durumlarda komutlar çalışmayabilir

const fs = require("fs");

var reader = fs.readdirSync("./komutlar").filter(file => file.endsWith(".js"));

for (const file of reader) {

  const command = require(`./komutlar/${file}`);

  bot.command({

    name: command.name, // Komut adı

    aliases: command.aliases, //Diğer şekilde komutu tetikleniyecek şeyler

    bkz: command.bkz, // Komut açıklaması

    code: command.code // Komut

  });

}

bot.variables({

  variableismi: "değer" // variableismi yazan yere değişkeninizin adını değeri yazan yerede başlangıçtaki değerini yazın

});

