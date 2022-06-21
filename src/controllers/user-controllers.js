
    const DATA = [{email:"test@gmail.com", password:"1234"}]
    const CheckUser = (input)=>{
       // console.log(DATA)
        console.log(input)
      
        for (var i in DATA) {
            if(input.email==DATA[i].email && (input.password==DATA[i].password || DATA[i].provider==input.provider))
            {
                console.log('User found in DATA')
                return true
            }
            else
             null
                //console.log('no match')
          }
        return false
    }
    
     const FindOrCreate = (user)=>{
        if(CheckUser(user)){  // if user exists then return user
            console.log("inside find")
            return user
        }else{
            DATA.push(user) // else create a new user
        }
    }
   
  
    module.exports = { FindOrCreate, CheckUser}
