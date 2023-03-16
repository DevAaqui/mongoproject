const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('641218851dd5a4581452c242')
    .then(user => {
      req.user = new User(user.name,user.email,user.cart,user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  // if(User !== true){
  //   let user = new User('Aran','aran@gmail.com')
  //   user.save()
  //   .then(()=>{
  //     console.log('Inside If')
  //     app.listen(3000)
  //   })
  //   .catch(err=>console.log(err))
  // }
  // else{
  //   console.log('Inside else')
  //   app.listen(3000);
  // }
  app.listen(3000);
  
});
