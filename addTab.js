const { DrkBx } = require('./DarkBoxx')
const fs = require('fs')
const R = require('ramda')

const cleanContnt= R.pipe(
    DrkBx.files.getLatinTxt,
    DrkBx.cls.ampersand,
    DrkBx.cls.intlsComments,
    DrkBx.cls.tab,
    DrkBx.cls.iniEndSpace,
    DrkBx.cls.multiSpaceToOne,
    DrkBx.cls.emptyLine,
    DrkBx.add.cmpEnterInHead,
    DrkBx.add.fldTabInField
)

const runFile = file => {
    if ( DrkBx.files.existAndIsFile(file) ) {
       fs.writeFileSync(file, cleanContnt(file), 'Latin1' )
       return { file: file, status: true }
    } else {
        return { file: file, status: false }
    }
}

const runDir = R.pipe(
    DrkBx.dir.chekAndGetFiltFls,
    R.map(runFile)
)

console.log( runDir(['.vis','.frm','.esp','.tbl','.rep','.dlg'],'./Testing\\' ) )
