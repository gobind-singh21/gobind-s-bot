import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("server").setDescription("Provieds information about server"),
    async execute(interaction) {
        console.log(interaction);
        interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    }
};