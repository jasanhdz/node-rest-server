const imagesExtensions = ['png', 'jpg', 'jpeg', 'gif']
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const uploadFile = ({ files, allowedExtensions = imagesExtensions, folder = '' }) => {
  
  return new Promise((resolve, reject) => {
    const { file } = files
    const nameSplit = file.name.split('.')
    const extension = nameSplit[nameSplit.length - 1]
    
    if(!allowedExtensions.includes(extension)) {
      return reject(`La extensión: ${extension} no es permitida - ${allowedExtensions}`)
    }

    const finalName = uuidv4() + '.' + extension
    const uploadPath = path.join(__dirname, '../../uploads/', folder, finalName)

    file.mv(uploadPath, (err) => {
      if (err) return reject(errq)
      resolve(finalName)
    }) 
  })
}

module.exports = {
  uploadFile
}