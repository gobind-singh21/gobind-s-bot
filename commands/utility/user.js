import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("user").setDescription("Provieds information about user"),
    async execute(interaction) {
        console.log(interaction);
        interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}`);
    }
};