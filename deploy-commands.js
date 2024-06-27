import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
// import { readdirSync } from "fs";
// import path from "path";
// import { fileURLToPath, pathToFileURL } from "url";

dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const commands = [
    {
        name: "user",
        description: "Provides information about user"
    },
    {
        name: "ping",
        description: "Replies with Pong!"
    },
    {
        name: "server",
        description: "Provides information about server"
    },
];

// const foldersPath = path.join(__dirname, "commands");
// const commandFolders = readdirSync(foldersPath);

// commandFolders.forEach((folder) => {
//     const commandsPath = path.join(foldersPath, folder);
//     const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

//     commandFiles.forEach((file) => {
//         const filePath = path.join(commandsPath, file);
//         const fileUrl = pathToFileURL(filePath);
//         import(fileUrl).then((command) => {
//             if (command.default.data && command.default.execute) {
//                 console.log(command.default.data.toJSON());
//                 commands.push(command.default.data.toJSON());
//             } else {
//                 console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
//             }
//         });
//     });
// });

const rest = new REST().setToken(DISCORD_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands`);

        console.log(commands);
        const data = await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands`);
    } catch (error) {
        console.error(error);
    }
})();