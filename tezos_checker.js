import axios from "axios"
import colors from "colors"
import { getCSV } from './csvimport.js'
import fs from "fs"

let wallets = await getCSV("wallets")
let pubAddr = wallets.map(a => a.public_address)

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); // Задержка между каждым акком в MS
}

function get(url, addr) {
    const data = axios({
        method: 'get',
        url: url,
    })
    .then(function (response) {
        if (response.data.status == "OK") {
            let feeUSD = response.data.feeUsage.feeUSD
            totalAccs++
            fs.appendFile('accountsWDrop.txt', `\nAddress: ${addr} || ` + response.data.status + ` || feeUSD: ${feeUSD}`, function (err) {
                if (err) throw err;
            });
            console.log(`Address: ${addr} || ` + colors.green(response.data.status) + ` || feeUSD: ${feeUSD} $ || totalAccs: ${totalAccs}`)
        }
        else
        console.log(`Address: ${addr} || ` + colors.red(response.data.status))
        return response.data.status
    }).catch((err) => {
        console.log((err.message).red)
    })
    return data
}

let totalAccs = 0

for (let addr of pubAddr) {
    await get(`https://freetez.tezos.com/api/eligible?ethAddress=${addr}`, addr)
    await delay(10000)
}