const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');

const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6413481e5119595ac2fa0504')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://aaquibrais12345:pbHq0VMzR4FTpz4m@cluster0.eo0fy2f.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
  User.findOne().then(user=> {
    if(!user){
      const user = new User({
        name: 'Aran',
        email: 'aran@gmail.com',
        cart: {
          items: []
        }
      })
      user.save()
    }
    console.log('Connected!')
    app.listen(3000)
  })
  
  
})
.catch(err=>console.log(err))




// mongoConnect(() => {
//   // if(User !== true){
//   //   let user = new User('Aran','aran@gmail.com')
//   //   user.save()
//   //   .then(()=>{
//   //     console.log('Inside If')
//   //     app.listen(3000)
//   //   })
//   //   .catch(err=>console.log(err))
//   // }
//   // else{
//   //   console.log('Inside else')
//   //   app.listen(3000);
//   // }
//   app.listen(3000);
  
//});
