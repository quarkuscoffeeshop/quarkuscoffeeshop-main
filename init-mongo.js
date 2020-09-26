db.createUser({
   user:"coffeeshop-user",
   pwd:"redhat-20",
   roles:[
            {
               role:"readWrite",
               db:"coffeeshopdb"
            }
         ]
      }
   )

