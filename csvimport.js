import fs from "fs"
import csv from "csvtojson"
import colors from "colors"

export const getCSV = async (callback) => {
  // Проверка файлов
  fs.open(`./${callback}.csv`, 'r', function (err) {
    if (err) {
        console.log(colors.red(`${callback}.csv not found, exit..`))
        process.exit(1)
    }
  })
  // Конец проверки
  callback = await csv().fromFile(`./${callback}.csv`)
  return callback
}