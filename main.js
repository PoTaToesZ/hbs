var express = require('express')
const Handlebars = require('handlebars')
var app = express()
var hbs = require('hbs')
var fs = require('fs')

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
    let content = fs.readFileSync('product.txt', 'utf8').trim().split('\n')
    let ls = []
    content.forEach(element => {
        let p = {
            name: element.split(';')[0],
            color: element.split(';')[1],
            price: element.split(';')[2]
        }
        ls.push(p)
    });
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
    res.render('home',{'name': name,'products': products,'products2': products2,'content': ls})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)