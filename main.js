var express = require('express')
const Handlebars = require('handlebars')
var app = express()
var hbs = require('hbs')

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
hbs.registerHelper('checkPriceGT200',(price)=>{
    return price > 200;
})
hbs.registerHelper("mbold", function(options) {
    return new Handlebars.SafeString('<span style="color:blue">' + options.fn(this) + "</span>");
});

app.get('/', (req, res) => {
    var name = "Potato"
    var products = ['Vovol','Honda','Toyota']
    var products2 = [
        {
            name: 'Coke',
            price: 120,
            onsale: false
        },
        {
            name: 'Pepsi',
            price: 330,
            onsale: true
        }
    ]
    //truyen bien name vao trang home
    res.render('home',{'name': name,'products': products,'products2': products2})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)