
console.log(process.env.BD_SQL)
const config = {
    //connectionSQL: "Data Source=g100603sv627,54603;Initial Catalog=Icard_uni_web;Persist Security Info=True;User ID=Intellicenco;Password=hasar50;"
    connectionSQL: process.env.BD_SQL
    
}
module.exports = config;