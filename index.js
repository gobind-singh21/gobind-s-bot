import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import { readdirSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import { checkBadWords } from "./bad-words.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = readdirSync(foldersPath);

commandFolders.forEach((folder) => {
    const commandPath = path.join(foldersPath, folder);
    const commandFiles = readdirSync(commandPath).filter((file) => file.endsWith(".js"));
    commandFiles.forEach(async (commandFile) => {
        const filePath = path.join(commandPath, commandFile);
        const fileUrl = pathToFileURL(filePath)
        const command = (await import(fileUrl)).default;

        if (command.data && command.execute) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
        }
    });
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "There was an error while executing the command!", ephemeral: true });
        } else {
            await interaction.reply({ content: "There was an error while executing command!", ephemeral: true });
        }
    }
});

client.login(DISCORD_TOKEN);

client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return;

    if (checkBadWords(message.content)) {
        message.reply("Chup bhsdk saale gaali bakta hai hain!!");
    }
});

console.log("Bot started");