const { DrkBx } = require('./DarkBox')

const fs = require('fs')
const path = require('path')
const R = require('ramda')

const cleanAddTabInField = R.pipe(
    DrkBx.cls.ampersand,
    DrkBx.cls.intlsComments,
    DrkBx.cls.tab,
    DrkBx.cls.iniEndSpace,
    DrkBx.cls.multiSpaceToOne,
    DrkBx.cls.emptyLines,
    DrkBx.add.cmpEnterInHead,
    DrkBx.add.fldTabInField
)

const runFile = file => {
    if ( DrkBx.files.existAndIsFile(file) ) {
       fs.writeFileSync('Data\\' + path.basename(file), cleanAddTabInField( DrkBx.files.getLatinTxt(file) ), 'Latin1' )
       return { file: file, status: true }
    } else {
        return { file: file, status: false }
    }
}

/*** ¡¡¡ For save in the original file !!! ***/
// const runFile = file => {
//     if ( DrkBx.files.existAndIsFile(file) ) {
//        fs.writeFileSync(file, cleanAddTabInField( DrkBx.files.getLatinTxt(file) ), 'Latin1' )
//        return { file: file, status: true }
//     } else {
//         return { file: file, status: false }
//     }
// }

const runDir = R.pipe(
    DrkBx.dir.chekAndGetFiltFls,
    R.map(runFile)
)

const conctRootRunFiles = R.pipe( DrkBx.dir.conctDirIsFile, R.map(runFile) )

/* Usage */
// const dirRep = 'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\Intelisis\\Intelisis5000\\Reportes MAVI\\'
// const dirOrig = 'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\Intelisis\\Intelisis5000\\Codigo Original\\'

/* Folder and extentions of the files */
// console.log( 
//     runDir(
//         ['.vis','.frm','.esp','.tbl','.rep','.dlg'],
//         './Testing\\'
//     )
// )

/* Array of indicate files */
// console.log(
//     conctRootRunFiles([
//         'AgenteFamMAVI.vis',
//         'AnexoContaSAT.tbl',
//         'AnexoContaSAT.frm'

//     ], 'Testing\\')
// )

/* One file */
// console.log(runFile('Testing\\dbo.AjusteAnual.StoredProcedure.sql'))
// runFile('Testing\\dbo.AjusteAnual.StoredProcedure.sql')

module.exports.cleaner = {
    conctRootRunFiles: conctRootRunFiles,
    cleanAddTabInField: cleanAddTabInField,
    runFile: runFile,
    runDir: runDir
}
