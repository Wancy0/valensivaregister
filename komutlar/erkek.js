const { Discord, MessageEmbed} = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')


exports.run = async (client, message, args) => {//wancy

    let erkekROL = ayarlar.erkekROL 
    let kayıtsızROL = ayarlar.kayıtsızROL
    let kayıtlıROL = ayarlar.kayıtlıROL
    let yetkili = ayarlar.yetkiliROL
    let kayıtLOG = ayarlar.kayıtLOG

    if(!message.member.roles.cache.has(yetkili)) return message.channel.send('Bu işlemi sadece yetkililer yapabilir')


if(!args[0]) return message.channel.send(`Bir kişiyi etiketlemelisin.`)
  
let kullanıcı = message.mentions.users.first()
if(!kullanıcı) return message.channel.send(`${args[0]}, kullanıcısını sunucuda bulamıyorum.`)
if(kullanıcı.bot) return;
  
  
  
  const kurulus = new Date().getTime() - kullanıcı.createdAt.getTime();  
   var kontrol;
if (kurulus < 1296000000) kontrol = '<a:rtik:789976080672882708> Şüpheli'
if (kurulus > 1296000000) kontrol = '<a:ytik:789975925046509572> Güvenli'
  
  
  
let isim = args[1]

if(!isim) return message.channel.send(`Üyenin ismini belirtmelisin.`)

let yaş = args[2];
if(!yaş) return message.channel.send(`Üyenin yaşını belirtmelisin.`)
  
const emb = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.setTimestamp()
.setFooter('Kayıt Saati')
.setColor(`#fffff0`)
let tag = ayarlar.tag || ''
message.guild.members.cache.get(kullanıcı.id).setNickname(`${tag} ${isim} ' ${yaş}`)
message.guild.members.cache.get(kullanıcı.id).roles.add(erkekROL)
  message.guild.members.cache.get(kullanıcı.id).roles.add(kayıtlıROL)
  if(ayarlar.erkekICON) {
    let erkekICON = ayarlar.erkekICON
      message.guild.members.cache.get(kullanıcı.id).roles.add(erkekICON)
  }
message.guild.members.cache.get(kullanıcı.id).roles.remove(kayıtsızROL)
message.guild.members.cache.get(kullanıcı.id).send(emb.setDescription(`• Kaydın ${message.author} tarafından yapıldı. \n • **Erkek** ve **Kayıtlı** rollerini aldın. \n • Kurallar kanalımızı okumayı unutma!`))
 
let embed2 = new MessageEmbed()
.setDescription(`
• ${kullanıcı} adlı kullanıcı sunucumuza kayıt oldu. 
• Kaydını yapan kişi : ${message.author}
`)



client.channels.cache.get(ayarlar.kayıtLOG).send(embed2)
let embed3 = new MessageEmbed()
.setColor('WHITE')

.setDescription(`
• ${kullanıcı} <a:partner:789979496697692170>  adlı kişinin kaydı başarıyla yapıldı.
• İsim Yaş • **${isim} ' ${yaş}**
• Verilen Roller • <@&${ayarlar.erkekROL}> ,
• Alınan Roller • <@&${ayarlar.kayıtsızROL}>

`)


}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 0
};

exports.help = {
  name: 'erkek'
}//wancy