//zmienne

const config = require("./config/config.js")

const token = config.token

const gra = config.status

const command = require("./command")

const Discord = require("discord.js");

const client = new Discord.Client();

const status = config.status

const chalk = require("chalk")

//przygotowanie klienta do pracy

client.on('ready', () => {
    console.log('Client is ready.')

    command(client, '&ban', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('BAN_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.get(target.id)

            const channel = member.guild.channels.get('798582825212706857');
    
            const banEmbed = new Discord.RichEmbed()
            .setTitle('O kurka rurka')
            .setDescription(`${targetMember} został/a zbanowany/a.`)
            .setColor('#EBC91E')
            .setImage('https://cdn.discordapp.com/attachments/773905960157577229/800105621021917185/pobrane_9.jpeg')
            .setFooter('Administracja Serwera')

            targetMember.ban()

            message.channel.send(`Operacja zakończona sukcesem.`)
	        channel.send(banEmbed);
            
          } else {
            message.channel.send(`Proszę wskazać użytkownika do zbanowania`)
          }
        } else {
          message.channel.send(
            `Jesteś za słaby, żeby to zrobić.`
          )
        }
      })

      command(client, '&mute', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('BAN_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.get(target.id)

            const channel = member.guild.channels.get('798582825212706857');

            const muted = member.guild.roles.get('781072460254150686')
    
            const muteEmbed = new Discord.RichEmbed()
            .setTitle('Ajć')
            .setDescription(`${targetMember} został/a wyciszony/a.`)
            .setColor('#EBC91E')
            .setFooter('Administracja Serwera')
            
            targetMember.addRole(muted)

            message.channel.send(`Operacja zakończona sukcesem.`)
	        channel.send(muteEmbed);
            
          } else {
            message.channel.send(`Proszę wskazać użytkownika do wyciszenia`)
          }
        } else {
          message.channel.send(
            `Jesteś za słaby, żeby to zrobić.`
          )
        }
      })

      command(client, '&unmute', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('BAN_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.get(target.id)

            const channel = member.guild.channels.get('798582825212706857');

            const muted = member.guild.roles.get('781072460254150686')

            targetMember.removeRole(muted)

            message.channel.send(`Operacja zakończona sukcesem.`)
            
          } else {
            message.channel.send(`Proszę wskazać użytkownika do przywrócenia`)
          }
        } else {
          message.channel.send(
            `Jesteś za słaby, żeby to zrobić.`
          )
        }
      })




    //ustawienie statusu początkowego

    client.user.setActivity(status)
})

//powitanie

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.get('799722336118505522');
    if (!channel) return;
    
    const welcomeEmbed = new Discord.RichEmbed()
    .setTitle('👋 Witamy na serwerze')
    .setDescription(`Witaj na serwerze, ${member}! \n Nie zapomnij zaakceptować regulaminu!`)
    .setColor('#EBC91E')
    .setFooter('Administracja Serwera')

	channel.send(welcomeEmbed);
});

//pożegnanie

client.on('guildMemberRemove', async member => {
	const channel = member.guild.channels.get('799722336118505522');
    if (!channel) return;
    
    const byeEmbed = new Discord.RichEmbed()
    .setTitle('[*]')
    .setDescription(`${member} nas opuścił...`)
    .setFooter('Nie pozdrawiamy')
    .setColor('#EBC91E')

	channel.send(byeEmbed);
});

//ping

command(client, '&ping', message => {
    message.channel.send('Pong!')
}),

command(client, '&memberaddemit', message => {
    client.emit('guildMemberAdd');
    message.channel.send('Wyemitowano zdarzenie "guildMemberAdd".')
})

command(client, '&memberremoveemit', message => {
    client.emit('guildMemberRemove');
    message.channel.send('Wyemitowano zdarzenie "guildMemberRemove".')
})

command(client, '&status', message => {

  const { member, mentions } = message

  const content = message.content.replace('&status ', '')

  if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('MANAGE_EMOJIS')) {
    if (content === 'clear') {
      console.log('Czyszczenie statusu...')
      message.channel.send('Czyszczę status...')
      client.user.setActivity(status)
      message.channel.send('Status wyczyszczony pomyślnie.')}

      else { if (content === 'hard-clear') {
          message.channel.send('Czyszczenie statusu...')
          client.user.setActivity('')
          message.channel.send('Status wyczyszczony. Możesz go przywrócić, wpisując `&status clear`.')}

      else {
          message.channel.send('Ustawiam status...')
          client.user.setActivity(content)
          message.channel.send(`Zmieniono status na "${content}".`)}} 
  }

  else {
    const missingPermissions = new Discord.RichEmbed()
    .setTitle('🛑 Brak uprawnień')
    .setDescription(`${member}, nie masz uprawnień do zmiany statusu bota.`)
    .setFooter('PingiBOT', 'https://cdn.discordapp.com/app-icons/779349541362204754/555ee6dd92bd5541aaba57486ba61c1b.png')
    .setColor('#FF4C14')

    message.channel.send(missingPermissions)
  }

})

//lista komend (do zrobienia)

//podstawowe autorespondery

command(client, [ '&słoniu', '&elephant'] , message => {
    message.channel.send('https://images-ext-1.discordapp.net/external/eCgNrRgTQR-RiWA_mck8CeUZ4gFJt4CKvM_NCGESSlE/https/media.discordapp.net/attachments/773491441434492939/779291934078140428/IMG_20201118_105243.png?width=637&height=473')
})

command(client, [ '&kudłacz', '&shaggy' ] , message => {
    message.channel.send('https://images-ext-2.discordapp.net/external/dk6ceHtD-57CkrJUuaCBa0sCjb_qOhscfiXI5Dk_46Y/%3Fwidth%3D492%26height%3D475/https/media.discordapp.net/attachments/773491441434492939/780398845715677224/shaggy.jpg?width=490&height=473')
})

client.on("message", msg => {
    const { author, guild, content} = msg

    if(msg.author.bot) return;
  
    if (content.toLowerCase().startsWith('xd') || content.toLowerCase() === 'xd') {
      msg.channel.send("xDDDDD")}
  });

client.on("message", msg => {

    const { author, guild } = msg

    if(msg.author.bot) return;

    if (msg.content.toLowerCase() === "tak") {
        msg.channel.send('nie')
    }
})

client.on("message", msg => {

    const { author, guild } = msg

    if(msg.author.bot) return;

    if (msg.content.toLowerCase() === "nie") {
        msg.channel.send('tak')
    }
})

client.on("message", msg => {

    const { author, guild } = msg

    if(msg.author.bot) return;

    if (msg.content.toLowerCase() === "gdzie mój tron?") {
        msg.channel.send('Tutaj, królu: 🚽🚽🧻🧻🚽🚽')
    }
})

//status


//token

client.login(token)